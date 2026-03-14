import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Record from './pages/Record'
import Achievements from './pages/Achievements'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-bg font-body text-text">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
