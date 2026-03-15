import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuoteDisplay from '../components/QuoteDisplay'
import BadgeUnlock from '../components/BadgeUnlock'
import { storage } from '../utils/storage'
import { calculateStreak } from '../utils/streak'
import { checkNewBadges, initBadges } from '../utils/badges'
import { pickQuote } from '../utils/quotes'
import { getEffectiveDate, getTodayDate } from '../utils/dates'
import type { Quote, Badge } from '../types'

const PROMPTS = [
  '今天有什么让你开心的事？',
  '还有呢？继续记录吧',
  '最后一件，今天的小确幸',
]

export default function Record() {
  const navigate = useNavigate()
  const records = storage.getRecords()
  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })()
  const hasYesterdayRecord = !!records[yesterday]
  const effectiveDate = getEffectiveDate(hasYesterdayRecord)
  const existingRecord = storage.getRecord(effectiveDate)

  const [step, setStep] = useState(0)
  const [items, setItems] = useState<string[]>(
    existingRecord ? [...existingRecord.items] : ['', '', '']
  )
  const [currentInput, setCurrentInput] = useState(
    existingRecord ? existingRecord.items[0] : ''
  )
  const [done, setDone] = useState(false)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [newBadges, setNewBadges] = useState<Badge[]>([])
  const [showBadge, setShowBadge] = useState(false)
  const [badgeIndex, setBadgeIndex] = useState(0)

  const isEditing = !!existingRecord

  useEffect(() => {
    setCurrentInput(items[step])
  }, [step])

  function handleNext() {
    if (!currentInput.trim()) return

    const newItems = [...items]
    newItems[step] = currentInput.trim()
    setItems(newItems)

    if (step < 2) {
      setStep(step + 1)
    } else {
      const currentRecords = storage.getRecords()
      const selectedQuote = isEditing && existingRecord
        ? existingRecord.quote
        : pickQuote(currentRecords)

      storage.saveRecord(effectiveDate, {
        items: newItems as [string, string, string],
        quote: selectedQuote,
        createdAt: new Date().toISOString(),
      })

      const today = getTodayDate()
      const updatedRecords = storage.getRecords()
      const streak = calculateStreak(updatedRecords, today)
      storage.saveStreak(streak)

      let badges = storage.getBadges()
      if (badges.length === 0) badges = initBadges()
      const unlocked = checkNewBadges(badges, streak.current)
      storage.saveBadges(badges)

      setQuote(selectedQuote)
      setNewBadges(unlocked)
      setDone(true)
    }
  }

  function handleBack() {
    if (step > 0) {
      const newItems = [...items]
      newItems[step] = currentInput.trim()
      setItems(newItems)
      setStep(step - 1)
    } else {
      navigate('/')
    }
  }

  if (done && quote) {
    return (
      <>
        <QuoteDisplay
          quote={quote}
          onDone={() => {
            if (newBadges.length > 0) {
              setShowBadge(true)
            } else {
              navigate('/')
            }
          }}
        />
        {showBadge && newBadges[badgeIndex] && (
          <BadgeUnlock
            badge={newBadges[badgeIndex]}
            onClose={() => {
              if (badgeIndex < newBadges.length - 1) {
                setBadgeIndex(i => i + 1)
              } else {
                navigate('/')
              }
            }}
          />
        )}
      </>
    )
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <button
          onClick={handleBack}
          className="text-primary-dark p-2 -ml-2 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="返回"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i <= step ? 'bg-primary' : 'bg-card-border'
              }`}
            />
          ))}
        </div>
        <div className="w-[44px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        <p className="text-xs text-text-muted mb-2 tracking-wide">
          第 {step + 1} 件{isEditing ? '（编辑中）' : ''}
        </p>
        <h2 className="font-heading text-xl text-primary-dark mb-6" id="prompt-label">
          {PROMPTS[step]}
        </h2>

        <label htmlFor="joy-input" className="sr-only">{PROMPTS[step]}</label>
        <textarea
          id="joy-input"
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          placeholder="写下你的小确幸..."
          aria-labelledby="prompt-label"
          className="w-full bg-card border border-card-border rounded-2xl p-4 text-text text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[120px] placeholder:text-text-muted/50"
          autoFocus
        />
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          disabled={!currentInput.trim()}
          className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 min-h-[48px]"
        >
          {step < 2 ? '下一条 →' : (isEditing ? '保存修改' : '完成记录 ✨')}
        </button>
      </div>
    </div>
  )
}
