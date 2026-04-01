// Brain of Bank — Context Builder for Claude System Prompt Injection
// Gathers oracle status + projects + recent activity → structured text for BoB

import { FeedTail } from './tail'
import { OracleAggregator } from './aggregator'
import type { OracleStatusEvent } from './types'
import { ORACLE_GROUPS } from './types'
import { execSync } from 'child_process'

/** Build a complete context block for Claude system prompt injection */
export async function buildContext(): Promise<string> {
  const sections: string[] = []
  const now = new Date()

  sections.push(`# Oracle Team Status — ${now.toISOString().slice(0, 16)} (GMT+7)`)
  sections.push('')

  // 1. Oracle Status from feed.log
  const statuses = await getOracleStatuses()
  sections.push('## Team Activity')
  sections.push('')

  const active = statuses.filter(s => s.status === 'active')
  const idle = statuses.filter(s => s.status === 'idle' && s.lastAction)
  const blocked = statuses.filter(s => s.status === 'blocked')

  if (active.length) {
    sections.push(`**Active now (${active.length}):**`)
    for (const s of active) {
      sections.push(`- ${formatOracle(s)}: ${s.lastAction.substring(0, 80)}`)
    }
    sections.push('')
  }

  if (blocked.length) {
    sections.push(`**Blocked (${blocked.length}):**`)
    for (const s of blocked) {
      sections.push(`- ${formatOracle(s)}: ${s.lastAction.substring(0, 80)}`)
    }
    sections.push('')
  }

  if (idle.length) {
    sections.push(`**Idle (${idle.length}):**`)
    for (const s of idle) {
      const ago = timeSince(new Date(s.timestamp), now)
      sections.push(`- ${formatOracle(s)} (last active ${ago})`)
    }
    sections.push('')
  }

  // 2. Active Projects from maw
  const projects = getProjects()
  if (projects) {
    sections.push('## Active Projects')
    sections.push('')
    sections.push(projects)
    sections.push('')
  }

  // 3. Recent Activity (last 20 meaningful events)
  const recentActivity = await getRecentActivity(20)
  if (recentActivity.length) {
    sections.push('## Recent Activity (last 20 events)')
    sections.push('')
    for (const line of recentActivity) {
      sections.push(`- ${line}`)
    }
    sections.push('')
  }

  return sections.join('\n')
}

/** Get oracle statuses from feed.log */
async function getOracleStatuses(): Promise<OracleStatusEvent[]> {
  const tail = new FeedTail()
  const aggregator = new OracleAggregator()

  const recent = await tail.loadRecent(1000)
  for (const entry of recent) {
    aggregator.ingest(entry)
  }

  return aggregator.getAll()
}

/** Get active projects from maw — only projects with actual tasks */
function getProjects(): string | null {
  try {
    const out = execSync('maw project ls 2>/dev/null', {
      timeout: 5000,
      encoding: 'utf-8',
    })
    // Strip ANSI color codes
    const clean = out.replace(/\x1b\[[0-9;]*m/g, '').trim()
    if (!clean || clean.includes('No projects')) return null

    // Parse project blocks — only include ACTIVE with >0 tasks
    const lines = clean.split('\n')
    const projects: string[] = []
    let block: string[] = []
    let isActive = false
    let hasTasks = false

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('ACTIVE') || trimmed.startsWith('COMPLETED') || trimmed.startsWith('ARCHIVED')) {
        // Flush previous block
        if (block.length && isActive && hasTasks) {
          projects.push(block.join('\n'))
        }
        block = [trimmed]
        isActive = trimmed.startsWith('ACTIVE')
        hasTasks = false
      } else if (block.length) {
        block.push(trimmed)
        // Check for non-zero tasks: "N tasks" where N > 0
        const taskMatch = trimmed.match(/(\d+) tasks/)
        if (taskMatch && parseInt(taskMatch[1]) > 0) hasTasks = true
        // Check for done/wip counts
        if (trimmed.match(/[1-9]\d* done|[1-9]\d* wip/)) hasTasks = true
      }
    }
    // Flush last block
    if (block.length && isActive && hasTasks) {
      projects.push(block.join('\n'))
    }

    return projects.length ? projects.join('\n\n') : null
  } catch {
    return null
  }
}

/** Get recent meaningful feed events (skip noise like Read ✓) */
async function getRecentActivity(count: number): Promise<string[]> {
  const tail = new FeedTail()
  const entries = await tail.loadRecent(200)

  const meaningful = entries.filter(e => {
    // Skip post-tool confirmations and notifications
    if (e.event === 'PostToolUse' && e.message.endsWith('✓')) return false
    if (e.event === 'Notification') return false
    if (e.event === 'Stop') return false
    // Keep pre-tool use (actual actions) and failures
    return true
  })

  return meaningful.slice(-count).map(e => {
    const time = e.timestamp.toISOString().slice(11, 16)
    const oracle = e.oracle.replace('-Oracle', '')
    return `[${time}] ${oracle}: ${e.message.substring(0, 100)}`
  })
}

/** Format oracle name with group */
function formatOracle(s: OracleStatusEvent): string {
  const name = s.oracle.replace('-Oracle', '')
  const group = ORACLE_GROUPS[s.oracle] || 'ops'
  return `**${name}** (${group})`
}

/** Human-readable time difference */
function timeSince(past: Date, now: Date): string {
  const ms = now.getTime() - past.getTime()
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
