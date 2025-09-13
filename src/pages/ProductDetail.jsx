import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Download, ShoppingCart, ArrowLeft, Tag, Calendar, FileText, Image, Archive, Share2, Heart } from 'lucide-react'
import { productService } from '../services/productService'
import { paymentService } from '../services/paymentService'
import { authService } from '../services/authService'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchased, setPurchased] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  useEffect(() => {
    loadProduct()
    checkPurchaseStatus()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await productService.getProduct(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkPurchaseStatus = async () => {
    try {
      const user = authService.getCurrentUser()
      if (!user) return

      const response = await productService.getUserPurchases(user.id)
      const userPurchases = response.data
      const isPurchased = userPurchases.some(purchase => purchase.productId === parseInt(id))
      setPurchased(isPurchased)
    } catch (error) {
      console.error('Error checking purchase status:', error)
    }
  }

  const handlePurchase = async () => {
    const user = authService.getCurrentUser()
    if (!user) {
      alert('Please login to purchase')
      navigate('/login')
      return
    }

    try {
      setShowPaymentModal(true)
    } catch (error) {
      console.error('Error initiating purchase:', error)
    }
  }

  const handlePayment = async () => {
    try {
      const user = authService.getCurrentUser()
      
      // Initialize payment
      const paymentResponse = await paymentService.initializePayment(
        product.id, 
        product.price, 
        product.currency, 
        paymentMethod
      )

      // Mock payment verification (in real app, integrate with payment gateway)
      setTimeout(async () => {
        try {
          const verifyResponse = await paymentService.verifyPayment(
            paymentResponse.data.paymentId, 
            { paymentMethod }
          )

          if (verifyResponse.success) {
            // Complete purchase
            const purchaseResponse = await productService.purchaseProduct(product.id, user.id)
            
            setPurchased(true)
            setShowPaymentModal(false)
            alert('Purchase successful! You can now download the product.')
          }
        } catch (error) {
          console.error('Payment verification failed:', error)
          alert('Payment failed. Please try again.')
        }
      }, 2000)

    } catch (error) {
      console.error('Error processing payment:', error)
      alert('Error processing payment. Please try again.')
    }
  }

  const handleDownload = async () => {
    try {
      const user = authService.getCurrentUser()
      const response = await productService.downloadProduct(product.id, user.id)
      
      // Mock download
      const link = document.createElement('a')
      link.href = response.data.downloadUrl
      link.download = response.data.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      alert(`Downloading ${response.data.fileName}...`)
    } catch (error) {
      console.error('Error downloading:', error)
      alert('Error downloading file')
    }
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

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300'>Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>Product not found</h2>
          <button 
            onClick={() => navigate('/store')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200'
          >
            Back to Store
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200'
        >
          <ArrowLeft className='w-5 h-5' />
          Back
        </button>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Product Image */}
          <div className='space-y-4'>
            <div className='aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
              <img 
                src={product.image} 
                alt={product.title}
                className='w-full h-full object-cover'
              />
            </div>
            
            {/* File Info */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4'>
              <div className='flex items-center gap-3 mb-3'>
                {getFileIcon(product.fileType)}
                <div>
                  <h3 className='font-semibold text-gray-900 dark:text-white'>File Information</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>{product.fileType.toUpperCase()} File</p>
                </div>
              </div>
              <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                <div className='flex justify-between'>
                  <span>File Size:</span>
                  <span className='font-medium'>{product.fileSize}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Downloads:</span>
                  <span className='font-medium'>{product.downloadCount}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Category:</span>
                  <span className='font-medium'>{product.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-start justify-between mb-4'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {product.title}
                </h1>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full'>
                    <Star className='w-4 h-4 fill-current' />
                    <span className='font-medium'>{product.rating}</span>
                  </div>
                  <button className='p-2 text-gray-400 hover:text-red-500 transition-colors duration-200'>
                    <Heart className='w-5 h-5' />
                  </button>
                  <button className='p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200'>
                    <Share2 className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4'>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Download className='w-4 h-4' />
                  <span>{product.downloadCount} downloads</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 mb-6'>
                {product.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1'
                  >
                    <Tag className='w-3 h-3' />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>Description</h3>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                {product.description}
              </p>
            </div>

            {/* Price and Actions */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {formatPrice(product.price)}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-300'>
                    One-time purchase • Lifetime access
                  </div>
                </div>
              </div>

              {purchased ? (
                <div className='space-y-4'>
                  <div className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center font-medium'>
                    ✓ You own this product
                  </div>
                  <button 
                    onClick={handleDownload}
                    className='w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                  >
                    <Download className='w-5 h-5' />
                    Download Now
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handlePurchase}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <ShoppingCart className='w-5 h-5' />
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Complete Purchase
              </h3>
              
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-gray-600 dark:text-gray-300'>Product:</span>
                  <span className='font-medium text-gray-900 dark:text-white'>{product.title}</span>
                </div>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-gray-600 dark:text-gray-300'>Price:</span>
                  <span className='font-medium text-gray-900 dark:text-white'>{formatPrice(product.price)}</span>
                </div>
                <div className='flex items-center justify-between border-t pt-2'>
                  <span className='font-semibold text-gray-900 dark:text-white'>Total:</span>
                  <span className='font-bold text-xl text-gray-900 dark:text-white'>{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                >
                  <option value='razorpay'>Razorpay (UPI, Cards, Net Banking)</option>
                  <option value='stripe'>Stripe (International)</option>
                  <option value='upi'>UPI</option>
                  <option value='card'>Credit/Debit Card</option>
                </select>
              </div>

              <div className='flex gap-3'>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className='flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200'
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200'
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
