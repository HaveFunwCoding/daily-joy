import { useNavigate } from 'react-router-dom'

interface Props {
  checkedIn: boolean
}

export default function FloatingButton({ checkedIn }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/record')}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform z-50"
      aria-label={checkedIn ? '编辑今日记录' : '记录今天的小确幸'}
    >
      {checkedIn ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  )
}
