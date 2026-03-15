import type { Badge } from '../types'
import { BADGE_ICON_MAP } from '../utils/icons'

interface Props {
  badge: Badge
  onClose: () => void
}

export default function BadgeUnlock({ badge, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 motion-safe:animate-fade-in">
      <div className="bg-white rounded-3xl p-8 mx-8 text-center shadow-xl">
        <div className="text-6xl mb-4 motion-safe:animate-bounce">
          {BADGE_ICON_MAP[badge.icon] ?? '🎯'}
        </div>
        <h2 className="font-heading text-xl text-primary-dark mb-2">
          恭喜解锁！
        </h2>
        <p className="text-lg font-semibold text-text mb-1">
          {badge.name}
        </p>
        <p className="text-sm text-text-muted mb-6">
          {badge.condition}
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-full font-medium active:scale-95 transition-transform min-h-[44px]"
        >
          太棒了！
        </button>
      </div>
    </div>
  )
}
