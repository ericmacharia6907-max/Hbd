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

const SLIDES = [
  { photo: photo1,  caption: 'This is the energy you bring into every room.',         sub: 'Chapter I',    origin: 'center' },
  { photo: photo2,  caption: 'Real, unfiltered, exactly yourself. Always.',           sub: 'Chapter II',   origin: '30% 70%' },
  { photo: photo3,  caption: 'Unbothered. Hilarious. Iconic, honestly.',              sub: 'Chapter III',  origin: '70% 30%' },
  { photo: photo4,  caption: 'You find the funny in everything. Everything.',         sub: 'Chapter IV',   origin: 'center' },
  { photo: photo5,  caption: 'Keeping it simple, keeping it real — that\'s you.',     sub: 'Chapter V',    origin: '50% 80%' },
  { photo: photo6,  caption: 'The one who makes 7am feel less rough with one meme.',  sub: 'Chapter VI',   origin: '20% 50%' },
  { photo: photo7,  caption: 'Happy looks good on you. It always has.',               sub: 'Chapter VII',  origin: '80% 20%' },
  { photo: photo8,  caption: 'This is what main character energy actually looks like.', sub: 'Chapter VIII', origin: 'center' },
  { photo: photo9,  caption: 'A good listener and an even better storyteller.',       sub: 'Chapter IX',   origin: '40% 60%' },
  { photo: photo10, caption: 'The kind of person people are just lucky to know.',     sub: 'Chapter X',    origin: '60% 40%' },
  { photo: photo11, caption: 'Twenty looks really good on you, Edignar.',             sub: 'Chapter XI',   origin: 'center' },
]

const DURATION = 6000

// Diagonal clip-path polygons for the wipe
const CLIP_HIDDEN = 'polygon(100% 0%, 100% 0%, 100% 100%, 110% 100%)'
const CLIP_VISIBLE = 'polygon(-10% 0%, 100% 0%, 100% 100%, -10% 100%)'

export default function Gallery() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1)
  const [paused,  setPaused]  = useState(false)

  const goTo = useCallback((idx, direction) => {
    setDir(direction)
    setCurrent(idx)
  }, [])

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
      {/* ── Diagonal wipe layer ── */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{
            clipPath: dir > 0
              ? 'polygon(100% 0%, 100% 0%, 100% 100%, 110% 100%)'
              : 'polygon(-10% 0%, -10% 0%, -10% 100%, -10% 100%)',
            scale: 1.08,
          }}
          animate={{
            clipPath: 'polygon(-10% 0%, 100% 0%, 100% 100%, -10% 100%)',
            scale: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            clipPath: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
            scale:    { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img
            src={slide.photo}
            alt=''
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: slide.origin,
            }}
          />
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

      {/* Thin gold diagonal seam that sweeps across on transition */}
      <motion.div
        key={`seam-${current}`}
        initial={{ x: dir > 0 ? '100%' : '-100%', opacity: 1 }}
        animate={{ x: dir > 0 ? '-100%' : '100%', opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.76,0,0.24,1] }}
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '3px',
          background: 'var(--gold)',
          zIndex: 8, pointerEvents: 'none',
          transform: 'skewX(-12deg)',
          boxShadow: '0 0 24px rgba(201,168,76,0.6)',
        }}
      />

      {/* ── Header ── */}
      <div style={{ position: 'absolute', top: '5.5rem', left: '3rem', zIndex: 20 }}>
        <p className='label'>Memory Archive</p>
      </div>

      {/* ── Slide counter ── */}
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
        <div style={{ maxWidth: 560 }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16,1,0.3,1] }}
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