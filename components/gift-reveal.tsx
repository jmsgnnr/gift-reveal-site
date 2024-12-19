'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)

const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { ssr: false }
)

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
    <Snowflake className="absolute text-white opacity-80 w-6 h-6 md:w-8 md:h-8 -rotate-45" style={{ left: '0.5rem', top: '0.5rem' }} />
    <Snowflake className="absolute text-white opacity-80 w-6 h-6 md:w-8 md:h-8 rotate-45" style={{ right: '0.5rem', top: '0.5rem' }} />
    <Snowflake className="absolute text-white opacity-80 w-6 h-6 md:w-8 md:h-8 rotate-45" style={{ left: '0.5rem', bottom: '0.5rem' }} />
    <Snowflake className="absolute text-white opacity-80 w-6 h-6 md:w-8 md:h-8 -rotate-45" style={{ right: '0.5rem', bottom: '0.5rem' }} />
  </>
)

type ViewState = 'tickets' | 'accommodation' | 'activities'

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [viewState, setViewState] = useState<ViewState>('tickets')
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

  const activityImages = [
    { src: '/activity-1.jpg', day: 'Friday: La Playita Restaurant for Valentines Dinner'},
    { src: '/activity-2.jpg', day: 'Saturday: Private boat/sunset tour of the lake 4pm-7pm with Tours Galvan Bacalar'},
    { src: '/activity-3.jpg', day: 'Sunday: Relax/TBD!!!!'},
  ]

  const getCurrentImages = () => {
    switch (viewState) {
      case 'tickets':
        return ticketImages
      case 'accommodation':
        return accommodationImages
      case 'activities':
        return activityImages.map(item => item.src)
    }
  }

  const currentImages = getCurrentImages()

  const nextImage = () => {
    setImageError(false)
    setCurrentIndex((prev) => (prev + 1) % currentImages.length)
  }
  
  const prevImage = () => {
    setImageError(false)
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  const getTitle = () => {
    switch (viewState) {
      case 'tickets':
        return "🛬Nosotros vamos a Bacalar🍹"
      case 'accommodation':
        return "Where are we staying?!"
      case 'activities':
        return "What Are We Doing?"
    }
  }

  const getDescription = () => {
    switch (viewState) {
      case 'tickets':
        return "💕2/14 -> 2/17💕"
      case 'accommodation':
        return "Maravilla Bacalar: A boutique hotel with a private palapa and dock"
      case 'activities':
        return activityImages[currentIndex].day
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xl md:text-2xl p-6 md:p-8 bg-green-600 hover:bg-green-500 
          text-white rounded-full shadow-lg transform transition-all duration-500 
          hover:scale-110 border-4 border-red-500 hover:border-red-400
          animate-bounce relative z-10 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]
          active:scale-95 touch-manipulation"
      >
        <span className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">🎁</span>
          <span className="font-semibold">Open Gift</span>
          <span className="text-2xl md:text-3xl">🎁</span>
        </span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-green-800/95 backdrop-blur-sm rounded-lg w-full max-w-3xl p-4 md:p-6 relative overflow-hidden"
      >
        <CornerSnowflakes />
        
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-white drop-shadow-lg">
            {getTitle()}
          </h2>
          
          <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-xl" style={{ paddingTop: '65%' }}>
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={currentImages[currentIndex]}
                  alt={`${viewState} ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              </MotionDiv>
            </AnimatePresence>
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm md:text-base p-2 text-center">
                Unable to load image: {currentImages[currentIndex]}
              </div>
            )}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="p-2 md:p-3 bg-red-600 hover:bg-red-500 text-white rounded-r-full shadow-lg 
                  transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400
                  active:scale-95 touch-manipulation"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="p-2 md:p-3 bg-red-600 hover:bg-red-500 text-white rounded-l-full shadow-lg 
                  transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400
                  active:scale-95 touch-manipulation"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4">
            <p className="text-center text-base md:text-xl font-medium text-white drop-shadow">
              {getDescription()}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {(['tickets', 'accommodation', 'activities'] as const).map((view) => (
              <button
                key={view}
                onClick={() => {
                  setViewState(view)
                  setCurrentIndex(0)
                  setImageError(false)
                }}
                className={`px-4 md:px-6 py-2 md:py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg 
                  transform transition-transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400
                  active:scale-95 touch-manipulation text-sm md:text-base
                  ${viewState === view ? 'ring-2 ring-white' : ''}`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 md:px-6 py-2 md:py-3 bg-white hover:bg-gray-100 text-green-800 font-semibold rounded-lg
                transform transition-transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400
                active:scale-95 touch-manipulation text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  )
}