import type { Badge } from '../types'
import { BADGE_ICON_MAP } from '../utils/icons'

interface Props {
  badges: Badge[]
}

export default function BadgeGrid({ badges }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map(badge => {
        const unlocked = !!badge.unlockedAt
        return (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
              unlocked
                ? 'bg-card border-card-border shadow-sm'
                : 'bg-gray-50 border-gray-200 opacity-50'
            }`}
          >
            <div className={`text-3xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
              {BADGE_ICON_MAP[badge.icon] ?? '🎯'}
            </div>
            <div className="text-xs font-medium text-text text-center">
              {badge.name}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">
              {badge.condition}
            </div>
            {!unlocked && (
              <div className="text-[10px] text-text-muted mt-1">🔒</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
