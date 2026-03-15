# 每日小确幸 (Daily Joy)

A mobile-first PWA for daily gratitude journaling. Record 3 joyful moments each day, get inspired by quotes, and build streaks with achievement badges.

## Features

- **Guided 3-step input** — Prompts walk you through recording 3 happy moments
- **Inspirational quotes** — 100 Chinese/English quotes shown after each entry
- **Streak tracking** — Current streak, longest streak, and total days
- **Achievement badges** — 7 milestones from first check-in to 365-day streak
- **Calendar heat map** — Visual overview of your check-in history
- **Grace period** — Forgot yesterday? Fill it in before 4 AM
- **Data export** — Download your journal as JSON backup
- **PWA** — Install on phone or desktop, works offline

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (honey-amber theme)
- localStorage (no backend needed)
- vite-plugin-pwa (service worker + manifest)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run tests (28 unit tests) |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── pages/           # Home, Record, Achievements
├── components/      # StreakBar, JoyCard, FloatingButton, QuoteDisplay,
│                    # BadgeGrid, HeatMap, BadgeUnlock
├── utils/           # dates, storage, streak, badges, quotes, icons
├── data/            # quotes.json (100 quotes)
├── styles/          # Tailwind entry + animations
├── types.ts         # Shared TypeScript interfaces
└── App.tsx          # Router (3 routes)
```

## Design

- **Style:** Soft UI Evolution with warm, healing tone
- **Colors:** Honey-amber (#D97706 primary, #FFFDF5 background)
- **Fonts:** ZCOOL XiaoWei (headings) + Quicksand (body)
- **Mobile-first:** 44px touch targets, 16px min text, responsive layout
