import { describe, it, expect, vi, afterEach } from 'vitest'
import { getEffectiveDate, formatDate, isYesterday, isToday } from '../dates'

describe('getEffectiveDate', () => {
  afterEach(() => { vi.useRealTimers() })

  it('returns today date during normal hours', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T10:00:00'))
    expect(getEffectiveDate()).toBe('2026-03-14')
  })

  it('returns yesterday during grace period when yesterday has no record', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T02:00:00'))
    expect(getEffectiveDate(false)).toBe('2026-03-13')
  })

  it('returns today during grace period when yesterday already has record', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T02:00:00'))
    expect(getEffectiveDate(true)).toBe('2026-03-14')
  })

  it('returns today at exactly 4am regardless', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T04:00:00'))
    expect(getEffectiveDate(false)).toBe('2026-03-14')
  })
})

describe('formatDate', () => {
  it('formats date in Chinese style', () => {
    expect(formatDate('2026-03-14')).toBe('3月14日')
  })

  it('formats date with year when different from current', () => {
    expect(formatDate('2025-12-25')).toContain('12月25日')
  })
})

describe('isToday', () => {
  afterEach(() => { vi.useRealTimers() })

  it('returns true for today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T10:00:00'))
    expect(isToday('2026-03-14')).toBe(true)
  })

  it('returns false for yesterday', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T10:00:00'))
    expect(isToday('2026-03-13')).toBe(false)
  })
})

describe('isYesterday', () => {
  afterEach(() => { vi.useRealTimers() })

  it('returns true for yesterday', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T10:00:00'))
    expect(isYesterday('2026-03-13')).toBe(true)
  })
})
