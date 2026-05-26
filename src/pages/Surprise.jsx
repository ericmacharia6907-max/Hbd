import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const TERMINAL_LINES = [
  { text: '> Initializing birthday protocol...',         delay: 0,    type: 'normal' },
  { text: '> Scanning 20 years of memories...',          delay: 900,  type: 'normal' },
  { text: '> Found: 1,000,000+ good moments',            delay: 1900, type: 'success' },
  { text: '> Loading inside jokes... [████████] 100%',   delay: 2900, type: 'normal' },
  { text: '> Calculating value of friendship...',        delay: 3900, type: 'normal' },
  { text: '> ERROR: Value exceeds maximum limit',        delay: 4900, type: 'error' },
  { text: '> Retrying with larger scale...',             delay: 5600, type: 'normal' },
  { text: '> ERROR: Still too large to measure',         delay: 6400, type: 'error' },
  { text: '> Compiling best memories...',                delay: 7200, type: 'normal' },
  { text: '> WARNING: Too many good times to count',     delay: 8000, type: 'warning' },
  { text: '> Verifying: Best friend status...',          delay: 8900, type: 'normal' },
  { text: '> CONFIRMED: Irreplaceable. ✓',               delay: 9800, type: 'success' },
  { text: '> Wrapping gift...',                          delay: 10700, type: 'normal' },
  { text: '> Gift ready. Happy 20th, Edignar. 🎂',       delay: 11600, type: 'success' },
]

const COLOR = {
  normal:  'rgba(245,242,236,0.7)',
  success: '#c9a84c',
  error:   '#ff6b6b',
  warning: '#f5a623',
}

export default function Surprise() {
  const navigate = useNavigate()
  const [phase, setPhase]       = useState('idle')    // idle | terminal | reveal
  const [lines, setLines]       = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const [heartfelt, setHeartfelt]   = useState(false)

  const start = () => {
    setPhase('terminal')

    // Reveal lines one by one
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line])
        // Last line — trigger confetti + reveal
        if (i === TERMINAL_LINES.length - 1) {
          setTimeout(() => {
            fireConfetti()
            setPhase('reveal')
            setTimeout(() => setHeartfelt(true), 800)
          }, 1000)
        }
      }, line.delay)
    })

    // Blinking cursor
    const cursor = setInterval(() => setShowCursor(c => !c), 530)
    setTimeout(() => clearInterval(cursor), 13500)
  }

  const fireConfetti = () => {
    const gold  = '#c9a84c'
    const white = '#f5f2ec'
    confetti({ particleCount: 80,  angle: 60,  spread: 70, origin: { x: 0,   y: 0.65 }, colors: [gold, white] })
    confetti({ particleCount: 80,  angle: 120, spread: 70, origin: { x: 1,   y: 0.65 }, colors: [gold, white] })
    setTimeout(() =>
      confetti({ particleCount: 220, spread: 180, origin: { y: 0.5 }, colors: [gold, white, '#fff'] })
    , 350)
    setTimeout(() =>
      confetti({ particleCount: 120, spread: 120, origin: { y: 0.6 }, colors: [gold, '#e8cc7a'] })
    , 750)
  }

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      background: 'var(--black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '2rem',
    }}>
      {/* Subtle ambient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: phase === 'reveal'
          ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.1), transparent 70%)'
          : 'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(201,168,76,0.04), transparent)',
        transition: 'background 2s ease',
      }} />

      <AnimatePresence mode='wait'>

        {/* ── IDLE ── */}
        {phase === 'idle' && (
          <motion.div
            key='idle'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', zIndex: 10 }}
          >
            <p className='label' style={{ marginBottom: '2rem' }}>One More Thing</p>
            <h1 className='display' style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              marginBottom: '1.5rem', lineHeight: 1.1,
            }}>
              There's something<br />
              <span className='gold-text'>waiting for you.</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.15rem', color: 'rgba(245,242,236,0.4)',
              marginBottom: '3.5rem', lineHeight: 1.8,
            }}>
              Press the button when you're ready.
            </p>
            <button
              onClick={start}
              data-cursor
              style={{
                background: 'none', border: '1px solid var(--gold)',
                color: 'var(--gold)', padding: '18px 56px',
                borderRadius: 2,
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                cursor: 'none', position: 'relative', overflow: 'hidden',
              }}
            >
              Open Gift
            </button>
          </motion.div>
        )}

        {/* ── TERMINAL ── */}
        {phase === 'terminal' && (
          <motion.div
            key='terminal'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              zIndex: 10, width: '100%', maxWidth: 680,
              background: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.05)',
            }}
          >
            {/* Terminal title bar */}
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(201,168,76,0.06)',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.2em', color: 'rgba(245,242,236,0.3)',
                marginLeft: 8,
              }}>
                birthday-gift.exe
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: '1.5rem 1.8rem 2rem',
              minHeight: 320,
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
              lineHeight: 2,
            }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: COLOR[line.type] }}
                >
                  {line.text}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              {phase === 'terminal' && (
                <span style={{
                  display: 'inline-block', width: 8, height: '1em',
                  background: 'var(--gold)',
                  opacity: showCursor ? 0.8 : 0,
                  marginLeft: 2, verticalAlign: 'middle',
                  transition: 'opacity 0.1s',
                }} />
              )}
            </div>
          </motion.div>
        )}

        {/* ── HEARTFELT REVEAL ── */}
        {phase === 'reveal' && (
          <motion.div
            key='reveal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ zIndex: 10, textAlign: 'center', maxWidth: 640 }}
          >
            {/* Gold star */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
              style={{ fontSize: '3rem', marginBottom: '2rem' }}
            >
              ✦
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: heartfelt ? 1 : 0, y: heartfelt ? 0 : 30 }}
              transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
              className='display gold-text'
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', lineHeight: 1, marginBottom: '2.5rem' }}
            >
              You're Loved.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: heartfelt ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: 'rgba(245,242,236,0.55)',
                lineHeight: 2, marginBottom: '3.5rem',
              }}
            >
              Not just today. Not just because it's your birthday.<br />
              But every daily check-in, every big dream we've mapped out,<br />
              every story you sat through in those voice notes —<br />
              <span style={{ color: 'rgba(201,168,76,0.8)' }}>
                you're the friend I was looking for all along.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: heartfelt ? 1 : 0, y: heartfelt ? 0 : 16 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button
                onClick={() => navigate('/ending')}
                data-cursor
                style={{
                  background: 'none', border: '1px solid var(--gold)',
                  color: 'var(--gold)', padding: '16px 48px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  cursor: 'none',
                }}
              >
                Continue →
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}