import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Search } from 'lucide-react'
import { productService } from '../services/productService'

export default function Store() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(true)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load products from service
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts()
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sample product data (fallback)
  const fallbackProducts = [
    {
      id: 1,
      title: "Complete React.js Mastery Guide",
      banner: "/images/heroimage.png",
      price: 299,
      originalPrice: 599,
      downloads: 15420,
      rating: 4.8,
      reviews: 324,
      description: "Comprehensive guide covering React fundamentals, hooks, state management, and advanced patterns.",
      category: "Web Development",
      fileType: "PDF"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Complete Reference",
      banner: "/images/heroimage.png",
      price: 199,
      originalPrice: 399,
      downloads: 12850,
      rating: 4.7,
      reviews: 287,
      description: "Master modern JavaScript with ES6+ features, async programming, and best practices.",
      category: "Programming",
      fileType: "ZIP"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      banner: "/images/heroimage.png",
      price: 399,
      originalPrice: 799,
      downloads: 9876,
      rating: 4.9,
      reviews: 156,
      description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
      category: "Backend",
      fileType: "PDF"
    },
    {
      id: 4,
      title: "Python Data Science Handbook",
      banner: "/images/heroimage.png",
      price: 349,
      originalPrice: 699,
      downloads: 11234,
      rating: 4.6,
      reviews: 198,
      description: "Complete guide to data science with Python, pandas, numpy, and machine learning.",
      category: "Data Science",
      fileType: "ZIP"
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      banner: "/images/heroimage.png",
      price: 249,
      originalPrice: 499,
      downloads: 8765,
      rating: 4.5,
      reviews: 142,
      description: "Learn design thinking, user research, wireframing, and prototyping techniques.",
      category: "Design",
      fileType: "PSD"
    },
    {
      id: 6,
      title: "AWS Cloud Architecture",
      banner: "/images/heroimage.png",
      price: 449,
      originalPrice: 899,
      downloads: 6543,
      rating: 4.8,
      reviews: 89,
      description: "Master cloud computing with AWS services, deployment strategies, and best practices.",
      category: "Cloud Computing",
      fileType: "PDF"
    }
  ]

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))]

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300'>Loading products...</p>
        </div>
      </div>
    )
  }

  // Handle scroll to show/hide fade effects
  const handleScroll = (e) => {
    const container = e.target
    const scrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth

    setShowLeftFade(scrollLeft > 0)
    setShowRightFade(scrollLeft < scrollWidth - clientWidth)
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        {/* Search and Filters */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
          {/* Search Bar - Left */}
          <div className='w-full sm:w-96 sm:flex-shrink-0'>
            <div className='flex items-center gap-2 bg-gray-100 dark:bg-dark-gray rounded-lg px-3 py-2'>
              <Search className='w-4 h-4 text-gray-500 dark:text-light-gray' />
              <input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-light-gray focus:outline-none flex-1'
              />
            </div>
          </div>

          {/* Category Filters - Right */}
          <div className='w-full sm:w-1/2 relative'>
            {/* Left Fade - Only show when scrolled right */}
            {showLeftFade && (
              <div className='absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none'></div>
            )}
            {/* Right Fade - Only show when there's more content to scroll */}
            {showRightFade && (
              <div className='absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none'></div>
            )}
            {/* Scrollable Container */}
            <div className='overflow-x-auto scrollbar-hide pb-2 sm:pb-0' onScroll={handleScroll}>
              <div className='flex items-center gap-2 min-w-max'>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${selectedCategory === category
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}
