import type { DayRecord, Records, Streak, Badge } from '../types'

const KEYS = {
  records: 'daily_joy_records',
  streak: 'daily_joy_streak',
  badges: 'daily_joy_badges',
} as const

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    console.error(`Failed to read ${key} from localStorage`)
    return fallback
  }
}

function safeSet(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    console.error(`Failed to write ${key} to localStorage`)
    return false
  }
}

const defaultStreak: Streak = { current: 0, longest: 0, totalDays: 0, lastDate: '' }

export const storage = {
  getRecords(): Records {
    return safeGet(KEYS.records, {})
  },

  getRecord(date: string): DayRecord | null {
    const records = this.getRecords()
    return records[date] ?? null
  },

  saveRecord(date: string, record: DayRecord): boolean {
    const records = this.getRecords()
    records[date] = record
    return safeSet(KEYS.records, records)
  },

  getStreak(): Streak {
    return safeGet(KEYS.streak, defaultStreak)
  },

  saveStreak(streak: Streak): boolean {
    return safeSet(KEYS.streak, streak)
  },

  getBadges(): Badge[] {
    return safeGet(KEYS.badges, [])
  },

  saveBadges(badges: Badge[]): boolean {
    return safeSet(KEYS.badges, badges)
  },

  exportData(): string {
    return JSON.stringify({
      records: this.getRecords(),
      streak: this.getStreak(),
      badges: this.getBadges(),
      exportedAt: new Date().toISOString(),
    }, null, 2)
  },
}
