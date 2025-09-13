import React, { useState } from 'react'
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response.success) {
        // Dispatch custom event to notify header of login
        window.dispatchEvent(new CustomEvent('userLogin'));
        // Redirect without alert
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center p-4'>
      <div className='bg-gray-50 dark:bg-dark-gray rounded-lg p-8 w-full max-w-md border border-gray-200 dark:border-gray-700'>
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
            <LogIn className='w-8 h-8 text-white dark:text-black' />
          </div>
          <h1 className='text-2xl font-bold text-black dark:text-white mb-2'>Welcome Back</h1>
          <p className='text-gray-600 dark:text-light-gray'>Sign in to your SkillNotes account</p>
        </div>

        {/* Demo Credentials Info */}
        <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
          <h3 className='text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2'>Demo Credentials:</h3>
          <p className='text-sm text-blue-700 dark:text-blue-300 mb-3'>
            <strong>Email:</strong> mrsonukr@gmail.com<br/>
            <strong>Password:</strong> 123456
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'mrsonukr@gmail.com',
                password: '123456'
              });
            }}
            className='text-xs bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors'
            disabled={loading}
          >
            Fill Demo Credentials
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
            <p className='text-sm text-red-700 dark:text-red-300'>{error}</p>
          </div>
        )}

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-black dark:text-white mb-2'>Email</label>
            <div className='relative'>
              <Mail className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-light-gray' />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className='w-full bg-white dark:bg-black border border-gray-300 dark:border-light-gray rounded-lg pl-10 pr-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-light-gray focus:outline-none focus:border-black dark:focus:border-white'
                placeholder='Enter your email'
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-black dark:text-white mb-2'>Password</label>
            <div className='relative'>
              <Lock className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-light-gray' />
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className='w-full bg-white dark:bg-black border border-gray-300 dark:border-light-gray rounded-lg pl-10 pr-12 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-light-gray focus:outline-none focus:border-black dark:focus:border-white'
                placeholder='Enter your password'
                required
                disabled={loading}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-light-gray hover:text-black dark:hover:text-white'
                disabled={loading}
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <label className='flex items-center'>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='rounded border-gray-300 dark:border-light-gray bg-white dark:bg-black text-black dark:text-white focus:ring-0' 
                disabled={loading}
              />
              <span className='ml-2 text-sm text-gray-600 dark:text-light-gray'>Remember me</span>
            </label>
            <a href="#" className='text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray'>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className='w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <>
                <Loader2 className='w-5 h-5 animate-spin' />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className='w-5 h-5' />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600 dark:text-light-gray'>
            Don't have an account? 
            <Link to="/signup" className='text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray ml-1 font-medium'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
