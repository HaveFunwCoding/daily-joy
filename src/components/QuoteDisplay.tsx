import type { Quote } from '../types'

interface Props {
  quote: Quote
  onDone: () => void
}

export default function QuoteDisplay({ quote, onDone }: Props) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center px-8 animate-fade-in">
      <div className="text-white/30 text-6xl mb-8">"</div>
      <p className="text-white text-xl leading-relaxed text-center font-medium italic mb-4">
        {quote.text}
      </p>
      <p className="text-white/70 text-sm mb-12">
        — {quote.author}
      </p>
      <button
        onClick={onDone}
        className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full text-base font-medium transition-colors active:scale-95"
      >
        完成 ✨
      </button>
    </div>
  )
}
