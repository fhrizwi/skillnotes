
import React, { useState, useEffect } from 'react'
import { Download, Eye, Calendar, FileText, Image, Archive, Star, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyPurchases() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPurchases()
  }, [])

  const loadPurchases = () => {
    setLoading(true)
    // Load purchases from localStorage
    const savedPurchases = localStorage.getItem('skillnotes-purchases')
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases))
    }
    setLoading(false)
  }

  const handleDownload = (product) => {
    // Mock download functionality
    alert(`Downloading ${product.title}...`)
  }

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return <FileText className='w-5 h-5 text-gray-600 dark:text-gray-400' />
      case 'psd':
        return <Image className='w-5 h-5 text-gray-600 dark:text-gray-400' />
      case 'zip':
        return <Archive className='w-5 h-5 text-gray-600 dark:text-gray-400' />
      default:
        return <FileText className='w-5 h-5 text-gray-600 dark:text-gray-400' />
    }
  }

  const categories = [...new Set(purchases.map(p => p.category))]

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden'>
      {/* Background blur elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000'></div>
        <div className='absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-2000'></div>
      </div>
      
      <div className='max-w-7xl mx-auto px-4 py-8 relative z-10'>
        {/* Header */}
        <div className='mb-8'>
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>

        {/* Purchases List */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto'></div>
            <p className='mt-4 text-gray-600 dark:text-gray-400'>Loading your purchases...</p>
          </div>
        ) : purchases.length === 0 ? (
          <div className='text-center py-16 relative'>
            <div className='absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl'></div>
            <div className='relative z-10'>
              <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No purchases yet
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-8">
              Start exploring our digital store to find amazing notes!
            </p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Store
            </Link>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            {purchases.map((purchase, index) => (
              <div key={purchase.id || index} className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300'>
                <div className='flex gap-4'>
                  {/* Product Image */}
                  <div className='w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden'>
                    <img 
                      src={purchase.banner} 
                      alt={purchase.title}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Product Details */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between mb-2'>
                      <h3 className='text-lg font-semibold text-black dark:text-white truncate'>
                        {purchase.title}
                      </h3>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded text-sm'>
                          <Star className='w-4 h-4 fill-current' />
                          <span>{purchase.rating || '4.5'}</span>
                        </div>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                          ₹{purchase.price}
                        </span>
                      </div>
                    </div>

                    <p className='text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                      {purchase.description}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>Purchased {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        {getFileIcon(purchase.fileType)}
                        <span>{purchase.fileType?.toUpperCase() || 'PDF'}</span>
                      </div>
                      <span className='bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded text-xs font-medium'>
                        {purchase.category}
                      </span>
                    </div>

                    <div className='flex gap-2'>
                      <button className='bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2'>
                        <Eye className='w-4 h-4' />
                        Preview
                      </button>
                      <button 
                        onClick={() => handleDownload(purchase)}
                        className='bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2'
                      >
                        <Download className='w-4 h-4' />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {purchases.length > 0 && (
          <div className='mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6'>
            <h3 className='text-lg font-semibold text-black dark:text-white mb-4'>Purchase Summary</h3>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-black dark:text-white'>
                  {purchases.length}
                </div>
                <div className='text-gray-600 dark:text-gray-400'>Total Purchases</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-black dark:text-white'>
                  ₹{purchases.reduce((sum, p) => sum + p.price, 0)}
                </div>
                <div className='text-gray-600 dark:text-gray-400'>Total Spent</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-black dark:text-white'>
                  {categories.length}
                </div>
                <div className='text-gray-600 dark:text-gray-400'>Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
