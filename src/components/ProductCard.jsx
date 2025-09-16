import React, { useState } from 'react'
import { ShoppingCart, Download, Star, Check, Trash2 } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, cartItems } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)
  const navigate = useNavigate()
  
  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product.id)
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

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleRemoveFromCart = (e) => {
    e.stopPropagation()
    removeFromCart(product.id)
    setAddedToCart(false)
  }

  const handleBuyNow = (e) => {
    e.stopPropagation()
    navigate(`/store/preview/${id}`)
  }

  const handleCardClick = () => {
    navigate(`/store/preview/${id}`)
  }

  return (
    <div 
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Banner Image */}
      <div 
        className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
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
        
        {/* Ranking Badge */}
        {rank && (
          <div className="absolute top-3 right-3">
            <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
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
           {isInCart ? (
             <button 
               onClick={handleRemoveFromCart}
               className="flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
             >
               <Trash2 className="w-3 h-3" />
               Remove
             </button>
           ) : (
             <button 
               onClick={handleAddToCart}
               className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1 ${
                 addedToCart 
                   ? 'bg-green-600 text-white' 
                   : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
               }`}
             >
               {addedToCart ? (
                 <>
                   <Check className="w-3 h-3" />
                   <span className="hidden sm:inline">Added!</span>
                   <span className="sm:hidden">Added!</span>
                 </>
               ) : (
                 <>
                   <ShoppingCart className="w-3 h-3" />
                   <span className="hidden sm:inline">Add to Cart</span>
                   <span className="sm:hidden">Add</span>
                 </>
               )}
             </button>
           )}
           <button 
             onClick={handleBuyNow}
             className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
           >
             Buy Now
           </button>
         </div>
      </div>
    </div>
  )
}
