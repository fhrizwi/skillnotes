import React from 'react'
import { Info, Users, Target, Award, BookOpen, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
            <Info className='w-10 h-10 text-black' />
          </div>
          <h1 className='text-4xl font-bold text-white mb-4'>About SkillNotes</h1>
          <p className='text-xl text-light-gray max-w-3xl mx-auto'>
            Empowering learners to capture, organize, and retain knowledge through beautiful, 
            intuitive note-taking experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className='bg-dark-gray rounded-lg p-8 mb-16'>
          <h2 className='text-2xl font-bold text-white mb-6'>Our Mission</h2>
          <p className='text-light-gray text-lg leading-relaxed'>
            We believe that effective learning comes from organized thinking. SkillNotes was created 
            to help students, professionals, and lifelong learners capture their insights, organize 
            their knowledge, and build a personal learning system that grows with them.
          </p>
        </div>

        {/* Values Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
              <BookOpen className='w-8 h-8 text-black' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-3'>Knowledge First</h3>
            <p className='text-light-gray'>
              Every feature is designed to enhance your learning experience and help you retain information better.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Users className='w-8 h-8 text-black' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-3'>User-Centric</h3>
            <p className='text-light-gray'>
              Built with real learners in mind, focusing on simplicity and effectiveness over complexity.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Lightbulb className='w-8 h-8 text-black' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-3'>Innovation</h3>
            <p className='text-light-gray'>
              Continuously evolving to incorporate the latest in learning science and user experience design.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className='bg-dark-gray rounded-lg p-8 mb-16'>
          <h2 className='text-2xl font-bold text-white mb-8 text-center'>Our Impact</h2>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-3xl font-bold text-white mb-2'>10K+</div>
              <div className='text-light-gray'>Active Users</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-2'>50K+</div>
              <div className='text-light-gray'>Notes Created</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-2'>95%</div>
              <div className='text-light-gray'>User Satisfaction</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-2'>24/7</div>
              <div className='text-light-gray'>Available</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-white mb-6'>Meet the Team</h2>
          <p className='text-light-gray mb-8 max-w-2xl mx-auto'>
            We're a passionate group of developers, designers, and educators who believe 
            in the power of organized learning.
          </p>
          <div className='bg-dark-gray rounded-lg p-8'>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <Award className='w-6 h-6 text-white' />
              <span className='text-white font-medium'>Built with ❤️ for learners everywhere</span>
            </div>
            <p className='text-light-gray'>
              Our team is constantly working to improve SkillNotes and add new features 
              that help you learn more effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
