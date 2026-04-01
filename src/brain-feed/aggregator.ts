// Brain of Bank — Oracle Status Aggregator
// Maintains per-oracle state from feed.log events

import type { FeedLogEntry, OracleStatus, OracleStatusEvent, OracleGroup } from './types'
import { ORACLE_NAMES, ORACLE_GROUPS } from './types'

const ACTIVE_THRESHOLD_MS = 60_000   // active if event within 60s
const BLOCKED_KEYWORDS = ['error', 'failed', 'blocked', 'BLOCKED', 'timeout', 'PostToolUseFailure']

interface OracleState {
  oracle: string
  lastEvent: FeedLogEntry | null
  lastActionTime: number
  sessionId: string
  errorCount: number
}

export class OracleAggregator {
  private states = new Map<string, OracleState>()

  constructor() {
    // Initialize all known oracles
    for (const name of ORACLE_NAMES) {
      this.states.set(name, {
        oracle: name,
        lastEvent: null,
        lastActionTime: 0,
        sessionId: '',
        errorCount: 0,
      })
    }
  }

  /** Process a new feed.log entry and update oracle state */
  ingest(entry: FeedLogEntry): void {
    let state = this.states.get(entry.oracle)
    if (!state) {
      // Unknown oracle — create entry dynamically
      state = {
        oracle: entry.oracle,
        lastEvent: null,
        lastActionTime: 0,
        sessionId: '',
        errorCount: 0,
      }
      this.states.set(entry.oracle, state)
    }

    state.lastEvent = entry
    state.lastActionTime = entry.timestamp.getTime()
    state.sessionId = entry.sessionId

    // Track errors for blocked detection
    if (entry.event === 'PostToolUseFailure' || BLOCKED_KEYWORDS.some(k => entry.message.includes(k))) {
      state.errorCount++
    } else if (entry.event === 'PostToolUse') {
      // Successful tool use resets error count
      state.errorCount = 0
    }
  }

  /** Determine oracle status based on recency and error state */
  private getStatus(state: OracleState, now: number): OracleStatus {
    if (!state.lastEvent) return 'idle'

    const age = now - state.lastActionTime

    // Blocked: 3+ consecutive errors
    if (state.errorCount >= 3) return 'blocked'

    // Active: event within threshold
    if (age <= ACTIVE_THRESHOLD_MS) return 'active'

    return 'idle'
  }

  /** Get current status for all oracles */
  getAll(): OracleStatusEvent[] {
    const now = Date.now()
    const results: OracleStatusEvent[] = []

    for (const state of this.states.values()) {
      results.push({
        oracle: state.oracle,
        status: this.getStatus(state, now),
        group: (ORACLE_GROUPS[state.oracle] || 'ops') as OracleGroup,
        lastAction: state.lastEvent?.message || '',
        currentTask: null, // enriched later from maw
        lastMessage: null, // enriched later from threads
        timestamp: state.lastEvent
          ? state.lastEvent.timestamp.toISOString()
          : new Date(0).toISOString(),
        sessionId: state.sessionId,
      })
    }

    // Sort: active first, then idle, then blocked
    const order: Record<OracleStatus, number> = { active: 0, blocked: 1, idle: 2 }
    results.sort((a, b) => order[a.status] - order[b.status])

    return results
  }

  /** Get status for a single oracle */
  get(oracle: string): OracleStatusEvent | null {
    const state = this.states.get(oracle)
    if (!state) return null

    const now = Date.now()
    return {
      oracle: state.oracle,
      status: this.getStatus(state, now),
      group: (ORACLE_GROUPS[state.oracle] || 'ops') as OracleGroup,
      lastAction: state.lastEvent?.message || '',
      currentTask: null,
      lastMessage: null,
      timestamp: state.lastEvent
        ? state.lastEvent.timestamp.toISOString()
        : new Date(0).toISOString(),
      sessionId: state.sessionId,
    }
  }
}
