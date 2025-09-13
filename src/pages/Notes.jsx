import React from 'react'
import { Plus, Search, Filter, Grid, List, FileText, Calendar, Tag } from 'lucide-react'

export default function Notes() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>My Notes</h1>
            <p className='text-light-gray'>Organize and manage your learning notes</p>
          </div>
          <button className='bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center gap-2'>
            <Plus className='w-4 h-4' />
            New Note
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className='bg-dark-gray rounded-lg p-4 mb-8'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
              <input 
                type="text" 
                placeholder='Search notes...' 
                className='w-full bg-black border border-light-gray rounded-lg pl-10 pr-4 py-2 text-white placeholder-light-gray focus:outline-none focus:border-white'
              />
            </div>
            <div className='flex gap-2'>
              <button className='bg-black border border-light-gray text-white px-4 py-2 rounded-lg hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'>
                <Filter className='w-4 h-4' />
                Filter
              </button>
              <button className='bg-black border border-light-gray text-white px-4 py-2 rounded-lg hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'>
                <Grid className='w-4 h-4' />
              </button>
              <button className='bg-black border border-light-gray text-white px-4 py-2 rounded-lg hover:bg-dark-gray transition-colors duration-200 flex items-center gap-2'>
                <List className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Sample Note Card */}
          <div className='bg-dark-gray rounded-lg p-6 hover:bg-opacity-80 transition-colors duration-200 cursor-pointer'>
            <div className='flex items-start justify-between mb-4'>
              <h3 className='text-lg font-semibold text-white'>React Hooks Guide</h3>
              <div className='flex gap-2'>
                <Tag className='w-4 h-4 text-light-gray' />
                <Calendar className='w-4 h-4 text-light-gray' />
              </div>
            </div>
            <p className='text-light-gray text-sm mb-4 line-clamp-3'>
              A comprehensive guide to React hooks including useState, useEffect, and custom hooks...
            </p>
            <div className='flex items-center justify-between text-xs text-light-gray'>
              <span>2 days ago</span>
              <span>React</span>
            </div>
          </div>

          {/* Empty State */}
          <div className='bg-dark-gray rounded-lg p-8 text-center col-span-full md:col-span-2 lg:col-span-3'>
            <FileText className='w-16 h-16 mx-auto mb-4 text-light-gray opacity-50' />
            <h3 className='text-xl font-semibold text-white mb-2'>No notes yet</h3>
            <p className='text-light-gray mb-4'>Start creating your first note to get organized!</p>
            <button className='bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center gap-2 mx-auto'>
              <Plus className='w-4 h-4' />
              Create Your First Note
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
