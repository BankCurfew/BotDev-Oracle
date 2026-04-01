// Brain of Bank — Topic Signal Extraction
// Scans Claude response text for keywords → highlights relevant HUD panels

import { ORACLE_NAMES } from './types'

export interface TopicSignal {
  oracles: string[]       // oracle names mentioned
  projects: string[]      // project IDs mentioned
  panels: PanelHint[]     // which HUD panels to highlight
  keywords: string[]      // extracted keywords
  timestamp: string
}

export type PanelHint =
  | 'oracle-status'   // mentioned specific oracles
  | 'project-board'   // mentioned projects/tasks
  | 'system-health'   // mentioned CPU/memory/uptime
  | 'activity-feed'   // mentioned recent events/logs
  | 'calendar'        // mentioned dates/schedule
  | 'weather'         // mentioned weather/environment

const SYSTEM_KEYWORDS = ['cpu', 'memory', 'ram', 'uptime', 'server', 'load', 'disk', 'restart', 'crash']
const CALENDAR_KEYWORDS = ['deadline', 'schedule', 'meeting', 'tomorrow', 'today', 'วันนี้', 'พรุ่งนี้', 'sprint']
const WEATHER_KEYWORDS = ['weather', 'อากาศ', 'ฝน', 'rain']
const ACTIVITY_KEYWORDS = ['feed', 'activity', 'log', 'event', 'recent', 'ล่าสุด']
const PROJECT_KEYWORDS = ['project', 'task', 'board', 'ticket', 'issue', 'โปรเจค', 'งาน']

/** Extract topic signals from Claude's response text */
export function extractTopicSignal(
  text: string,
  activeProjectIds?: string[],
): TopicSignal {
  const lower = text.toLowerCase()
  const oracles: string[] = []
  const projects: string[] = []
  const panels: Set<PanelHint> = new Set()
  const keywords: string[] = []

  // 1. Detect oracle mentions
  for (const name of ORACLE_NAMES) {
    const short = name.replace('-Oracle', '').toLowerCase()
    if (lower.includes(short)) {
      oracles.push(name)
      panels.add('oracle-status')
    }
  }

  // 2. Detect project mentions
  if (activeProjectIds) {
    for (const id of activeProjectIds) {
      if (lower.includes(id.toLowerCase())) {
        projects.push(id)
        panels.add('project-board')
      }
    }
  }
  if (PROJECT_KEYWORDS.some(k => lower.includes(k))) {
    panels.add('project-board')
  }

  // 3. Detect system health mentions
  if (SYSTEM_KEYWORDS.some(k => lower.includes(k))) {
    panels.add('system-health')
    keywords.push(...SYSTEM_KEYWORDS.filter(k => lower.includes(k)))
  }

  // 4. Detect activity feed mentions
  if (ACTIVITY_KEYWORDS.some(k => lower.includes(k))) {
    panels.add('activity-feed')
    keywords.push(...ACTIVITY_KEYWORDS.filter(k => lower.includes(k)))
  }

  // 5. Detect calendar mentions
  if (CALENDAR_KEYWORDS.some(k => lower.includes(k))) {
    panels.add('calendar')
    keywords.push(...CALENDAR_KEYWORDS.filter(k => lower.includes(k)))
  }

  // 6. Detect weather mentions
  if (WEATHER_KEYWORDS.some(k => lower.includes(k))) {
    panels.add('weather')
  }

  return {
    oracles: [...new Set(oracles)],
    projects: [...new Set(projects)],
    panels: [...panels],
    keywords: [...new Set(keywords)],
    timestamp: new Date().toISOString(),
  }
}
