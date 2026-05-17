import { useNavigate } from 'react-router-dom'
import FloatingParticles from '../components/FloatingParticles'
import PremiumButton from '../components/PremiumButton'

export default function Intro() {
  const navigate = useNavigate()

  return (
    <section className='relative h-screen flex items-center justify-center bg-black text-center overflow-hidden px-6'>
      <FloatingParticles />

      <div className='z-10'>
        <h1 className='text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text'>
          A Special Surprise ?
        </h1>

        <p className='text-2xl text-gray-300 mb-12'>
          Crafted with memories, emotions and love.
        </p>

        <PremiumButton
          text='Begin The Journey'
          onClick={() => navigate('/hero')}
        />
      </div>
    </section>
  )
}
