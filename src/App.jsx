import { useRef, useState, useEffect, createContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Cursor   from './components/Cursor'
import Home     from './pages/Home'
import Gallery  from './pages/Gallery'
import Timeline from './pages/Timeline'
import Surprise from './pages/Surprise'
import Ending   from './pages/Ending'

import ambientMusic from './assets/music/Lana Del Rey - Young and Beautiful.mp3'

export const AudioContext = createContext(null)

export default function App() {
  const location = useLocation()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Autoplay on first user interaction (browser policy requires this)
  useEffect(() => {
    const start = () => {
      if (audioRef.current && !playing) {
        audioRef.current.volume = 0.28
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
      window.removeEventListener('click',      start)
      window.removeEventListener('touchstart', start)
      window.removeEventListener('keydown',    start)
    }
    window.addEventListener('click',      start)
    window.addEventListener('touchstart', start)
    window.addEventListener('keydown',    start)
    return () => {
      window.removeEventListener('click',      start)
      window.removeEventListener('touchstart', start)
      window.removeEventListener('keydown',    start)
    }
  }, [playing])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else         { audioRef.current.play();  setPlaying(true)  }
  }

  return (
    <AudioContext.Provider value={{ playing, toggle }}>
      <Cursor />
      <audio ref={audioRef} src={ambientMusic} loop preload='auto' />

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/'         element={<Home     />} />
          <Route path='/gallery'  element={<Gallery  />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/surprise' element={<Surprise />} />
          <Route path='/ending'   element={<Ending   />} />
        </Routes>
      </AnimatePresence>
    </AudioContext.Provider>
  )
}