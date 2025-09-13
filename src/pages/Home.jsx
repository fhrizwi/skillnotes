import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Plus, Search, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Hero Section */}
        <div className='flex flex-col lg:flex-row items-center gap-8 mb-12'>
          {/* Left Side - Content */}
          <div className='w-full lg:w-1/2 lg:justify-center text-center lg:text-left'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white'>
              Welcome to <span className='text-gray-600 dark:text-light-gray'>SkillNotes</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6'>
              Premium study notes and PDFs marketplace. Get instant download access to expert-curated educational content.
            </p>
            
            {/* Key Features - Compact */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
              <div className='p-4 rounded-lg text-center'>
                <BookOpen className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Expert Curated</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  High-quality content by experts
                </p>
              </div>
              
              <div className='p-4 rounded-lg text-center'>
                <Search className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Instant Download</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  Secure download after payment
                </p>
              </div>
              
              <div className='p-4 rounded-lg text-center'>
                <Star className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Quality Assured</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  Quality-checked for learning
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className='flex gap-6  flex-wrap mb-6 items-center'>
              <button 
                onClick={() => navigate('/store')}
                className='bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2'
              >
                <Search className='w-4 h-4' />
                Browse Store
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className='border border-gray-400 dark:border-light-gray text-black dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'
              >
                <ArrowRight className='w-4 h-4' />
                Get Started
              </button>
            </div>

            {/* Trust Indicators - Compact */}
            <div className='flex justify-center lg:justify-start items-center gap-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap'>
              <div className='flex items-center gap-1'>
                <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                <span>10,000+ Students</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full'></div>
                <span>Premium Content</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-1.5 h-1.5 bg-purple-500 rounded-full'></div>
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
            <img 
              src="/images/heroimage.png" 
              alt="SkillNotes Hero" 
              className='w-full max-w-lg h-auto'
            />
          </div>
        </div>

      </div>
    </div>
  )
}
