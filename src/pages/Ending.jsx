import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PremiumButton from '../components/PremiumButton'

const words = [
  { text: 'Thank',  style: { color: 'var(--white)' } },
  { text: 'You',    style: { color: 'var(--white)' } },
  { text: '—',      style: { color: 'rgba(201,168,76,0.4)', fontSize: '0.6em' } },
  { text: 'always.', style: {
    WebkitTextStroke: '1px rgba(201,168,76,0.6)',
    color: 'transparent',
  }},
]

const HIDDEN_MESSAGE = `Okay, real talk — I spent way too many nights on this instead of sleeping. Worth it though.

20 is a big one. I hope this year gives you everything you've been working toward — and the stuff you haven't even said out loud yet. The confidence to go for it, the patience for the parts that take longer than expected, and a lot of moments that make you laugh as hard as you make everyone else laugh.

You deserve a really, really good year, Edignar.

Happy birthday. 🎂`

export default function Ending() {
  const navigate = useNavigate()
  const [holding, setHolding]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const timerRef = useRef(null)
  const startRef = useRef(null)

  const startHold = () => {
    if (revealed) return
    setHolding(true)
    startRef.current = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min(elapsed / 2000, 1) // 2 seconds
      setProgress(pct)
      if (pct >= 1) {
        clearInterval(timerRef.current)
        setRevealed(true)
        setHolding(false)
      }
    }, 16)
  }

  const cancelHold = () => {
    if (revealed) return
    clearInterval(timerRef.current)
    setHolding(false)
    setProgress(0)
  }

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--black)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 2rem',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 50% 40% at 20% 80%, rgba(201,168,76,0.07), transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 20%, rgba(201,168,76,0.07), transparent 60%)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='label'
          style={{ marginBottom: '3rem', color: 'rgba(245,242,236,0.35)' }}
        >
          End of experience
        </motion.p>

        {/* Big headline */}
        <h1 className='display' style={{
          fontSize: 'clamp(4.5rem, 14vw, 12rem)',
          lineHeight: 0.9,
          marginBottom: '4rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.2em',
        }}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.25, ease: [0.16,1,0.3,1] }}
              style={w.style}
            >
              {w.text}
            </motion.span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className='line-gold'
          style={{ maxWidth: 160, margin: '0 auto 3rem', transformOrigin: 'center' }}
        />

        {/* Closing poem */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(245,242,236,0.45)',
            lineHeight: 2,
            fontWeight: 300,
          }}
        >
          Twenty looks good on you already.<br />
          Here's to everything you're chasing this year —<br />
          the goals, the wins, the small joys along the way.<br />
          May it all come easier than you expect.<br />
          Happy birthday, Edignar.
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
          style={{ marginTop: '4rem' }}
        >
          <p className='label' style={{ color: 'var(--gold)' }}>
            Edignar turns 20 ✦ {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* Replay button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.4, ease: [0.16,1,0.3,1] }}
          style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div className='line-gold' style={{ width: 60 }} />
          <PremiumButton text='↺  Replay Experience' onClick={() => navigate('/')} />
        </motion.div>

        {/* Punchline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            color: 'rgba(201,168,76,0.35)',
            marginTop: '2rem',
            textTransform: 'uppercase',
          }}
        >
          P.S. — Don't forget your streak today.
        </motion.p>

        {/* ── Hidden message — hold to reveal ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 5 }}
          style={{ marginTop: '4rem' }}
        >
          <AnimatePresence mode='wait'>
            {!revealed ? (
              <motion.div
                key='prompt'
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onMouseDown={startHold}
                  onMouseUp={cancelHold}
                  onMouseLeave={cancelHold}
                  onTouchStart={startHold}
                  onTouchEnd={cancelHold}
                  data-cursor
                  style={{
                    position: 'relative',
                    background: 'none',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 999,
                    padding: '14px 36px',
                    cursor: 'none',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,236,0.4)',
                  }}
                >
                  {/* Fill progress */}
                  <span style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(201,168,76,0.15)',
                    transform: `scaleX(${progress})`,
                    transformOrigin: 'left',
                    transition: holding ? 'none' : 'transform 0.3s ease',
                  }} />
                  <span style={{ position: 'relative' }}>
                    {holding ? 'Hold...' : 'Hold to reveal something'}
                  </span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key='message'
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
                style={{
                  maxWidth: 540,
                  margin: '0 auto',
                  padding: '2rem 2.2rem',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 4,
                  background: 'rgba(201,168,76,0.03)',
                  textAlign: 'left',
                }}
              >
                <p className='label' style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
                  ✦ One More Thing ✦
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  color: 'rgba(245,242,236,0.65)',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-line',
                }}>
                  {HIDDEN_MESSAGE}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom corner accents */}
      <div style={{
        position: 'absolute', bottom: 32, left: 32,
        width: 40, height: 40,
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        borderLeft:   '1px solid rgba(201,168,76,0.2)',
      }} />
      <div style={{
        position: 'absolute', bottom: 32, right: 32,
        width: 40, height: 40,
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        borderRight:  '1px solid rgba(201,168,76,0.2)',
      }} />
    </section>
  )
}