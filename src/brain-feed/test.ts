// Quick smoke test — run with: npx tsx src/brain-feed/test.ts
import { parseFeedLine, extractTool } from './parser'
import { OracleAggregator } from './aggregator'
import { FeedTail } from './tail'

async function main() {
  console.log('=== Parser Test ===')

  const sample = '2026-04-01 18:31:42 | Writer-Oracle | VuttiServer | PreToolUse | Writer-Oracle | 5544a963 » Bash: gh issue create --repo BankCurfew/Writer-Oracle --title "Brain of Bank"'
  const parsed = parseFeedLine(sample)
  console.log('Parsed:', parsed)
  console.log('Tool:', extractTool(parsed?.message || ''))

  console.log('\n=== Aggregator Test ===')

  const tail = new FeedTail()
  const aggregator = new OracleAggregator()

  console.log('Loading recent feed.log entries...')
  const recent = await tail.loadRecent(200)
  console.log(`Loaded ${recent.length} entries`)

  for (const entry of recent) {
    aggregator.ingest(entry)
  }

  const statuses = aggregator.getAll()
  console.log('\nOracle Statuses:')
  for (const s of statuses) {
    if (s.lastAction) {
      console.log(`  ${s.status.padEnd(7)} ${s.oracle.padEnd(20)} ${s.lastAction.substring(0, 60)}`)
    }
  }

  const active = statuses.filter(s => s.status === 'active').length
  const idle = statuses.filter(s => s.status === 'idle').length
  console.log(`\nSummary: ${active} active, ${idle} idle, ${statuses.length} total`)
}

main().catch(console.error)
