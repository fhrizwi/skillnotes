import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Plus, Search, Star, ArrowRight, Download, Users, Crown, Shield } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Hero Section */}
        <div className='flex flex-col lg:flex-row items-center gap-8 mb-12'>
          {/* Left Side - Content */}
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h1 className='text-4xl md:text-5xl text-center font-bold mb-4 text-black dark:text-white'>
              Welcome to <span className='text-gray-600 dark:text-light-gray'>SkillNotes</span>
            </h1>
            <p className='text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-6'>
              Premium study notes and PDFs marketplace. Get instant download access to expert-curated educational content.
            </p>
            
            {/* Key Features - Compact */}
            <div className='flex flex-col md:flex-row items-center gap-4 mb-8'>
              <div className='p-4 rounded-lg text-center flex-1'>
                <BookOpen className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Expert Curated</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  High-quality content by experts
                </p>
              </div>
              
              {/* Vertical Divider */}
              <div className='hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600'></div>
              
              <div className='p-4 rounded-lg text-center flex-1'>
                <Download className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Instant Download</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  Secure download after payment
                </p>
              </div>
              
              {/* Vertical Divider */}
              <div className='hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600'></div>
              
              <div className='p-4 rounded-lg text-center flex-1'>
                <Star className='w-6 h-6 text-gray-600 dark:text-light-gray mx-auto mb-2' />
                <h3 className='text-sm font-semibold mb-1'>Quality Assured</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  Quality-checked for learning
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className='flex jus gap-3 justify-center lg:justify-center flex-wrap mb-6'>
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

            {/* Trust Indicators - Enhanced */}
            <div className='flex justify-center lg:justify-center items-center gap-8 text-sm flex-wrap'>
              <div className='flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700'>
                <Users className='w-4 h-4 text-black dark:text-white' />
                <span className='text-gray-700 dark:text-gray-300 font-medium'>10,000+ Students</span>
              </div>
              <div className='flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700'>
                <Crown className='w-4 h-4 text-black dark:text-white' />
                <span className='text-gray-700 dark:text-gray-300 font-medium'>Premium Content</span>
              </div>
              <div className='flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700'>
                <Shield className='w-4 h-4 text-black dark:text-white' />
                <span className='text-gray-700 dark:text-gray-300 font-medium'>Secure Payments</span>
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
