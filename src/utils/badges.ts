import type { Badge } from '../types'

export const BADGE_DEFS: Omit<Badge, 'unlockedAt'>[] = [
  { id: 'first_check', name: '初心萌芽', condition: '首次打卡', streakRequired: 1, icon: 'sprout' },
  { id: 'streak_7', name: '一周坚持', condition: '连续7天', streakRequired: 7, icon: 'flame' },
  { id: 'streak_15', name: '半月之约', condition: '连续15天', streakRequired: 15, icon: 'star' },
  { id: 'streak_30', name: '月度达人', condition: '连续30天', streakRequired: 30, icon: 'medal' },
  { id: 'streak_60', name: '双月勇士', condition: '连续60天', streakRequired: 60, icon: 'diamond' },
  { id: 'streak_100', name: '百日传奇', condition: '连续100天', streakRequired: 100, icon: 'crown' },
  { id: 'streak_365', name: '年度之星', condition: '连续365天', streakRequired: 365, icon: 'trophy' },
]

export function initBadges(): Badge[] {
  return BADGE_DEFS.map(d => ({ ...d, unlockedAt: null }))
}

export function checkNewBadges(badges: Badge[], currentStreak: number): Badge[] {
  const now = new Date().toISOString()
  const newlyUnlocked: Badge[] = []

  for (const badge of badges) {
    if (badge.unlockedAt === null && currentStreak >= badge.streakRequired) {
      badge.unlockedAt = now
      newlyUnlocked.push(badge)
    }
  }

  return newlyUnlocked
}
