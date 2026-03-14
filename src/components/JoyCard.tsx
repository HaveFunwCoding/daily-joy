import { useState } from 'react'
import type { DayRecord } from '../types'
import { formatDate } from '../utils/dates'

interface Props {
  date: string
  record: DayRecord
}

export default function JoyCard({ date, record }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left bg-white rounded-2xl border border-card-border p-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
      aria-expanded={expanded}
    >
      <div className="text-sm font-medium text-primary mb-3">
        {formatDate(date)}
      </div>
      <div className="space-y-2 mb-3">
        {record.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-text">
            <span className="text-secondary mt-0.5 shrink-0">☀️</span>
            <span className={expanded ? 'leading-relaxed' : 'leading-relaxed line-clamp-1'}>
              {item}
            </span>
          </div>
        ))}
      </div>
      {expanded && (
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-3 text-center motion-safe:animate-fade-in">
          <p className="text-white/90 text-xs italic leading-relaxed">
            "{record.quote.text}"
          </p>
          <p className="text-white/60 text-[10px] mt-1">
            — {record.quote.author}
          </p>
        </div>
      )}
    </button>
  )
}
