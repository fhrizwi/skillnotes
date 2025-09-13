import React from 'react'
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

export default function SignUp() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='bg-dark-gray rounded-lg p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
            <UserPlus className='w-8 h-8 text-black' />
          </div>
          <h1 className='text-2xl font-bold text-white mb-2'>Create Account</h1>
          <p className='text-light-gray'>Join SkillNotes and start organizing your learning</p>
        </div>

        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-white mb-2'>Full Name</label>
            <div className='relative'>
              <User className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
              <input 
                type="text" 
                className='w-full bg-black border border-light-gray rounded-lg pl-10 pr-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                placeholder='Enter your full name'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-white mb-2'>Email</label>
            <div className='relative'>
              <Mail className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
              <input 
                type="email" 
                className='w-full bg-black border border-light-gray rounded-lg pl-10 pr-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                placeholder='Enter your email'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-white mb-2'>Password</label>
            <div className='relative'>
              <Lock className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
              <input 
                type="password" 
                className='w-full bg-black border border-light-gray rounded-lg pl-10 pr-12 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                placeholder='Create a password'
              />
              <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-white'>
                <Eye className='w-5 h-5' />
              </button>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-white mb-2'>Confirm Password</label>
            <div className='relative'>
              <Lock className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
              <input 
                type="password" 
                className='w-full bg-black border border-light-gray rounded-lg pl-10 pr-12 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                placeholder='Confirm your password'
              />
              <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-white'>
                <Eye className='w-5 h-5' />
              </button>
            </div>
          </div>

          <div className='flex items-center'>
            <input type="checkbox" className='rounded border-light-gray bg-black text-white focus:ring-0' />
            <span className='ml-2 text-sm text-light-gray'>
              I agree to the <a href="#" className='text-white hover:text-light-gray'>Terms of Service</a> and <a href="#" className='text-white hover:text-light-gray'>Privacy Policy</a>
            </span>
          </div>

          <button 
            type="submit" 
            className='w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center justify-center gap-2'
          >
            <UserPlus className='w-5 h-5' />
            Create Account
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-light-gray'>
            Already have an account? 
            <a href="#" className='text-white hover:text-light-gray ml-1 font-medium'>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}
