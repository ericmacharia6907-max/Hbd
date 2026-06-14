import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device — hide cursor entirely
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    let ringX = 0, ringY = 0
    let dotX  = 0, dotY  = 0
    let raf

    const onMove = (e) => {
      dotX  = e.clientX
      dotY  = e.clientY
    }

    const loop = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12

      if (dot.current) {
        dot.current.style.left = dotX  + 'px'
        dot.current.style.top  = dotY  + 'px'
      }
      if (ring.current) {
        ring.current.style.left = ringX + 'px'
        ring.current.style.top  = ringY + 'px'
      }
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => ring.current?.classList.add('hover')
    const onLeave = () => ring.current?.classList.remove('hover')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dot}  className='cursor-dot'  />
      <div ref={ring} className='cursor-ring' />
    </>
  )
}