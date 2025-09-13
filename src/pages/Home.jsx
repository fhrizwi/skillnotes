import React from 'react'
import { BookOpen, Plus, Search, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 text-black dark:text-white'>
            Welcome to <span className='text-gray-600 dark:text-light-gray'>SkillNotes</span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-light-gray mb-8 max-w-2xl mx-auto'>
            Organize your learning journey with beautiful, searchable notes. 
            Capture insights, track progress, and never lose important knowledge.
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <button className='bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2'>
              <Plus className='w-5 h-5' />
              Create Note
            </button>
            <button className='border border-gray-400 dark:border-light-gray text-black dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'>
              <Search className='w-5 h-5' />
              Browse Notes
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-gray-100 dark:bg-dark-gray p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
            <BookOpen className='w-12 h-12 text-black dark:text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-black dark:text-white'>Organized Learning</h3>
            <p className='text-gray-600 dark:text-light-gray'>
              Structure your notes with categories, tags, and search functionality.
            </p>
          </div>
          
          <div className='bg-gray-100 dark:bg-dark-gray p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
            <Search className='w-12 h-12 text-black dark:text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-black dark:text-white'>Quick Search</h3>
            <p className='text-gray-600 dark:text-light-gray'>
              Find any note instantly with our powerful search capabilities.
            </p>
          </div>
          
          <div className='bg-gray-100 dark:bg-dark-gray p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
            <Star className='w-12 h-12 text-black dark:text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-black dark:text-white'>Track Progress</h3>
            <p className='text-gray-600 dark:text-light-gray'>
              Monitor your learning journey and celebrate achievements.
            </p>
          </div>
        </div>

        {/* Recent Notes Preview */}
        <div className='bg-gray-100 dark:bg-dark-gray rounded-lg p-8 border border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-bold mb-6 text-black dark:text-white'>Recent Notes</h2>
          <div className='text-center text-gray-600 dark:text-light-gray'>
            <BookOpen className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <p>No notes yet. Start creating your first note!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
