import React from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ rating, maxRating = 5, size = 'w-4 h-4' }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${size} text-yellow-500 fill-current`} />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${size} text-gray-300 fill-current`} />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className={`${size} text-yellow-500 fill-current`} />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${size} text-gray-300 fill-current`} />
      ))}
      
      {/* Rating number */}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{rating}</span>
    </div>
  )
}
