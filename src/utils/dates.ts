const GRACE_HOUR = 4

export function getEffectiveDate(hasYesterdayRecord = true): string {
  const now = new Date()
  if (now.getHours() < GRACE_HOUR && !hasYesterdayRecord) {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return toDateString(yesterday)
  }
  return toDateString(now)
}

export function getTodayDate(): string {
  return toDateString(new Date())
}

export function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const currentYear = new Date().getFullYear()
  const month = `${m}月${d}日`
  return y !== currentYear ? `${y}年${month}` : month
}

export function isToday(dateStr: string): boolean {
  return dateStr === toDateString(new Date())
}

export function isYesterday(dateStr: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateStr === toDateString(yesterday)
}

export function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA)
  const b = new Date(dateB)
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}
