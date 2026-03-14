import { useMemo } from 'react'
import StreakBar from '../components/StreakBar'
import JoyCard from '../components/JoyCard'
import FloatingButton from '../components/FloatingButton'
import { storage } from '../utils/storage'
import { calculateStreak } from '../utils/streak'
import { getTodayDate } from '../utils/dates'

export default function Home() {
  const records = storage.getRecords()
  const today = getTodayDate()
  const streak = useMemo(() => calculateStreak(records, today), [records, today])
  const checkedIn = !!records[today]

  const sortedDates = Object.keys(records).sort().reverse()

  return (
    <div className="min-h-dvh bg-bg pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="font-heading text-2xl text-primary-dark text-center mb-4">
          每日小确幸
        </h1>
        <StreakBar streak={streak} />
      </div>

      {/* Card Flow */}
      <div className="px-4 mt-4 space-y-4">
        {sortedDates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌻</div>
            <p className="text-text-muted text-lg mb-2">还没有记录</p>
            <p className="text-text-muted text-sm">
              点击右下角的 + 开始记录你的第一个小确幸吧
            </p>
          </div>
        ) : (
          <>
            {!checkedIn && (
              <div className="bg-card border border-card-border rounded-2xl p-4 text-center border-dashed">
                <p className="text-primary font-medium">今天还没有记录哦</p>
                <p className="text-text-muted text-sm mt-1">点击 + 记录今天的小确幸</p>
              </div>
            )}
            {sortedDates.map(date => (
              <JoyCard key={date} date={date} record={records[date]} />
            ))}
          </>
        )}
      </div>

      <FloatingButton checkedIn={checkedIn} />
    </div>
  )
}
