import type { Records, Streak } from '../types'
import { daysBetween } from './dates'

export function calculateStreak(records: Records, today: string): Streak {
  const dates = Object.keys(records).sort()
  const totalDays = dates.length

  if (totalDays === 0) {
    return { current: 0, longest: 0, totalDays: 0, lastDate: '' }
  }

  let longest = 1
  let currentRun = 1

  for (let i = 1; i < dates.length; i++) {
    if (daysBetween(dates[i - 1], dates[i]) === 1) {
      currentRun++
      longest = Math.max(longest, currentRun)
    } else {
      currentRun = 1
    }
  }

  // Calculate current streak (must include today or yesterday)
  const lastDate = dates[dates.length - 1]
  const daysFromToday = daysBetween(lastDate, today)

  let current = 0
  if (daysFromToday <= 1) {
    current = 1
    for (let i = dates.length - 2; i >= 0; i--) {
      if (daysBetween(dates[i], dates[i + 1]) === 1) {
        current++
      } else {
        break
      }
    }
  }

  return { current, longest: Math.max(longest, current), totalDays, lastDate }
}
