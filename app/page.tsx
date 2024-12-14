'use client'

import GiftReveal from '../components/gift-reveal'

const Snowflake = ({ style }) => (
  <div
    className="absolute text-white opacity-20 animate-fall pointer-events-none"
    style={style}
  >
    ❄
  </div>
)

const DecorativeBorder = () => (
  <>
    <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-white/20 rounded-tl-3xl" />
    <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-white/20 rounded-tr-3xl" />
    <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-white/20 rounded-bl-3xl" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-white/20 rounded-br-3xl" />
  </>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-700 to-red-900 relative overflow-hidden">
      {/* Animated Snowflakes */}
      {[...Array(20)].map((_, i) => (
        <Snowflake
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            fontSize: `${Math.random() * 10 + 10}px`
          }}
        />
      ))}

      <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
        <DecorativeBorder />

        {/* Christmas Decorations */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl">
          🎄
        </div>
        <div className="absolute top-20 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
          ⭐
        </div>
        <div className="absolute top-16 right-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
          🎅
        </div>

        {/* Main Content */}
        <h1 className="mb-8 text-4xl md:text-6xl font-bold text-center">
          <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] block">
            Merry Christmas,
          </span>
          <span className="text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] block mt-2">
            baby!
          </span>
        </h1>

        <div className="relative z-10">
          <GiftReveal />
        </div>

        {/* Bottom Decorations */}
        <div className="absolute bottom-8 left-1/3 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>
          🎁
        </div>
        <div className="absolute bottom-12 right-1/3 text-2xl animate-bounce" style={{ animationDelay: '0.7s' }}>
          🎄
        </div>
      </main>
    </div>
  )
}