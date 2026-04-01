// Brain of Bank — Feed Log Parser
// Parses ~/.oracle/feed.log format:
// TIMESTAMP | ORACLE | HOST | EVENT | PROJECT | SESSION_ID » MESSAGE

import type { FeedLogEntry } from './types'

const LINE_SEP = '\u239c' // feed.log uses U+239C as internal line separator

/**
 * Parse a single feed.log line into a structured entry.
 * Returns null for malformed lines.
 */
export function parseFeedLine(line: string): FeedLogEntry | null {
  // Split on ' | ' for the first 5 fields, then ' » ' for message
  const msgSplit = line.split(' » ')
  if (msgSplit.length < 1) return null

  const message = (msgSplit.slice(1).join(' » ') || '').replace(new RegExp(LINE_SEP, 'g'), '\n').trim()
  const fields = msgSplit[0].split(' | ')

  if (fields.length < 6) return null

  const [timestampStr, oracle, host, event, project, sessionId] = fields.map(f => f.trim())

  const timestamp = new Date(timestampStr)
  if (isNaN(timestamp.getTime())) return null

  return {
    timestamp,
    oracle,
    host,
    event,
    project,
    sessionId,
    message,
  }
}

/**
 * Extract tool name from a feed message.
 * e.g. "Bash: npm test" → "Bash", "Edit: src/foo.ts" → "Edit"
 */
export function extractTool(message: string): string {
  const colon = message.indexOf(':')
  if (colon === -1) return ''
  return message.substring(0, colon).trim()
}
