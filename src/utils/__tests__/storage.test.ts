import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '../storage'
import type { DayRecord, Streak } from '../../types'

beforeEach(() => {
  localStorage.clear()
})

describe('storage.records', () => {
  it('returns empty object when no records', () => {
    expect(storage.getRecords()).toEqual({})
  })

  it('saves and retrieves a record', () => {
    const record: DayRecord = {
      items: ['a', 'b', 'c'],
      quote: { id: 1, text: 'test', author: 'me' },
      createdAt: '2026-03-14T22:00:00Z',
    }
    storage.saveRecord('2026-03-14', record)
    const records = storage.getRecords()
    expect(records['2026-03-14']).toEqual(record)
  })

  it('returns null for non-existent date', () => {
    expect(storage.getRecord('2026-01-01')).toBeNull()
  })
})

describe('storage.streak', () => {
  it('returns default streak when none saved', () => {
    const streak = storage.getStreak()
    expect(streak.current).toBe(0)
    expect(streak.longest).toBe(0)
    expect(streak.totalDays).toBe(0)
  })

  it('saves and retrieves streak', () => {
    const streak: Streak = { current: 7, longest: 10, totalDays: 20, lastDate: '2026-03-14' }
    storage.saveStreak(streak)
    expect(storage.getStreak()).toEqual(streak)
  })
})

describe('storage.exportData', () => {
  it('exports all data as JSON string', () => {
    const record: DayRecord = {
      items: ['a', 'b', 'c'],
      quote: { id: 1, text: 'test', author: 'me' },
      createdAt: '2026-03-14T22:00:00Z',
    }
    storage.saveRecord('2026-03-14', record)
    const exported = storage.exportData()
    const parsed = JSON.parse(exported)
    expect(parsed.records['2026-03-14']).toEqual(record)
  })
})
