import GiftReveal from '../components/gift-reveal'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-900">
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-4xl md:text-6xl font-bold text-white text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Merry Christmas, My Love!
        </h1>
        <GiftReveal />
      </main>
    </div>
  )
}

