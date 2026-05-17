import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

export default function Ending() {
  const navigate = useNavigate()
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
          For the Tuesday I finally stopped watching and just texted.<br />
          For the hug I still owe you from day one.<br />
          For every meme, every voice note, every laugh —<br />
          for simply being Edignar, in this chapter<br />
          we're lucky enough to share.
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