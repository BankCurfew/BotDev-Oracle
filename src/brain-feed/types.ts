// Brain of Bank — SSE Feed Types (Phase 1)

export type OracleStatus = 'active' | 'idle' | 'blocked'

/** Aggregated oracle state — emitted as SSE event 'oracle-status' */
export interface OracleStatusEvent {
  oracle: string
  status: OracleStatus
  lastAction: string
  currentTask: string | null
  lastMessage: string | null
  timestamp: string // ISO 8601
  sessionId: string
}

/** Raw feed event — emitted as SSE event 'feed-event' */
export interface FeedEvent {
  oracle: string
  event: string // PreToolUse, PostToolUse, Stop, Notification
  tool: string
  message: string
  timestamp: string
}

/** Parsed line from ~/.oracle/feed.log */
export interface FeedLogEntry {
  timestamp: Date
  oracle: string
  host: string
  event: string
  project: string
  sessionId: string
  message: string
}

/** Known oracle names mapped to their tmux windows */
export const ORACLE_NAMES = [
  'BoB-Oracle', 'Dev-Oracle', 'BotDev-Oracle', 'QA-Oracle',
  'Designer-Oracle', 'Writer-Oracle', 'Researcher-Oracle', 'Admin-Oracle',
  'AIA-Oracle', 'Data-Oracle', 'Creator-Oracle', 'DocCon-Oracle',
  'Editor-Oracle', 'HR-Oracle', 'Security-Oracle', 'PA-Oracle',
] as const

export type OracleName = typeof ORACLE_NAMES[number]
