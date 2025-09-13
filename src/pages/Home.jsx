import React from 'react'
import { BookOpen, Plus, Search, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 text-white'>
            Welcome to <span className='text-light-gray'>SkillNotes</span>
          </h1>
          <p className='text-xl text-light-gray mb-8 max-w-2xl mx-auto'>
            Organize your learning journey with beautiful, searchable notes. 
            Capture insights, track progress, and never lose important knowledge.
          </p>
          <div className='flex gap-4 justify-center'>
            <button className='bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center gap-2'>
              <Plus className='w-5 h-5' />
              Create Note
            </button>
            <button className='border border-light-gray text-white px-6 py-3 rounded-lg font-medium hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'>
              <Search className='w-5 h-5' />
              Browse Notes
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-dark-gray p-6 rounded-lg'>
            <BookOpen className='w-12 h-12 text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-white'>Organized Learning</h3>
            <p className='text-light-gray'>
              Structure your notes with categories, tags, and search functionality.
            </p>
          </div>
          
          <div className='bg-dark-gray p-6 rounded-lg'>
            <Search className='w-12 h-12 text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-white'>Quick Search</h3>
            <p className='text-light-gray'>
              Find any note instantly with our powerful search capabilities.
            </p>
          </div>
          
          <div className='bg-dark-gray p-6 rounded-lg'>
            <Star className='w-12 h-12 text-white mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-white'>Track Progress</h3>
            <p className='text-light-gray'>
              Monitor your learning journey and celebrate achievements.
            </p>
          </div>
        </div>

        {/* Recent Notes Preview */}
        <div className='bg-dark-gray rounded-lg p-8'>
          <h2 className='text-2xl font-bold mb-6 text-white'>Recent Notes</h2>
          <div className='text-center text-light-gray'>
            <BookOpen className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <p>No notes yet. Start creating your first note!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
