import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Grid, List, ShoppingCart, Star, Download, Eye, Tag, Calendar } from 'lucide-react'
import { productService } from '../services/productService'

export default function Store() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [filters])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts(filters)
      setProducts(response.data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await productService.getCategories()
      setCategories(response.data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await productService.searchProducts(searchQuery)
      setProducts(response.data)
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const ProductCard = ({ product }) => (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
      <div className='relative'>
        <img 
          src={product.image} 
          alt={product.title}
          className='w-full h-48 object-cover'
        />
        <div className='absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium'>
          {product.category}
        </div>
        <div className='absolute top-2 left-2 flex items-center gap-1 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs'>
          <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
          <span>{product.rating}</span>
        </div>
      </div>
      
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
          {product.title}
        </h3>
        
        <p className='text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2'>
          {product.description}
        </p>
        
        <div className='flex flex-wrap gap-1 mb-3'>
          {product.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs'
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4'>
          <div className='flex items-center gap-1'>
            <Download className='w-4 h-4' />
            <span>{product.downloadCount} downloads</span>
          </div>
          <div className='flex items-center gap-1'>
            <Calendar className='w-4 h-4' />
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {formatPrice(product.price)}
          </div>
          <button 
            onClick={() => navigate(`/store/product/${product.id}`)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2'
          >
            <ShoppingCart className='w-4 h-4' />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )

  const ProductListItem = ({ product }) => (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex gap-4'>
        <img 
          src={product.image} 
          alt={product.title}
          className='w-32 h-24 object-cover rounded-lg flex-shrink-0'
        />
        
        <div className='flex-1'>
          <div className='flex items-start justify-between mb-2'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              {product.title}
            </h3>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs'>
                <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
                <span>{product.rating}</span>
              </div>
              <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium'>
                {product.category}
              </span>
            </div>
          </div>
          
          <p className='text-gray-600 dark:text-gray-300 mb-3'>
            {product.description}
          </p>
          
          <div className='flex flex-wrap gap-1 mb-3'>
            {product.tags.map((tag, index) => (
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
                <Download className='w-4 h-4' />
                <span>{product.downloadCount} downloads</span>
              </div>
              <div className='flex items-center gap-1'>
                <Calendar className='w-4 h-4' />
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <span>{product.fileSize}</span>
            </div>
            
            <div className='flex items-center gap-4'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {formatPrice(product.price)}
              </div>
            <button 
              onClick={() => navigate(`/store/product/${product.id}`)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2'
            >
              <ShoppingCart className='w-4 h-4' />
              Buy Now
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Digital Store</h1>
          <p className='text-gray-600 dark:text-gray-300'>Discover and purchase digital products</p>
        </div>

        {/* Search and Filters */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
          <form onSubmit={handleSearch} className='mb-6'>
            <div className='flex gap-4'>
              <div className='flex-1 relative'>
                <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                Search
              </button>
            </div>
          </form>

          <div className='grid md:grid-cols-4 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              >
                <option value=''>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Min Price
              </label>
              <input
                type='number'
                placeholder='Min Price'
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Max Price
              </label>
              <input
                type='number'
                placeholder='Max Price'
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
            </div>

            <div className='flex items-end'>
              <button
                onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '' })}
                className='w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle and Results */}
        <div className='flex justify-between items-center mb-6'>
          <div className='text-gray-600 dark:text-gray-300'>
            {loading ? 'Loading...' : `${products.length} products found`}
          </div>
          
          <div className='flex gap-2'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              <Grid className='w-5 h-5' />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              <List className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600 dark:text-gray-300'>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-12'>
            <Search className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No products found</h3>
            <p className='text-gray-600 dark:text-gray-300'>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {products.map(product => (
              viewMode === 'grid' ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <ProductListItem key={product.id} product={product} />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
