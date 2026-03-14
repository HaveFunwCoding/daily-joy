import { describe, it, expect } from 'vitest'
import { calculateStreak } from '../streak'
import type { Records } from '../../types'

const makeRecord = (items = ['a', 'b', 'c']) => ({
  items: items as [string, string, string],
  quote: { id: 1, text: 'q', author: 'a' },
  createdAt: new Date().toISOString(),
})

describe('calculateStreak', () => {
  it('returns zeros for empty records', () => {
    const result = calculateStreak({}, '2026-03-14')
    expect(result.current).toBe(0)
    expect(result.longest).toBe(0)
    expect(result.totalDays).toBe(0)
  })

  it('returns 1 for single day record', () => {
    const records: Records = { '2026-03-14': makeRecord() }
    const result = calculateStreak(records, '2026-03-14')
    expect(result.current).toBe(1)
    expect(result.totalDays).toBe(1)
  })

  it('counts consecutive days', () => {
    const records: Records = {
      '2026-03-12': makeRecord(),
      '2026-03-13': makeRecord(),
      '2026-03-14': makeRecord(),
    }
    const result = calculateStreak(records, '2026-03-14')
    expect(result.current).toBe(3)
    expect(result.longest).toBe(3)
  })

  it('resets streak on gap', () => {
    const records: Records = {
      '2026-03-10': makeRecord(),
      '2026-03-11': makeRecord(),
      '2026-03-14': makeRecord(),
    }
    const result = calculateStreak(records, '2026-03-14')
    expect(result.current).toBe(1)
    expect(result.longest).toBe(2)
  })

  it('includes today even if checking from yesterday (grace period)', () => {
    const records: Records = {
      '2026-03-13': makeRecord(),
      '2026-03-14': makeRecord(),
    }
    const result = calculateStreak(records, '2026-03-14')
    expect(result.current).toBe(2)
  })

  it('tracks longest across multiple streaks', () => {
    const records: Records = {
      '2026-03-01': makeRecord(),
      '2026-03-02': makeRecord(),
      '2026-03-03': makeRecord(),
      '2026-03-04': makeRecord(),
      // gap
      '2026-03-10': makeRecord(),
      '2026-03-11': makeRecord(),
    }
    const result = calculateStreak(records, '2026-03-11')
    expect(result.current).toBe(2)
    expect(result.longest).toBe(4)
    expect(result.totalDays).toBe(6)
  })
})
