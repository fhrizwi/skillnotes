import React from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'

export default function ContactUs() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
            <MessageCircle className='w-10 h-10 text-black' />
          </div>
          <h1 className='text-4xl font-bold text-white mb-4'>Get in Touch</h1>
          <p className='text-xl text-light-gray max-w-3xl mx-auto'>
            Have questions, feedback, or need help? We'd love to hear from you. 
            Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-dark-gray rounded-lg p-8'>
            <h2 className='text-2xl font-bold text-white mb-6'>Send us a Message</h2>
            <form className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>First Name</label>
                  <input 
                    type="text" 
                    className='w-full bg-black border border-light-gray rounded-lg px-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                    placeholder='Enter your first name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>Last Name</label>
                  <input 
                    type="text" 
                    className='w-full bg-black border border-light-gray rounded-lg px-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                    placeholder='Enter your last name'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-white mb-2'>Email</label>
                <input 
                  type="email" 
                  className='w-full bg-black border border-light-gray rounded-lg px-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-white mb-2'>Subject</label>
                <input 
                  type="text" 
                  className='w-full bg-black border border-light-gray rounded-lg px-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                  placeholder='What is this about?'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-white mb-2'>Message</label>
                <textarea 
                  rows={6}
                  className='w-full bg-black border border-light-gray rounded-lg px-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white resize-none'
                  placeholder='Tell us more about your inquiry...'
                ></textarea>
              </div>

              <button 
                type="submit" 
                className='w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center justify-center gap-2'
              >
                <Send className='w-5 h-5' />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            <div className='bg-dark-gray rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>Contact Information</h2>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-1'>Email</h3>
                    <p className='text-light-gray'>support@skillnotes.com</p>
                    <p className='text-light-gray text-sm'>We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-1'>Phone</h3>
                    <p className='text-light-gray'>+1 (555) 123-4567</p>
                    <p className='text-light-gray text-sm'>Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-1'>Office</h3>
                    <p className='text-light-gray'>123 Learning Street</p>
                    <p className='text-light-gray'>Education City, EC 12345</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-1'>Business Hours</h3>
                    <p className='text-light-gray'>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className='text-light-gray'>Saturday: 10:00 AM - 4:00 PM</p>
                    <p className='text-light-gray'>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-dark-gray rounded-lg p-8'>
              <h3 className='text-xl font-bold text-white mb-4'>Frequently Asked Questions</h3>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-white font-medium mb-1'>How do I get started?</h4>
                  <p className='text-light-gray text-sm'>Simply create an account and start taking notes immediately. No setup required!</p>
                </div>
                <div>
                  <h4 className='text-white font-medium mb-1'>Is my data secure?</h4>
                  <p className='text-light-gray text-sm'>Yes, we use industry-standard encryption to protect your notes and personal information.</p>
                </div>
                <div>
                  <h4 className='text-white font-medium mb-1'>Can I export my notes?</h4>
                  <p className='text-light-gray text-sm'>Absolutely! You can export your notes in various formats including PDF, Markdown, and plain text.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
