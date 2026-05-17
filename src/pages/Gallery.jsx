import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PremiumButton from '../components/PremiumButton'

// ── All 11 photos ──────────────────────────────────────────
import photo1  from '../assets/photos/photo 1.jpeg'
import photo2  from '../assets/photos/photo 2.jpeg'
import photo3  from '../assets/photos/photo 3.jpeg'
import photo4  from '../assets/photos/photo 4.jpg'
import photo5  from '../assets/photos/photo 5.jpeg'
import photo6  from '../assets/photos/photo 6.jpeg'
import photo7  from '../assets/photos/photo 7.jpeg'
import photo8  from '../assets/photos/photo 8.jpeg'
import photo9  from '../assets/photos/photo 9.jpg'
import photo10 from '../assets/photos/photo 10.jpg'
import photo11 from '../assets/photos/photo 11.jpg'

// Ken Burns zoom directions — alternates per slide for variety
const SLIDES = [
  { photo: photo1,  caption: 'The person I was watching from across campus. Worth it.',         sub: 'Chapter I',    zoom: 'in',  origin: 'center' },
  { photo: photo2,  caption: 'Still waiting on that hug from day one, by the way.',             sub: 'Chapter II',   zoom: 'out', origin: '30% 70%' },
  { photo: photo3,  caption: 'Unbothered. Hilarious. Impossible to be bored around.',           sub: 'Chapter III',  zoom: 'in',  origin: '70% 30%' },
  { photo: photo4,  caption: 'She finds the funny in everything. Everything.',                  sub: 'Chapter IV',   zoom: 'out', origin: 'center' },
  { photo: photo5,  caption: 'Keeps it simple. Keeps it real. No drama, just good vibes.',     sub: 'Chapter V',    zoom: 'in',  origin: '50% 80%' },
  { photo: photo6,  caption: 'The one who forwards you a meme at 7am and it\'s always funny.',  sub: 'Chapter VI',   zoom: 'out', origin: '20% 50%' },
  { photo: photo7,  caption: 'Happy looks good on you. It always has.',                         sub: 'Chapter VII',  zoom: 'in',  origin: '80% 20%' },
  { photo: photo8,  caption: 'One Tuesday text changed everything. Glad I sent it.',            sub: 'Chapter VIII', zoom: 'out', origin: 'center' },
  { photo: photo9,  caption: 'She actually listens to every voice note. Every single one.',    sub: 'Chapter IX',   zoom: 'in',  origin: '40% 60%' },
  { photo: photo10, caption: 'The kind of friend you didn\'t know you needed until she showed up.', sub: 'Chapter X', zoom: 'out', origin: '60% 40%' },
  { photo: photo11, caption: 'Twenty years in the making. Lucky to know you in this one.',     sub: 'Chapter XI',   zoom: 'in',  origin: 'center' },
]

const DURATION = 6000 // ms per slide

export default function Gallery() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState(null)
  const [dir,     setDir]     = useState(1)
  const [paused,  setPaused]  = useState(false)

  const goTo = useCallback((idx, direction) => {
    setPrev(current)
    setDir(direction)
    setCurrent(idx)
  }, [current])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => goTo((current + 1) % SLIDES.length, 1), DURATION)
    return () => clearTimeout(t)
  }, [current, paused, goTo])

  const prev_slide = () => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)
  const next_slide = () => goTo((current + 1) % SLIDES.length,  1)

  const slide = SLIDES[current]

  return (
    <section
      style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Ken Burns background layer ── */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          {/* Ken Burns zoom via CSS animation on the img */}
          <img
            src={slide.photo}
            alt=''
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: slide.origin,
              animation: slide.zoom === 'in'
                ? 'kenBurnsIn 7s ease forwards'
                : 'kenBurnsOut 7s ease forwards',
            }}
          />

          {/* Multi-layer vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to top,    rgba(0,0,0,0.85) 0%,   rgba(0,0,0,0.1) 40%),
              linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,    transparent 25%),
              linear-gradient(to right,  rgba(0,0,0,0.45) 0%,   transparent 35%),
              linear-gradient(to left,   rgba(0,0,0,0.3) 0%,    transparent 35%)
            `,
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Header ── */}
      <div style={{ position: 'absolute', top: '5.5rem', left: '3rem', zIndex: 20 }}>
        <p className='label'>Memory Archive</p>
      </div>

      {/* ── Slide counter top right ── */}
      <div style={{
        position: 'absolute', top: '5.5rem', right: '3rem', zIndex: 20,
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        letterSpacing: '0.18em', color: 'rgba(245,242,236,0.35)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <AnimatePresence mode='wait'>
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
            style={{ color: 'var(--gold)' }}
          >
            {String(current + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span style={{ opacity: 0.4 }}>/ {String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* ── Bottom content ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        padding: '0 3rem 3.5rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '2rem',
      }}>
        {/* Caption block */}
        <div style={{ maxWidth: 560 }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <p className='label' style={{ marginBottom: '0.8rem', opacity: 0.6 }}>
                {slide.sub}
              </p>
              <h2 className='display' style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                color: 'var(--white)', lineHeight: 1.2,
              }}>
                {slide.caption}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <PremiumButton text='Continue Story' onClick={() => navigate('/timeline')} />
      </div>

      {/* ── Dot strip + arrows ── */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', alignItems: 'center', gap: '0.9rem',
      }}>
        <ArrowBtn dir='left' onClick={prev_slide} />

        <div style={{ display: 'flex', gap: 6 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              style={{
                width: i === current ? 22 : 5,
                height: 5, borderRadius: 3, border: 'none', cursor: 'none',
                background: i === current ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                padding: 0,
              }}
            />
          ))}
        </div>

        <ArrowBtn dir='right' onClick={next_slide} />
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 1.5, background: 'rgba(201,168,76,0.1)', zIndex: 20,
      }}>
        <motion.div
          key={`${current}-progress`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? undefined : 1 }}
          transition={{ duration: DURATION / 1000, ease: 'linear' }}
          style={{ height: '100%', background: 'var(--gold)', transformOrigin: 'left' }}
        />
      </div>

      {/* Ken Burns keyframes injected globally */}
      <style>{`
        @keyframes kenBurnsIn {
          from { transform: scale(1);    }
          to   { transform: scale(1.04); }
        }
        @keyframes kenBurnsOut {
          from { transform: scale(1.04); }
          to   { transform: scale(1);    }
        }
      `}</style>
    </section>
  )
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      data-cursor
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(201,168,76,0.25)',
        borderRadius: '50%', width: 34, height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none', color: 'rgba(201,168,76,0.65)',
        transition: 'border-color 0.3s, color 0.3s, background 0.3s',
        flexShrink: 0,
      }}
    >
      <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
        {dir === 'left'
          ? <path d='M19 12H5M12 5l-7 7 7 7' />
          : <path d='M5 12h14M12 5l7 7-7 7' />
        }
      </svg>
    </button>
  )
}