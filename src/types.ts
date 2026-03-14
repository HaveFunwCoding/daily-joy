export interface DayRecord {
  items: [string, string, string]
  quote: { id: number; text: string; author: string }
  createdAt: string
}

export interface Records {
  [date: string]: DayRecord
}

export interface Streak {
  current: number
  longest: number
  totalDays: number
  lastDate: string
}

export interface Badge {
  id: string
  name: string
  condition: string
  streakRequired: number
  icon: string       // SVG path or Lucide icon name
  unlockedAt: string | null
}

export interface Quote {
  id: number
  text: string
  author: string
}
