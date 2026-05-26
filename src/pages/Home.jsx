import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import PremiumButton from '../components/PremiumButton'
import { AudioContext } from '../App'

const WORDS = ['Happy', 'Birthday,', 'Edignar.']

const TWENTY = '20'

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState([])
  const audio = useContext(AudioContext)

  useEffect(() => {
    WORDS.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), 600 + i * 300)
    })
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: 'var(--black)', overflow: 'hidden' }}>
      <Navbar />

      {/* Ambient glow top */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,76,0.09) 0%, transparent 65%)',
      }} />

      {/* Thin horizontal rule */}
      <div style={{
        position: 'absolute', top: '50%', left: '8%', right: '8%',
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.12), transparent)',
        zIndex: 1,
      }} />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', textAlign: 'center', padding: '0 2rem',
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='label'
          style={{ marginBottom: '3rem' }}
        >
          Turning 20 — A cinematic birthday experience
        </motion.p>

        {/* Headline — word by word */}
        <h1 className='display' style={{
          fontSize: 'clamp(3rem, 9vw, 8.5rem)',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '0 0.28em',
          marginBottom: '0.1em',
        }}>
          {WORDS.map((word, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity:   visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)',
              color: i === WORDS.length - 1 ? 'transparent' : 'var(--white)',
              ...(i === WORDS.length - 1 ? { WebkitTextStroke: '1.5px var(--gold)' } : {}),
            }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Giant 20 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16,1,0.3,1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 22vw, 20rem)',
            fontWeight: 300,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(201,168,76,0.35)',
            color: 'transparent',
            userSelect: 'none',
            marginBottom: '1.5rem',
          }}
        >
          {TWENTY}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
          style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 2.2vw, 1.5rem)',
            color: 'rgba(245,242,236,0.42)',
            maxWidth: 500, lineHeight: 1.75, marginBottom: '2.5rem', fontWeight: 300,
          }}
        >
          Two decades of being exactly<br />
          who you were meant to be.
        </motion.p>

        {/* Personal note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4 }}
          style={{
            maxWidth: 480,
            padding: '1.6rem 2rem',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: 2,
            marginBottom: '3rem',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          {/* Quote mark */}
          <span style={{
            position: 'absolute', top: '-0.8rem', left: '1.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '3rem', lineHeight: 1,
            color: 'var(--gold)', opacity: 0.4,
          }}>
            "
          </span>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'rgba(245,242,236,0.6)',
            lineHeight: 1.9,
            fontWeight: 300,
          }}>
            I made this for you. Hope it makes you smile —
            the way you always make everyone around you smile
            without even trying. For every meme sent at odd hours,
            every happy thing discovered and just had to share,
            every big dream we've talked about, every business idea,
            every daily check-in. This is for all of it. All of you.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.6,
            marginTop: '1rem',
          }}>
            — Your friend who will always remind you of the streak
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <PremiumButton text='Begin The Experience' onClick={() => navigate('/gallery')} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          style={{
            position: 'absolute', bottom: '2.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span className='label' style={{ color: 'rgba(245,242,236,0.18)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(201,168,76,0.35), transparent)' }}
          />
        </motion.div>
      </div>

      {/* Now Playing — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 3.4 }}
        style={{
          position: 'absolute', bottom: '2.2rem', left: '2rem',
          display: 'flex', alignItems: 'center', gap: 12, zIndex: 10,
        }}
      >
        {/* Animated equaliser bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 18 }}>
          {[0.55, 1, 0.7, 0.85, 0.45].map((h, i) => (
            <motion.div
              key={i}
              animate={audio?.playing
                ? { scaleY: [h, 1, h * 0.3, 0.9, h] }
                : { scaleY: 0.15 }
              }
              transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.13, ease: 'easeInOut' }}
              style={{
                width: 2.5, height: 18,
                background: 'var(--gold)',
                borderRadius: 2,
                transformOrigin: 'bottom',
                opacity: audio?.playing ? 0.75 : 0.3,
                transition: 'opacity 0.5s',
              }}
            />
          ))}
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.45)', marginBottom: 3,
          }}>
            {audio?.playing ? 'Now Playing' : 'Click anywhere to play'}
          </p>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: '0.82rem', color: 'rgba(245,242,236,0.55)', fontWeight: 300,
          }}>
            Young and Beautiful — Lana Del Rey
          </p>
        </div>
      </motion.div>

      {/* Corner accents */}
      {[
        { top: 80, left: 32, borderTop: '1px solid rgba(201,168,76,0.25)', borderLeft: '1px solid rgba(201,168,76,0.25)' },
        { top: 80, right: 32, borderTop: '1px solid rgba(201,168,76,0.25)', borderRight: '1px solid rgba(201,168,76,0.25)' },
        { bottom: 32, left: 32, borderBottom: '1px solid rgba(201,168,76,0.25)', borderLeft: '1px solid rgba(201,168,76,0.25)' },
        { bottom: 32, right: 32, borderBottom: '1px solid rgba(201,168,76,0.25)', borderRight: '1px solid rgba(201,168,76,0.25)' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: 38, height: 38, ...style }} />
      ))}
    </section>
  )
}