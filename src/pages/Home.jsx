import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Search, Star, ArrowRight, Download, Users, Crown, Shield, Code, Database, Globe, Smartphone, Brain, Trophy } from 'lucide-react'
import StarRating from '../components/StarRating'
import Avatar from '../components/Avatar'
import ProductCard from '../components/ProductCard'

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
            <div className='hidden md:flex justify-center lg:justify-center items-center gap-8 text-sm flex-wrap'>
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

            {/* Mobile Running Text */}
            <div className='md:hidden relative overflow-hidden'>
              {/* Left Fade */}
              <div className='absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none'></div>
              {/* Right Fade */}
              <div className='absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none'></div>
              <div className='flex items-center gap-4 text-sm animate-scroll whitespace-nowrap'>
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
                {/* Duplicate for seamless loop */}
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

        {/* Top Sold This Week Section */}
        <div className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-black dark:text-white mb-4'>
              Top Sold This Week
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Most popular study materials that students are buying this week
            </p>
          </div>

          {/* Top Products Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <ProductCard product={{
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
              fileType: "PDF",
              rank: 1
            }} />
            
            <ProductCard product={{
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
              fileType: "ZIP",
              rank: 2
            }} />
            
            <ProductCard product={{
              id: 3,
              title: "DSA Complete Course",
              banner: "/images/heroimage.png",
              price: 399,
              originalPrice: 799,
              downloads: 9876,
              rating: 4.9,
              reviews: 156,
              description: "Data Structures & Algorithms mastery with comprehensive examples and practice problems.",
              category: "Programming",
              fileType: "PDF",
              rank: 3
            }} />
            
            <ProductCard product={{
              id: 4,
              title: "Python for Beginners",
              banner: "/images/heroimage.png",
              price: 249,
              originalPrice: 499,
              downloads: 11234,
              rating: 4.6,
              reviews: 198,
              description: "Learn Python programming from scratch with practical examples and projects.",
              category: "Programming",
              fileType: "ZIP",
              rank: 4
            }} />
          </div>
        </div>

        {/* Team Section */}
        <div className='mb-12'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl md:text-3xl font-bold text-black dark:text-white mb-2'>
              Meet Our Team
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              The talented team behind SkillNotes
            </p>
          </div>

          {/* Mobile - Combined */}
          <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full md:hidden'>
            <div className='flex items-center gap-6'>
              {/* Double Avatar */}
              <div className='flex -space-x-3'>
                <div className='w-16 h-16 rounded-full border-2 border-white dark:border-black z-10 overflow-hidden'>
                  <img 
                    src="/images/heroimage.png" 
                    alt="Sonu Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='w-16 h-16 rounded-full border-2 border-white dark:border-black overflow-hidden'>
                  <img 
                    src="/images/heroimage.png" 
                    alt="Faizul Haque" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Team Details */}
              <div className='flex-1'>
                <h3 className='text-lg font-bold text-black dark:text-white mb-1'>
                  Sonu Kumar & Faizul Haque
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                  Full Stack Developer & Content Creator
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Sonu handles the technical development while Faizul creates all the notes and study materials.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop - Separate */}
          <div className='hidden md:grid md:grid-cols-2 gap-6 w-full'>
            {/* Sonu Kumar */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-6'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 rounded-full border-2 border-white dark:border-black overflow-hidden'>
                  <img 
                    src="/images/heroimage.png" 
                    alt="Sonu Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-black dark:text-white mb-1'>
                    Sonu Kumar
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                    Full Stack Developer
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Handles all technical development and platform architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Faizul Haque */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-6'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 rounded-full border-2 border-white dark:border-black overflow-hidden'>
                  <img 
                    src="/images/heroimage.png" 
                    alt="Faizul Haque" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-black dark:text-white mb-1'>
                    Faizul Haque
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                    Frontend Developer
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Creates all the notes and study materials for students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

{/* Testimonials Section */}
<div className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-black dark:text-white mb-4'>
              What Our Students Say
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Real feedback from students who have transformed their learning with our premium study materials
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Testimonial 1 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={4.2} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The React.js notes were incredibly detailed and helped me ace my semester exams. The examples were practical and easy to understand. Highly recommended!"
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Arjun Sharma" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Arjun Sharma</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Computer Science Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={5.0} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The DSA notes are comprehensive and well-structured. I was able to prepare for my placement interviews effectively. The quality is outstanding!"
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Priya Patel" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Priya Patel</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Engineering Graduate</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={4.1} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The Python notes helped me understand complex concepts easily. The step-by-step explanations made learning enjoyable. Worth every penny!"
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Rahul Kumar" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Rahul Kumar</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Software Developer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={4.3} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The JavaScript notes are perfect for beginners and advanced learners. The practical examples really helped me in my web development projects."
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Sneha Gupta" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Sneha Gupta</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Frontend Developer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={4.0} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The DBMS notes are incredibly detailed and helped me understand database concepts clearly. The diagrams and examples are excellent!"
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Vikram Singh" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Vikram Singh</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Database Administrator</p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
              <div className='mb-4'>
                <StarRating rating={4.4} />
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
                "The Node.js notes are comprehensive and practical. I was able to build a full-stack application after studying these materials. Highly recommended!"
              </p>
              <div className='flex items-center gap-3'>
                <Avatar name="Meera Joshi" />
                <div>
                  <h4 className='font-semibold text-black dark:text-white'>Meera Joshi</h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
