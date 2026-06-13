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
  { photo: photo1,  caption: 'The person I was watching from across campus. Worth it.',         sub: 'Chapter I',    origin: 'center' },
  { photo: photo2,  caption: 'No lies, no filter. Just real friendship from day one.',           sub: 'Chapter II',   origin: '30% 70%' },
  { photo: photo3,  caption: 'Unbothered. Hilarious. Impossible to be bored around.',           sub: 'Chapter III',  origin: '70% 30%' },
  { photo: photo4,  caption: 'She finds the funny in everything. Everything.',                  sub: 'Chapter IV',   origin: 'center' },
  { photo: photo5,  caption: 'Keeps it simple. Keeps it real. No drama, just good vibes.',     sub: 'Chapter V',    origin: '50% 80%' },
  { photo: photo6,  caption: 'The one who forwards you a meme at 7am and it\'s always funny.',  sub: 'Chapter VI',   origin: '20% 50%' },
  { photo: photo7,  caption: 'Happy looks good on you. It always has.',                         sub: 'Chapter VII',  origin: '80% 20%' },
  { photo: photo8,  caption: 'One Tuesday text changed everything. Glad I sent it.',            sub: 'Chapter VIII', origin: 'center' },
  { photo: photo9,  caption: 'She actually listens to every story, every voice note. Every one.', sub: 'Chapter IX', origin: '40% 60%' },
  { photo: photo10, caption: 'The kind of friend you didn\'t know you needed until she showed up.', sub: 'Chapter X', origin: '60% 40%' },
  { photo: photo11, caption: 'Twenty years in the making. Lucky to know you in this one.',     sub: 'Chapter XI',   origin: 'center' },
]

const DURATION = 6000

export default function Gallery() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setTimeout(() => setAnimating(false), 50)
    }, 600) // curtains close before swapping image
  }, [animating])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => goTo((current + 1) % SLIDES.length), DURATION)
    return () => clearTimeout(t)
  }, [current, paused, goTo])

  const prev_slide = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next_slide = () => goTo((current + 1) % SLIDES.length)

  const slide = SLIDES[current]

  return (
    <section
      style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Base image (always current) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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
      </div>

      {/* ── Curtain panels ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', pointerEvents: 'none',
      }}>
        <motion.div
          animate={{ x: animating ? '0%' : '-100%' }}
          transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }}
          style={{
            width: '50%', height: '100%',
            background: 'var(--black)',
            borderRight: '1px solid rgba(201,168,76,0.15)',
          }}
        />
        <motion.div
          animate={{ x: animating ? '0%' : '100%' }}
          transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }}
          style={{
            width: '50%', height: '100%',
            background: 'var(--black)',
            borderLeft: '1px solid rgba(201,168,76,0.15)',
          }}
        />
      </div>

      {/* ── Center gold seam line (decorative) ── */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%',
        width: 1, background: 'rgba(201,168,76,0.1)',
        zIndex: 6, transform: 'translateX(-50%)',
      }} />

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
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16,1,0.3,1] }}
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
              onClick={() => goTo(i)}
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