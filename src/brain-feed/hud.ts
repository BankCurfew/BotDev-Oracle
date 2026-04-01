// Brain of Bank — HUD Data Aggregator
// Combines oracle status + projects + activity + system metrics into single payload

import { FeedTail } from './tail'
import { OracleAggregator } from './aggregator'
import { execSync } from 'child_process'
import { freemem, totalmem, cpus, uptime } from 'os'

export interface HUDData {
  oracles: {
    name: string
    status: 'active' | 'idle' | 'blocked'
    group: 'dev' | 'creative' | 'ops'
    lastAction: string
    minutesAgo: number
  }[]
  projects: {
    name: string
    id: string
    progress: number
    tasksDone: number
    tasksTotal: number
  }[]
  system: {
    oraclesActive: number
    oraclesTotal: number
    feedEventsToday: number
    cpuPercent: number
    memUsedGB: number
    memTotalGB: number
    uptimeHours: number
  }
  activity: {
    time: string
    oracle: string
    action: string
  }[]
  timestamp: string
}

/** Build complete HUD data payload */
export async function buildHUD(): Promise<HUDData> {
  const now = Date.now()
  const tail = new FeedTail()
  const aggregator = new OracleAggregator()

  // Load feed.log and aggregate
  const entries = await tail.loadRecent(2000)
  for (const e of entries) aggregator.ingest(e)

  const statuses = aggregator.getAll()

  // Oracles
  const oracles = statuses
    .filter(s => s.lastAction) // skip oracles with no activity ever
    .map(s => ({
      name: s.oracle.replace('-Oracle', ''),
      status: s.status,
      group: s.group,
      lastAction: s.lastAction.substring(0, 80),
      minutesAgo: Math.floor((now - new Date(s.timestamp).getTime()) / 60000),
    }))

  // Projects
  const projects = parseProjects()

  // System metrics
  const todayStr = new Date().toISOString().slice(0, 10)
  const feedEventsToday = entries.filter(e =>
    e.timestamp.toISOString().slice(0, 10) === todayStr
  ).length

  const cpuLoad = cpus()
  const cpuPercent = Math.round(
    cpuLoad.reduce((sum, c) => {
      const total = Object.values(c.times).reduce((a, b) => a + b, 0)
      return sum + (1 - c.times.idle / total)
    }, 0) / cpuLoad.length * 100
  )

  const system = {
    oraclesActive: statuses.filter(s => s.status === 'active').length,
    oraclesTotal: statuses.filter(s => s.lastAction).length,
    feedEventsToday,
    cpuPercent,
    memUsedGB: Math.round((totalmem() - freemem()) / 1073741824 * 10) / 10,
    memTotalGB: Math.round(totalmem() / 1073741824 * 10) / 10,
    uptimeHours: Math.round(uptime() / 3600 * 10) / 10,
  }

  // Recent activity (last 10 meaningful events)
  const meaningful = entries.filter(e =>
    e.event !== 'PostToolUse' || !e.message.endsWith('✓')
  ).filter(e =>
    e.event !== 'Notification' && e.event !== 'Stop'
  )
  const activity = meaningful.slice(-10).reverse().map(e => ({
    time: e.timestamp.toISOString().slice(11, 16),
    oracle: e.oracle.replace('-Oracle', ''),
    action: e.message.substring(0, 80),
  }))

  return {
    oracles,
    projects,
    system,
    activity,
    timestamp: new Date().toISOString(),
  }
}

/** Parse maw project ls output into structured data */
function parseProjects(): HUDData['projects'] {
  try {
    const out = execSync('maw project ls 2>/dev/null', {
      timeout: 5000,
      encoding: 'utf-8',
    }).replace(/\x1b\[[0-9;]*m/g, '') // strip ANSI

    const results: HUDData['projects']  = []
    const lines = out.split('\n')

    let currentName = ''
    let currentId = ''
    let isActive = false

    for (const line of lines) {
      const trimmed = line.trim()

      // Match project header: "ACTIVE     Project Name (project-id)"
      const headerMatch = trimmed.match(/^(ACTIVE|COMPLETED|ARCHIVED)\s+(.+?)\s+\(([^)]+)\)/)
      if (headerMatch) {
        isActive = headerMatch[1] === 'ACTIVE'
        currentName = headerMatch[2]
        currentId = headerMatch[3]
        continue
      }

      // Match task line: "N tasks (N top + N sub) | N done N wip N todo"
      if (isActive && trimmed.match(/\d+ tasks/)) {
        const totalMatch = trimmed.match(/(\d+) tasks/)
        const doneMatch = trimmed.match(/(\d+) done/)
        const total = totalMatch ? parseInt(totalMatch[1]) : 0
        const done = doneMatch ? parseInt(doneMatch[1]) : 0

        if (total > 0) {
          results.push({
            name: currentName,
            id: currentId,
            progress: total > 0 ? Math.round(done / total * 100) : 0,
            tasksDone: done,
            tasksTotal: total,
          })
        }
      }
    }

    // Deduplicate by project ID
    const seen = new Set<string>()
    return results.filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })
  } catch {
    return []
  }
}
