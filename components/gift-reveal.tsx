'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Snowflake = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" width="24" height="24">
    <path
      fill="currentColor"
      d="M11 2h2v5.17l4.88-2.82 1 1.73L14 8.9V12l4.88 2.82-1 1.73L13 13.73V19h-2v-5.17l-4.88 2.82-1-1.73L10 12V8.9L5.12 6.08l1-1.73L11 7.17V2z"
    />
  </svg>
)

const CornerSnowflakes = () => (
  <>
    {/* Top Left */}
    <Snowflake 
      className="absolute text-white opacity-80 w-8 h-8 -rotate-45"
      style={{ left: '1rem', top: '1rem' }}
    />
    {/* Top Right */}
    <Snowflake 
      className="absolute text-white opacity-80 w-8 h-8 rotate-45"
      style={{ right: '1rem', top: '1rem' }}
    />
    {/* Bottom Left */}
    <Snowflake 
      className="absolute text-white opacity-80 w-8 h-8 rotate-45"
      style={{ left: '1rem', bottom: '1rem' }}
    />
    {/* Bottom Right */}
    <Snowflake 
      className="absolute text-white opacity-80 w-8 h-8 -rotate-45"
      style={{ right: '1rem', bottom: '1rem' }}
    />
  </>
)

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAccommodation, setShowAccommodation] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  const ticketImages = [
    '/plane-tickets-1.jpg',
    '/plane-tickets-2.jpg',
    '/plane-tickets-4.jpg'
  ]

  const accommodationImages = [
    '/accomodations0.jpg',
    '/accomodations1.jpg',
    '/accomodations2.jpg',
    '/accomodations3.jpg'
  ]

  const currentImages = showAccommodation ? accommodationImages : ticketImages

  const nextImage = () => {
    setImageError(false)
    setCurrentIndex((prev) => (prev + 1) % currentImages.length)
  }
  
  const prevImage = () => {
    setImageError(false)
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center relative min-h-[300px]">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl p-8 bg-green-600 hover:bg-green-500 
            text-white rounded-full shadow-lg transform transition-all duration-500 
            hover:scale-110 border-4 border-red-500 hover:border-red-400
            animate-bounce relative z-10 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
        >
          <span className="flex items-center gap-2">
            <span className="text-3xl">🎁</span>
            <span className="font-semibold">Open Gift</span>
            <span className="text-3xl">🎁</span>
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-green-800/95 backdrop-blur-sm rounded-lg max-w-4xl w-full p-6 relative overflow-hidden">
        <CornerSnowflakes />
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">
            {showAccommodation ? "Where are we staying?!" : "🛬Nosotros vamos a Bacalar🍹"}
          </h2>
          
          <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-xl" style={{ paddingTop: '56.25%' }}>
            {!imageError && (
              <img
                src={currentImages[currentIndex]}
                alt={`${showAccommodation ? 'Accommodation' : 'Plane Tickets'} ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain transition-all duration-300"
                onError={() => setImageError(true)}
              />
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Unable to load image: {currentImages[currentIndex]}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg 
                  transform transition-transform hover:scale-110"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg 
                  transform transition-transform hover:scale-110"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <p className="text-center text-xl font-medium text-white">
            {showAccommodation ? "Maravilla Bacalar: A boutique hotel with a private palapa and dock" : "💕2/14 -> 2/17💕"}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setShowAccommodation(!showAccommodation)
                setCurrentIndex(0)
                setImageError(false)
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg 
                transform transition-transform hover:scale-105 shadow-lg"
            >
              {showAccommodation ? "Back to Tickets" : "Where We're Staying"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-green-800 font-semibold rounded-lg
                transform transition-transform hover:scale-105 shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}