import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PremiumButton from '../components/PremiumButton'

const moments = [
  {
    number: '001',
    title:  'The Quiet Observation',
    body:   'We joined campus and I already knew I wanted a real friend. I just didn\'t know it would be you. So I did what made sense at the time — I watched. Every move. You already know this. And you still became my friend anyway. That says everything about you.',
  },
  {
    number: '002',
    title:  'That Tuesday',
    body:   'One random Tuesday I decided to stop watching and just text. No grand plan, no perfect opening line. Just a text. And that was it — that was the beginning of everything. Funny how the best things start on the most ordinary days.',
  },
  {
    number: '003',
    title:  'The Pact',
    body:   'No lies. Ever. That was the agreement and we\'ve kept it. There\'s something rare about a friendship where honesty isn\'t even a question — it\'s just the foundation. That\'s what we built this on.',
  },
  {
    number: '004',
    title:  'The Future We Keep Talking About',
    body:   'The business. The bucket list. The daily AI streak you keep forgetting and I keep reminding you about. We don\'t just talk about the future — we actually plan for it. Turning 20 is just the beginning of everything we\'ve already mapped out.',
  },
]

function MomentCard({ moment, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current?.classList.add('visible')
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className='reveal' style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      alignItems: 'start',
      gap: '0 0',
      marginBottom: '4rem',
      transitionDelay: `${index * 0.1}s`,
    }}>
      {/* Left content */}
      <div style={{ padding: '0 3rem 0 0', textAlign: 'right', ...(isEven ? {} : { opacity: 0 }) }}>
        {isEven && <CardContent moment={moment} align='right' />}
      </div>

      {/* Center line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 0 4px rgba(201,168,76,0.15), 0 0 20px rgba(201,168,76,0.3)',
          flexShrink: 0,
          marginTop: 8,
        }} />
      </div>

      {/* Right content */}
      <div style={{ padding: '0 0 0 3rem', ...(!isEven ? {} : { opacity: 0 }) }}>
        {!isEven && <CardContent moment={moment} align='left' />}
      </div>
    </div>
  )
}

function CardContent({ moment, align }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(201,168,76,0.1)',
      borderRadius: 2,
      padding: '2rem',
      textAlign: align,
    }}>
      <p className='label' style={{ marginBottom: '0.75rem' }}>{moment.number}</p>
      <h3 className='display' style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.75rem' }}>
        {moment.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        color: 'rgba(245,242,236,0.5)',
        lineHeight: 1.8,
        fontWeight: 300,
      }}>
        {moment.body}
      </p>
    </div>
  )
}

export default function Timeline() {
  const navigate = useNavigate()

  return (
    <section style={{ minHeight: '100vh', background: 'var(--black)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p className='label' style={{ marginBottom: '1.5rem' }}>The Journey</p>
          <h1 className='display gold-text' style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>
            Timeline
          </h1>
          <div className='line-gold' style={{ marginTop: '2rem', maxWidth: 200, margin: '2rem auto 0' }} />
        </div>

        {/* Vertical line */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2) 10%, rgba(201,168,76,0.2) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {moments.map((m, i) => (
            <MomentCard key={i} moment={m} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <PremiumButton text='Open Surprise' onClick={() => navigate('/surprise')} />
        </div>
      </div>
    </section>
  )
}