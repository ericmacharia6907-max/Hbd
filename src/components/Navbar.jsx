import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AudioContext } from '../App'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const audio = useContext(AudioContext)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.4rem 2rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }} />
          </div>
          <span className='label' style={{ color: 'rgba(245,242,236,0.45)', letterSpacing: '0.3em' }}>
            For Edignar
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span className='label' style={{ color: 'rgba(245,242,236,0.25)' }}>
            A Birthday Experience
          </span>

          {/* Sound toggle */}
          <button
            onClick={audio?.toggle}
            data-cursor
            style={{
              background: 'none', border: 'none', cursor: 'none',
              display: 'flex', alignItems: 'center', gap: 8,
              color: audio?.playing ? 'var(--gold)' : 'rgba(245,242,236,0.3)',
              transition: 'color 0.3s',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            }}
          >
            <SoundIcon playing={audio?.playing} />
            {audio?.playing ? 'Sound On' : 'Sound Off'}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

function SoundIcon({ playing }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {playing ? (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </>
      ) : (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      )}
    </svg>
  )
}