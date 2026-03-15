import { useState, useMemo } from 'react'
import type { Records } from '../types'

interface Props {
  records: Records
}

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { firstDay, daysInMonth }
}

function formatMonthLabel(year: number, month: number): string {
  return `${year}年${month + 1}月`
}

function MonthGrid({ year, month, recordDates }: { year: number; month: number; recordDates: Set<string> }) {
  const { firstDay, daysInMonth } = getMonthData(year, month)
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const hasRecord = recordDates.has(dateStr)
    days.push(
      <div
        key={dateStr}
        className={`aspect-square rounded-md flex items-center justify-center text-xs min-h-[32px] ${
          hasRecord
            ? 'bg-primary text-white font-medium'
            : 'bg-gray-100 text-text-muted'
        }`}
      >
        {d}
      </div>
    )
  }
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-text text-center mb-2">
        {formatMonthLabel(year, month)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['日', '一', '二', '三', '四', '五', '六'].map(d => (
          <div key={d} className="text-[10px] text-text-muted py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  )
}

export default function HeatMap({ records }: Props) {
  const now = new Date()
  const [page, setPage] = useState(0) // 0 = most recent 3 months, 1 = 3 months before that, etc.

  const recordDates = useMemo(() => new Set(Object.keys(records)), [records])

  // Generate 3 months for current page (newest first)
  const months = useMemo(() => {
    const result = []
    for (let i = 0; i < 3; i++) {
      const monthOffset = page * 3 + i
      const d = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)
      result.push({ year: d.getFullYear(), month: d.getMonth() })
    }
    return result
  }, [page])

  return (
    <div>
      {months.map(({ year, month }) => (
        <MonthGrid key={`${year}-${month}`} year={year} month={month} recordDates={recordDates} />
      ))}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => setPage(p => p + 1)}
          className="text-primary text-sm p-2 min-h-[44px] min-w-[44px] active:scale-95"
          aria-label="更早的月份"
        >
          ← 更早
        </button>
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="text-primary text-sm p-2 min-h-[44px] min-w-[44px] active:scale-95 disabled:opacity-30"
          aria-label="更近的月份"
        >
          更近 →
        </button>
      </div>
    </div>
  )
}
