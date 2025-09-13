import React from 'react'
import { ShoppingCart, Download, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const {
    id,
    title,
    banner,
    price,
    originalPrice,
    downloads,
    rating,
    reviews,
    description,
    category,
    fileType,
    rank
  } = product

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 group">
      {/* Banner Image */}
      <div className="relative h-32 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={banner} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
        
        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-3 right-3">
            <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-full text-xs font-bold">
              #{rank}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-black dark:text-white mb-1 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="px-2 py-px rounded-full font-medium text-white bg-black dark:bg-white dark:text-black" style={{ fontSize: '10px' }}>
            {fileType}
          </div>
        </div>

         {/* Price */}
         <div className="flex items-center justify-between mb-3">
           <div className="flex items-center gap-2">
             <span className="text-lg font-bold text-black dark:text-white">
               ₹{price}
             </span>
             {originalPrice && (
               <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                 ₹{originalPrice}
               </span>
             )}
           </div>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 text-yellow-500 fill-current" />
             <span className="text-xs font-medium text-black dark:text-white">{rating}</span>
           </div>
         </div>

         {/* Action Buttons */}
         <div className="flex gap-1">
           <button className="flex-1 bg-black dark:bg-white text-white dark:text-black px-2 py-1.5 rounded text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-1">
             <ShoppingCart className="w-3 h-3" />
             Add to Cart
           </button>
           <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
             Preview
           </button>
         </div>
      </div>
    </div>
  )
}
