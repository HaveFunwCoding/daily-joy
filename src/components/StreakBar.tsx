import { useNavigate } from 'react-router-dom'
import type { Streak } from '../types'

interface Props {
  streak: Streak
}

export default function StreakBar({ streak }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/achievements')}
      className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-2xl border border-card-border shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <div>
          <div className="text-lg font-semibold text-primary-dark">
            {streak.current} 天
          </div>
          <div className="text-xs text-text-muted">连续打卡</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-text">
          共 {streak.totalDays} 天
        </div>
        <div className="text-xs text-text-muted">总打卡</div>
      </div>
    </button>
  )
}
