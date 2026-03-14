import { describe, it, expect } from 'vitest'
import { pickQuote } from '../quotes'
import type { Records } from '../../types'

describe('pickQuote', () => {
  it('returns a quote object with id, text, author', () => {
    const quote = pickQuote({})
    expect(quote).toHaveProperty('id')
    expect(quote).toHaveProperty('text')
    expect(quote).toHaveProperty('author')
    expect(quote.text.length).toBeGreaterThan(0)
  })

  it('avoids recently used quotes', () => {
    const makeRecord = (id: number) => ({
      items: ['a', 'b', 'c'] as [string, string, string],
      quote: { id, text: 'q', author: 'a' },
      createdAt: '',
    })

    // Create records using quote IDs 0-9
    const records: Records = {}
    for (let i = 0; i < 10; i++) {
      records[`2026-03-${String(i + 1).padStart(2, '0')}`] = makeRecord(i)
    }

    // Pick 20 quotes; none should have id 0-9
    const picks = new Set<number>()
    for (let i = 0; i < 20; i++) {
      picks.add(pickQuote(records).id)
    }

    for (let i = 0; i < 10; i++) {
      expect(picks.has(i)).toBe(false)
    }
  })
})
