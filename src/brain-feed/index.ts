// Brain of Bank — SSE Feed Pipeline (Phase 1)
// Entry point: creates feed stream that Dev can pipe to SSE response

import { FeedTail } from './tail'
import { OracleAggregator } from './aggregator'
import { extractTool } from './parser'
import type { FeedEvent, OracleStatusEvent, FeedLogEntry } from './types'

export type { FeedEvent, OracleStatusEvent, FeedLogEntry, OracleGroup }
export { ORACLE_NAMES, ORACLE_GROUPS } from './types'
export { buildContext } from './context'
export { buildHUD } from './hud'
export type { HUDData } from './hud'
export { extractTopicSignal } from './topic-signal'
export type { TopicSignal, PanelHint } from './topic-signal'

export interface FeedStreamCallbacks {
  onStatus: (statuses: OracleStatusEvent[]) => void
  onEvent: (event: FeedEvent) => void
  onError: (err: Error) => void
}

/**
 * Create a feed stream that emits oracle status updates and raw events.
 *
 * Usage in Express SSE endpoint:
 * ```ts
 * app.get('/api/brain/feed', (req, res) => {
 *   res.setHeader('Content-Type', 'text/event-stream')
 *   res.setHeader('Cache-Control', 'no-cache')
 *   res.setHeader('Connection', 'keep-alive')
 *
 *   const { stop } = createFeedStream({
 *     onStatus: (statuses) => {
 *       res.write(`event: oracle-status\ndata: ${JSON.stringify(statuses)}\n\n`)
 *     },
 *     onEvent: (event) => {
 *       res.write(`event: feed-event\ndata: ${JSON.stringify(event)}\n\n`)
 *     },
 *     onError: (err) => {
 *       res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`)
 *     },
 *   })
 *
 *   req.on('close', stop)
 * })
 * ```
 */
export async function createFeedStream(callbacks: FeedStreamCallbacks): Promise<{ stop: () => void }> {
  const tail = new FeedTail()
  const aggregator = new OracleAggregator()

  // Load recent history to build initial state
  const recent = await tail.loadRecent(500)
  for (const entry of recent) {
    aggregator.ingest(entry)
  }

  // Send initial status snapshot
  callbacks.onStatus(aggregator.getAll())

  // Handle new events
  tail.on('entry', (entry: FeedLogEntry) => {
    aggregator.ingest(entry)

    // Emit raw event
    callbacks.onEvent({
      oracle: entry.oracle,
      event: entry.event,
      tool: extractTool(entry.message),
      message: entry.message,
      timestamp: entry.timestamp.toISOString(),
    })

    // Emit updated status for this oracle
    callbacks.onStatus(aggregator.getAll())
  })

  tail.on('error', (err: Error) => {
    callbacks.onError(err)
  })

  // Start tailing
  tail.start()

  // Periodic status heartbeat (every 30s) — updates idle/active transitions
  const heartbeat = setInterval(() => {
    callbacks.onStatus(aggregator.getAll())
  }, 30_000)

  return {
    stop: () => {
      tail.stop()
      clearInterval(heartbeat)
    },
  }
}

/**
 * One-shot: get current oracle statuses without streaming.
 * Useful for REST endpoint or initial page load.
 */
export async function getOracleStatuses(): Promise<OracleStatusEvent[]> {
  const tail = new FeedTail()
  const aggregator = new OracleAggregator()

  const recent = await tail.loadRecent(1000)
  for (const entry of recent) {
    aggregator.ingest(entry)
  }

  return aggregator.getAll()
}
