import { useNavigate } from 'react-router-dom'
import PremiumButton from '../components/PremiumButton'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-black via-purple-950 to-black px-6'>
      <h1 className='text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-pink-500 to-yellow-300 text-transparent bg-clip-text'>
        Happy Birthday ??
      </h1>

      <p className='text-2xl md:text-4xl text-gray-300 max-w-4xl leading-relaxed mb-12'>
        Some people make life ordinary.
        You make it magical.
      </p>

      <PremiumButton
        text='See Memories ??'
        onClick={() => navigate('/gallery')}
      />
    </section>
  )
}
