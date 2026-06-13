import { useRef, useState, useEffect, createContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Cursor   from './components/Cursor'
import Home     from './pages/Home'
import Gallery  from './pages/Gallery'
import Timeline from './pages/Timeline'
import Surprise from './pages/Surprise'
import Wish     from './pages/Wish'
import Ending   from './pages/Ending'

import ambientMusic from './assets/music/Lana Del Rey - Young and Beautiful.mp3'

export const AudioContext = createContext(null)

export default function App() {
  const location = useLocation()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)

  const enableSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.28
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
    setShowPrompt(false)
  }

  const dismissPrompt = () => setShowPrompt(false)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else         { audioRef.current.play();  setPlaying(true)  }
  }

  return (
    <AudioContext.Provider value={{ playing, toggle }}>
      <Cursor />
      <audio ref={audioRef} src={ambientMusic} loop preload='auto' />

      {/* Sound enable popup */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(8,8,8,0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16,1,0.3,1] }}
              style={{
                textAlign: 'center', maxWidth: 420,
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 6,
                padding: '3rem 2.5rem',
                background: 'rgba(15,15,15,0.6)',
              }}
            >
              {/* Speaker icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{ marginBottom: '1.5rem' }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" style={{ margin: '0 auto' }}>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </motion.div>

              <h2 className='display' style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                This is best experienced<br />with sound on.
              </h2>
              <p style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: '0.95rem', color: 'rgba(245,242,236,0.45)',
                marginBottom: '2rem', lineHeight: 1.7,
              }}>
                Tap below to turn on the music — it makes the whole thing feel different.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                <button
                  onClick={enableSound}
                  data-cursor
                  style={{
                    background: 'var(--gold)', border: '1px solid var(--gold)',
                    color: 'var(--black)', padding: '14px 48px',
                    borderRadius: 2,
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    cursor: 'none', fontWeight: 600,
                  }}
                >
                  Enable Sound
                </button>
                <button
                  onClick={dismissPrompt}
                  data-cursor
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(245,242,236,0.3)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'none', padding: '8px',
                  }}
                >
                  Continue without sound
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/'         element={<Home     />} />
          <Route path='/gallery'  element={<Gallery  />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/surprise' element={<Surprise />} />
          <Route path='/wish'     element={<Wish     />} />
          <Route path='/ending'   element={<Ending   />} />
        </Routes>
      </AnimatePresence>
    </AudioContext.Provider>
  )
}