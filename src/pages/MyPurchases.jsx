import React, { useState, useEffect } from 'react'
import { Download, Eye, Calendar, FileText, Image, Archive, Star, Search } from 'lucide-react'
import { productService } from '../services/productService'
import { authService } from '../services/authService'

export default function MyPurchases() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    loadPurchases()
  }, [])

  const loadPurchases = async () => {
    try {
      setLoading(true)
      const user = authService.getCurrentUser()
      if (!user) {
        console.error('User not authenticated')
        return
      }
      
      const response = await productService.getUserPurchases(user.id)
      setPurchases(response.data)
    } catch (error) {
      console.error('Error loading purchases:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (productId) => {
    try {
      const user = authService.getCurrentUser()
      if (!user) {
        alert('Please login to download')
        return
      }
      
      const response = await productService.downloadProduct(productId, user.id)
      
      // Mock download - in real app, this would trigger actual file download
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
        return <FileText className='w-6 h-6 text-red-500' />
      case 'psd':
        return <Image className='w-6 h-6 text-blue-500' />
      case 'zip':
        return <Archive className='w-6 h-6 text-green-500' />
      default:
        return <FileText className='w-6 h-6 text-gray-500' />
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === '' || purchase.product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(purchases.map(p => p.product.category))]

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>My Purchases</h1>
          <p className='text-gray-600 dark:text-gray-300'>Manage and download your purchased digital products</p>
        </div>

        {/* Search and Filter */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='relative'>
              <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search your purchases...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
            </div>
            
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              >
                <option value=''>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Purchases List */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600 dark:text-gray-300'>Loading your purchases...</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FileText className='w-10 h-10 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              {purchases.length === 0 ? 'No purchases yet' : 'No matching purchases'}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              {purchases.length === 0 
                ? 'Start exploring our digital store to find amazing products!'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {purchases.length === 0 && (
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200'>
                Browse Store
              </button>
            )}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredPurchases.map(purchase => (
              <div key={purchase.id} className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
                <div className='flex gap-4'>
                  {/* Product Image */}
                  <div className='relative flex-shrink-0'>
                    <img 
                      src={purchase.product.image} 
                      alt={purchase.product.title}
                      className='w-24 h-24 object-cover rounded-lg'
                    />
                    <div className='absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
                      {purchase.product.category}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-2'>
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                        {purchase.product.title}
                      </h3>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm'>
                          <Star className='w-4 h-4 fill-current' />
                          <span>{purchase.product.rating}</span>
                        </div>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          {formatPrice(purchase.product.price)}
                        </span>
                      </div>
                    </div>

                    <p className='text-gray-600 dark:text-gray-300 mb-3'>
                      {purchase.product.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {purchase.product.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          <span>Purchased {new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          {getFileIcon(purchase.product.fileType)}
                          <span>{purchase.product.fileSize}</span>
                        </div>
                        <span className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium'>
                          {purchase.status}
                        </span>
                      </div>

                      <div className='flex gap-2'>
                        <button className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2'>
                          <Eye className='w-4 h-4' />
                          Preview
                        </button>
                        <button 
                          onClick={() => handleDownload(purchase.product.id)}
                          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2'
                        >
                          <Download className='w-4 h-4' />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {purchases.length > 0 && (
          <div className='mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Purchase Summary</h3>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {purchases.length}
                </div>
                <div className='text-gray-600 dark:text-gray-300'>Total Purchases</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                  {formatPrice(purchases.reduce((sum, p) => sum + p.amount, 0))}
                </div>
                <div className='text-gray-600 dark:text-gray-300'>Total Spent</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                  {categories.length}
                </div>
                <div className='text-gray-600 dark:text-gray-300'>Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
