import { useNavigate } from 'react-router-dom'
import BadgeGrid from '../components/BadgeGrid'
import HeatMap from '../components/HeatMap'
import { storage } from '../utils/storage'
import { calculateStreak } from '../utils/streak'
import { initBadges } from '../utils/badges'
import { getTodayDate } from '../utils/dates'

export default function Achievements() {
  const navigate = useNavigate()
  const records = storage.getRecords()
  const streak = calculateStreak(records, getTodayDate())
  let badges = storage.getBadges()
  if (badges.length === 0) badges = initBadges()

  function handleExport() {
    const data = storage.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-joy-backup-${getTodayDate()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-dvh bg-bg pb-12">
      {/* Top bar */}
      <div className="flex items-center px-4 pt-6 pb-4">
        <button
          onClick={() => navigate('/')}
          className="text-primary-dark p-2 -ml-2 active:scale-95"
          aria-label="返回"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-heading text-xl text-primary-dark ml-2">我的成就</h1>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-card-border rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-dark">{streak.current}</div>
            <div className="text-xs text-text-muted">连续打卡</div>
          </div>
          <div className="bg-card border border-card-border rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-dark">{streak.longest}</div>
            <div className="text-xs text-text-muted">最长连续</div>
          </div>
          <div className="bg-card border border-card-border rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-dark">{streak.totalDays}</div>
            <div className="text-xs text-text-muted">总天数</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-6">
        <h2 className="text-base font-semibold text-text mb-3">成就徽章</h2>
        <BadgeGrid badges={badges} />
      </div>

      {/* Heat Map */}
      <div className="px-4 mb-8">
        <h2 className="text-base font-semibold text-text mb-3">打卡日历</h2>
        <div className="bg-white rounded-2xl border border-card-border p-4">
          <HeatMap records={records} />
        </div>
      </div>

      {/* Export */}
      <div className="px-4">
        <button
          onClick={handleExport}
          className="w-full py-3 rounded-full border border-card-border text-text-muted text-sm active:scale-[0.98] transition-transform"
        >
          导出数据备份
        </button>
      </div>
    </div>
  )
}
