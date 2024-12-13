'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAccommodation, setShowAccommodation] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

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
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl p-8 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 border-4 border-yellow-400 animate-bounce"
        >
          🎁 Open Your Gift
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-4xl w-full">
        <div className="p-6 pb-0">
          <h2 className="text-3xl font-bold text-center">
            {showAccommodation ? "Where are we staying?" : "Where are we going?!"}
          </h2>
        </div>
        
        <div className="space-y-6 p-6">
          <div className="relative w-full bg-black/10 rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
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
                className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          <p className="text-center text-xl font-medium text-gray-800">
            {showAccommodation ? "Maravilla Bacalar. A super cute botique hotel with a Private Palapa and dock :)" : "BACALAR 2/14 -> 2/17!"}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setShowAccommodation(!showAccommodation)
                setCurrentIndex(0)
                setImageError(false)
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              {showAccommodation ? "Back to Tickets" : "Where We're Staying"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}