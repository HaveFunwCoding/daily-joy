import { describe, it, expect } from 'vitest'
import { BADGE_DEFS, checkNewBadges } from '../badges'
import type { Badge } from '../../types'

describe('BADGE_DEFS', () => {
  it('has 7 badge definitions', () => {
    expect(BADGE_DEFS).toHaveLength(7)
  })

  it('definitions are sorted by streakRequired ascending', () => {
    for (let i = 1; i < BADGE_DEFS.length; i++) {
      expect(BADGE_DEFS[i].streakRequired).toBeGreaterThanOrEqual(BADGE_DEFS[i - 1].streakRequired)
    }
  })
})

describe('checkNewBadges', () => {
  it('unlocks first badge on streak 1', () => {
    const badges: Badge[] = BADGE_DEFS.map(d => ({ ...d, unlockedAt: null }))
    const newlyUnlocked = checkNewBadges(badges, 1)
    expect(newlyUnlocked).toHaveLength(1)
    expect(newlyUnlocked[0].id).toBe('first_check')
  })

  it('unlocks week badge on streak 7', () => {
    const badges: Badge[] = BADGE_DEFS.map(d => ({
      ...d,
      unlockedAt: d.streakRequired <= 1 ? '2026-03-01' : null,
    }))
    const newlyUnlocked = checkNewBadges(badges, 7)
    expect(newlyUnlocked).toHaveLength(1)
    expect(newlyUnlocked[0].id).toBe('streak_7')
  })

  it('returns empty array when no new badges', () => {
    const badges: Badge[] = BADGE_DEFS.map(d => ({
      ...d,
      unlockedAt: d.streakRequired <= 7 ? '2026-03-01' : null,
    }))
    const newlyUnlocked = checkNewBadges(badges, 7)
    expect(newlyUnlocked).toHaveLength(0)
  })
})
