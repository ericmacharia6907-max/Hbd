import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PremiumButton from '../components/PremiumButton'

export default function Wish() {
  const navigate = useNavigate()
  const [text, setText]       = useState('')
  const [phase, setPhase]     = useState('input') // input | sending | sent
  const containerRef = useRef(null)

  const send = () => {
    if (!text.trim()) return
    setPhase('sending')
    setTimeout(() => setPhase('sent'), 2600)
  }

  // Generate floating particles for the "sending" animation
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.2,
    duration: 2 + Math.random() * 1.5,
    size: 2 + Math.random() * 4,
  }))

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      background: 'var(--black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '2rem',
    }}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06), transparent 70%)',
      }} />

      {/* Starfield dots */}
      {phase !== 'input' && Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 2, height: 2, borderRadius: '50%',
          background: 'rgba(245,242,236,0.3)',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.6 + 0.2,
        }} />
      ))}

      <AnimatePresence mode='wait'>

        {/* ── INPUT PHASE ── */}
        {phase === 'input' && (
          <motion.div
            key='input'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 600 }}
          >
            <p className='label' style={{ marginBottom: '1.5rem' }}>One Last Thing</p>
            <h1 className='display' style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1.25rem', lineHeight: 1.1,
            }}>
              Make a wish<br />
              <span className='gold-text'>for the year ahead.</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.05rem', color: 'rgba(245,242,236,0.4)',
              marginBottom: '2.5rem', lineHeight: 1.8,
            }}>
              Type anything — a hope, a goal, a thought.<br />
              No one else will see it. It's just for you.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Write your wish here...'
              maxLength={200}
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 4,
                color: 'var(--white)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                padding: '1.2rem 1.4rem',
                resize: 'none',
                outline: 'none',
                marginBottom: '0.6rem',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
            />
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              letterSpacing: '0.15em', color: 'rgba(245,242,236,0.25)',
              textAlign: 'right', marginBottom: '2.5rem',
            }}>
              {text.length} / 200
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={send}
                disabled={!text.trim()}
                data-cursor
                style={{
                  background: 'none',
                  border: '1px solid var(--gold)',
                  color: text.trim() ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                  padding: '16px 52px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  cursor: text.trim() ? 'none' : 'not-allowed',
                  transition: 'color 0.3s, border-color 0.3s',
                  borderColor: text.trim() ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                }}
              >
                Send to the Universe
              </button>
            </div>
          </motion.div>
        )}

        {/* ── SENDING PHASE — particle animation ── */}
        {phase === 'sending' && (
          <motion.div
            key='sending'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ zIndex: 10, textAlign: 'center', position: 'relative', width: '100%', height: '60vh' }}
          >
            {/* The wish text, dissolving upward */}
            <motion.p
              initial={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              animate={{ opacity: 0, y: -120, filter: 'blur(8px)' }}
              transition={{ duration: 2.4, ease: 'easeIn' }}
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: 'var(--gold)',
                maxWidth: 600, margin: '0 auto',
                position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
                lineHeight: 1.6,
              }}
            >
              "{text}"
            </motion.p>

            {/* Rising particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -400 }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '30%',
                  left: `${p.x}%`,
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 8px rgba(201,168,76,0.8)',
                }}
              />
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className='label'
              style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}
            >
              Sending...
            </motion.p>
          </motion.div>
        )}

        {/* ── SENT PHASE ── */}
        {phase === 'sent' && (
          <motion.div
            key='sent'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
            style={{ zIndex: 10, textAlign: 'center', maxWidth: 560 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
              style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}
            >
              ✦
            </motion.div>
            <h1 className='display gold-text' style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1,
            }}>
              Wish sent.
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.1rem', color: 'rgba(245,242,236,0.5)',
              lineHeight: 1.9, marginBottom: '3rem',
            }}>
              Whatever it was — I hope it finds its way to you<br />
              this year. And if it doesn't come on its own,<br />
              you know where to find me. We'll make it happen.
            </p>
            <PremiumButton text='Continue →' onClick={() => navigate('/ending')} />
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}