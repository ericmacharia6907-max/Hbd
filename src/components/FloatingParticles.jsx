export default function FloatingParticles() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className='absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}