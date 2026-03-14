import type { Records, Quote } from '../types'
import quotesData from '../data/quotes.json'

const allQuotes: Quote[] = quotesData

export function pickQuote(records: Records): Quote {
  const sortedDates = Object.keys(records).sort().reverse()
  const recentIds = new Set(
    sortedDates.slice(0, 10).map(d => records[d].quote.id)
  )

  const available = allQuotes.filter(q => !recentIds.has(q.id))
  const pool = available.length > 0 ? available : allQuotes

  return pool[Math.floor(Math.random() * pool.length)]
}
