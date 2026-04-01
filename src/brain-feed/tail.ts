// Brain of Bank — Feed Log Tailer
// Watches ~/.oracle/feed.log for new lines and emits parsed events

import { createReadStream, statSync, watchFile, unwatchFile } from 'fs'
import { createInterface } from 'readline'
import { EventEmitter } from 'events'
import { parseFeedLine } from './parser'
import type { FeedLogEntry } from './types'

const FEED_LOG = process.env.FEED_LOG_PATH || `${process.env.HOME}/.oracle/feed.log`

export interface TailEvents {
  entry: (entry: FeedLogEntry) => void
  error: (err: Error) => void
}

export class FeedTail extends EventEmitter {
  private offset = 0
  private watching = false

  constructor(private path: string = FEED_LOG) {
    super()
  }

  /** Load recent history (last N lines) for initial state */
  async loadRecent(lines: number = 500): Promise<FeedLogEntry[]> {
    const entries: FeedLogEntry[] = []

    try {
      const stat = statSync(this.path)
      // Read from near end of file for large logs
      const startByte = Math.max(0, stat.size - lines * 300) // ~300 bytes per line estimate

      const stream = createReadStream(this.path, { start: startByte })
      const rl = createInterface({ input: stream, crlfDelay: Infinity })

      let firstLine = startByte > 0 // skip first partial line if not reading from start

      for await (const line of rl) {
        if (firstLine) { firstLine = false; continue }
        const entry = parseFeedLine(line)
        if (entry) entries.push(entry)
      }

      this.offset = stat.size
    } catch (err) {
      this.emit('error', err instanceof Error ? err : new Error(String(err)))
    }

    // Return only the last N entries
    return entries.slice(-lines)
  }

  /** Start watching for new lines appended to feed.log */
  start(intervalMs: number = 1000): void {
    if (this.watching) return
    this.watching = true

    watchFile(this.path, { interval: intervalMs }, (curr) => {
      if (curr.size <= this.offset) return // no new data
      this.readNew(curr.size)
    })
  }

  /** Stop watching */
  stop(): void {
    if (!this.watching) return
    this.watching = false
    unwatchFile(this.path)
  }

  /** Read new lines from offset to newSize */
  private async readNew(newSize: number): Promise<void> {
    try {
      const stream = createReadStream(this.path, { start: this.offset, end: newSize - 1 })
      const rl = createInterface({ input: stream, crlfDelay: Infinity })

      for await (const line of rl) {
        const entry = parseFeedLine(line)
        if (entry) {
          this.emit('entry', entry)
        }
      }

      this.offset = newSize
    } catch (err) {
      this.emit('error', err instanceof Error ? err : new Error(String(err)))
    }
  }
}
