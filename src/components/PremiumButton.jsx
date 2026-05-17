import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function PremiumButton({ text, onClick }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    const btn  = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x    = e.clientX - rect.left - rect.width  / 2
    const y    = e.clientY - rect.top  - rect.height / 2
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)'
  }

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor
      style={{
        position:       'relative',
        overflow:       'hidden',
        padding:        '18px 52px',
        borderRadius:   '2px',
        fontSize:       '0.7rem',
        fontFamily:     'var(--font-mono)',
        letterSpacing:  '0.3em',
        textTransform:  'uppercase',
        cursor:         'none',
        border:         '1px solid var(--gold)',
        background:     'transparent',
        color:          'var(--gold)',
        transition:     'color 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
      className='btn-premium'
    >
      {/* Fill on hover */}
      <span style={{
        position:   'absolute',
        inset:      0,
        background: 'var(--gold)',
        transform:  'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.76,0,0.24,1)',
        zIndex:     0,
      }} className='btn-fill' />

      {/* Shimmer */}
      <span style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        animation:  'shimmer 2.5s infinite',
        zIndex:     1,
      }} />

      <span style={{ position: 'relative', zIndex: 2 }} className='btn-text'>
        {text}
      </span>

      <style>{`
        .btn-premium:hover .btn-fill { transform: scaleX(1); }
        .btn-premium:hover .btn-text { color: var(--black); transition: color 0.3s; }
      `}</style>
    </motion.button>
  )
}