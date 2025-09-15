import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Download, ShoppingCart, ArrowLeft, Tag, Calendar, FileText, Image, Archive, Share2, Heart, Check, Eye, X, FastForward, Maximize2, X as CloseIcon, ChevronUp, ChevronDown } from 'lucide-react'
import { productService } from '../services/productService'
import { useCart } from '../contexts/CartContext'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as Toast from '@radix-ui/react-toast'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function ProductPreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, removeFromCart, cartItems } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product?.id)

  useEffect(() => {
    loadProduct()
  }, [id])

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        setShowImageModal(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await productService.getProduct(id)
      if (response.success) {
        setProduct(response.data)
      } else {
        console.error('Product not found')
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setToastMessage('Added to cart!')
    setShowToast(true)
    setTimeout(() => setAddedToCart(false), 2000)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id)
    setToastMessage('Removed from cart!')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className='w-8 h-8 text-red-500' />
      case 'psd':
        return <Image className='w-8 h-8 text-blue-500' />
      case 'zip':
        return <Archive className='w-8 h-8 text-green-500' />
      default:
        return <FileText className='w-8 h-8 text-gray-500' />
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const toggleImageModal = async () => {
    if (!showImageModal) {
      // Enter fullscreen
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen()
        } else if (document.documentElement.msRequestFullscreen) {
          await document.documentElement.msRequestFullscreen()
        }
        setShowImageModal(true)
      } catch (error) {
        console.error('Error entering fullscreen:', error)
        setShowImageModal(true)
      }
    } else {
      // Exit fullscreen
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen()
        }
        setShowImageModal(false)
      } catch (error) {
        console.error('Error exiting fullscreen:', error)
        setShowImageModal(false)
      }
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300'>Loading preview...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-black dark:text-white mb-4'>Product not found</h2>
          <button 
            onClick={() => navigate('/store')}
            className='bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200'
          >
            Back to Store
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      {/* Custom Swiper Styles */}
      <style jsx>{`
        .main-swiper {
          height: 100%;
        }
        .main-swiper .swiper-slide {
          height: 100%;
        }
        .main-swiper .swiper-pagination {
          right: 20px !important;
          left: auto !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: auto !important;
          height: auto !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .main-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(0, 0, 0, 0.3) !important;
          opacity: 1 !important;
          margin: 0 !important;
        }
        .main-swiper .swiper-pagination-bullet-active {
          background: #000 !important;
        }
        .dark .main-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
        }
        .dark .main-swiper .swiper-pagination-bullet-active {
          background: #fff !important;
        }
        .fullscreen-swiper {
          height: 100%;
        }
        .fullscreen-swiper .swiper-slide {
          height: 100%;
        }
        .fullscreen-swiper .swiper-button-next-custom,
        .fullscreen-swiper .swiper-button-prev-custom {
          position: absolute;
          z-index: 10;
        }
      `}</style>
      
      {/* Toast Provider */}
      <Toast.Provider>
        <div className='max-w-7xl mx-auto px-4 py-8'>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Product Image */}
          <div className='space-y-4'>
            {/* Main Swiper */}
            <div className='aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative'>
              {/* Fullscreen Button */}
              <button
                onClick={toggleImageModal}
                className='absolute top-4 right-4 z-20 bg-black/50 dark:bg-white/50 text-white dark:text-black p-2 rounded-full hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-200 backdrop-blur-sm'
                title="View Images in Fullscreen"
              >
                <Maximize2 className='w-5 h-5' />
              </button>
               <Swiper
                 style={{
                   '--swiper-pagination-color': '#000',
                 }}
                 spaceBetween={10}
                 pagination={{
                   clickable: true,
                 }}
                 autoplay={{
                   delay: 3000,
                   disableOnInteraction: false,
                 }}
                 modules={[Pagination, Autoplay]}
                 className="main-swiper"
                 direction="vertical"
                 loop={true}
               >
                {product.images && product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className='w-full h-full flex items-center justify-center relative'>
                      {/* Blurred Background */}
                      <div 
                        className='absolute inset-0 bg-cover bg-center filter blur-lg scale-110 opacity-30'
                        style={{
                          backgroundImage: `url("${image}")`
                        }}
                      ></div>
                      {/* Main Image */}
                      <img 
                        src={image} 
                        alt={`${product.title} - Preview ${index + 1}`}
                        className='max-w-full max-h-full object-contain relative z-10'
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-start justify-between mb-4'>
                <h1 className='text-3xl font-bold text-black dark:text-white'>
                  {product.title}
                </h1>
                <div className='flex items-center gap-2'>
                  {product.rating && (
                    <div className='flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full'>
                      <Star className='w-4 h-4 fill-current' />
                      <span className='font-medium'>{product.rating}</span>
                    </div>
                  )}
                  <button className='p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200'>
                    <Share2 className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4'>
                <div className='flex items-center gap-1'>
                  <Download className='w-4 h-4' />
                  <span>{product.downloads?.toLocaleString() || '1,234'} downloads</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>Updated {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className='mb-6'>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {showFullDescription ? product.description : (product.description.length > 150 ? product.description.substring(0, 150) + '...' : product.description)}
                </p>
                {product.description && product.description.length > 150 && (
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium mt-2 transition-colors duration-200 inline-block'
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                )}
                <div className='mt-4'>
                  <strong className='text-black dark:text-white'>Important Details:</strong><br />
                  <span className='text-gray-600 dark:text-gray-300 text-sm'>
                    • Non-refundable purchase<br />
                    • Instant download after purchase<br />
                    • Created by: SkillNotes Team<br />
                    • Lifetime access included
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-2'>
                  <span className='text-2xl font-bold text-black dark:text-white'>
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className='text-lg text-gray-500 dark:text-gray-400 line-through'>
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-bold relative overflow-hidden'>
                      <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'></span>
                      <span className='relative z-10'>
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                    You save ₹{product.originalPrice - product.price}
                  </div>
                )}
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  Instant Download • Lifetime Access • No Hidden Charges
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                {isInCart ? (
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button 
                          onClick={handleRemoveFromCart}
                          className='flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2'
                        >
                          <FastForward className='w-5 h-5' />
                          Remove from Cart
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content 
                          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-gray-700 dark:border-gray-300"
                          sideOffset={5}
                        >
                          Remove this item from your cart
                          <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-100" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                ) : (
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                      addedToCart 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                          {addedToCart ? (
                            <>
                              <Check className='w-5 h-5' />
                              Added!
                            </>
                          ) : (
                            <>
                              <ShoppingCart className='w-5 h-5' />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content 
                          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-gray-700 dark:border-gray-300"
                          sideOffset={5}
                        >
                          {addedToCart ? 'Added to cart!' : 'Add this item to your cart'}
                          <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-100" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                )}
                
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                <button 
                  onClick={() => window.open(`/store/preview/${id}`, '_blank')}
                  className='flex-1 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <FastForward className='w-5 h-5' />
                  Buy Now
                </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content 
                        className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-gray-700 dark:border-gray-300"
                        sideOffset={5}
                      >
                        Go to payment page
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-100" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>


            </div>
          </div>
        </div>
        
        {/* Toast */}
        <Toast.Root 
          open={showToast} 
          onOpenChange={setShowToast}
          className="fixed top-4 right-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 border border-gray-700 dark:border-gray-300"
        >
          <Check className="w-4 h-4" />
          <Toast.Title className="font-medium">{toastMessage}</Toast.Title>
          <Toast.Close asChild>
            <button className="ml-2 text-gray-400 hover:text-white dark:hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </Toast.Close>
        </Toast.Root>
        
        <Toast.Viewport className="fixed top-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      </div>
      </Toast.Provider>

      {/* Fullscreen Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 dark:bg-black/95 z-50">
           {/* Close Button */}
           <button
             onClick={toggleImageModal}
             className="fixed top-4 right-4 z-[100] bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
             title="Close Fullscreen"
           >
             <CloseIcon className="w-6 h-6" />
           </button>

          {/* Fullscreen Swiper */}
          <div className="w-screen h-screen">
             <Swiper
               style={{
                 '--swiper-navigation-color': '#fff',
               }}
               spaceBetween={10}
               navigation={{
                 nextEl: '.swiper-button-next-custom',
                 prevEl: '.swiper-button-prev-custom',
               }}
               onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
               modules={[Navigation]}
               className="fullscreen-swiper"
               direction="vertical"
               loop={false}
             >
              {product.images && product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='w-full h-full flex items-center justify-center relative'>
                    <img 
                      src={image} 
                      alt={`${product.title} - Preview ${index + 1}`}
                      className='max-w-full max-h-full object-contain'
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
             {/* Custom Navigation Buttons */}
             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-2">
               {/* Up Button - Only show if not on first slide */}
               {currentSlide > 0 && (
                 <button className="swiper-button-prev-custom bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
                   <ChevronUp className="w-6 h-6" />
                 </button>
               )}
               {/* Down Button - Only show if not on last slide */}
               {currentSlide < (product.images ? product.images.length - 1 : 3) && (
                 <button className="swiper-button-next-custom bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
                   <ChevronDown className="w-6 h-6" />
                 </button>
               )}
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
