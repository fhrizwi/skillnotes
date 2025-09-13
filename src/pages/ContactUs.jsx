import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle, User, MessageSquare, HelpCircle, Star, Shield, Download, Zap } from 'lucide-react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create HTML body with form details
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #000000;">
          <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">SkillNotes Contact Form</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">New message received</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff;">
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #000000; padding-bottom: 10px;">Contact Details</h3>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 120px; font-weight: bold; color: #000000;">Name:</span>
                <span style="color: #333333;">${formData.firstName} ${formData.lastName}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 120px; font-weight: bold; color: #000000;">Email:</span>
                <span style="color: #333333;">${formData.email}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 120px; font-weight: bold; color: #000000;">Date:</span>
                <span style="color: #333333;">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
              <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #000000; padding-bottom: 10px;">Message</h3>
              <div style="color: #333333; line-height: 1.6; white-space: pre-wrap;">${formData.message}</div>
            </div>
          </div>
          
          <div style="background-color: #000000; color: #ffffff; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This message was sent from SkillNotes Contact Form</p>
          </div>
        </div>
      `

      // Prepare data for Google Apps Script
      const data = {
        email: "faizulhaque2002@gmail.com",
        subject: "SkillNotes Send You a message!",
        message: htmlBody
      }

      // Send to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbwsl0ieW3FUO8xAtBm02drdhwst7XNwcHCReKq2E2xnrYj_hNTtpdavy38cfYaJ7DiUQQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
    }
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>

        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Contact Form */}
          <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex-1'>
            <h2 className='text-2xl font-bold text-black dark:text-white mb-6'>Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className='mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3'>
                <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                <p className='text-green-800 dark:text-green-200 font-medium'>Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3'>
                <AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                <p className='text-red-800 dark:text-red-200 font-medium'>Failed to send message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-black dark:text-white mb-2'>
                    First Name *
                  </label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className='w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-black focus:border-transparent transition-all duration-200'
                    placeholder='Enter your first name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-black dark:text-white mb-2'>
                    Last Name *
                  </label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className='w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-black focus:border-transparent transition-all duration-200'
                    placeholder='Enter your last name'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-black dark:text-white mb-2'>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-black focus:border-transparent transition-all duration-200'
                  placeholder='Enter your email address'
                />
              </div>



              <div>
                <label className='block text-sm font-medium text-black dark:text-white mb-2'>
                  Message *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-black focus:border-transparent resize-none transition-all duration-200'
                  placeholder='Tell us more about your inquiry...'
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className='w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin'></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='w-5 h-5' />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Features */}
          <div className='flex-1'>
            {/* Contact Information */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl p-8 h-full'>
              <h2 className='text-2xl font-bold text-black dark:text-white mb-6'>Contact Information</h2>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-white dark:text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>Email</h3>
                    <p className='text-gray-600 dark:text-gray-300'>support@skillnotes.com</p>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-6 h-6 text-white dark:text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>Phone</h3>
                    <p className='text-gray-600 dark:text-gray-300'>+91 6206957650</p>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-white dark:text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>Address</h3>
                    <p className='text-gray-600 dark:text-gray-300'>Hostel-16, MMDU</p>
                    <p className='text-gray-600 dark:text-gray-300'>Ambala, Haryana, India</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-6 h-6 text-white dark:text-black' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>Business Hours</h3>
                    <p className='text-gray-600 dark:text-gray-300'>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className='text-gray-600 dark:text-gray-300'>Saturday: 10:00 AM - 4:00 PM</p>
                    <p className='text-gray-600 dark:text-gray-300'>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
