import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Loader2, Phone, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import AuthSlider from '../AuthSlider';
import ThemeToggle from '../ThemeToggle';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' && value && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address';
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) return 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9';
    if (formData.password.length < 8) return 'Password must be at least 8 characters long';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!agreedToTerms) return 'Please agree to the Terms of Service and Privacy Policy';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validate all fields and collect errors
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length < 10) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      errors.terms = 'Please agree to the Terms of Service and Privacy Policy';
    }

    // If there are validation errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile,
        password: formData.password,
      });

      if (response?.success) {
        // Dispatch custom event to notify header of login
        window.dispatchEvent(new CustomEvent('userLogin'));
        navigate('/', { state: { userLoggedIn: true } });
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during sign-up');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex overflow-hidden">
      {/* Left section - Auth Slider */}
      <AuthSlider />

      {/* Right section - form with scrollbar */}
      <div className="w-full md:w-2/5 h-screen overflow-y-auto bg-white dark:bg-black">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white dark:text-black" />
            </div>
            <span className="text-black dark:text-white font-bold text-lg">SkillNotes</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-start md:items-center justify-center p-6 min-h-full">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Join SkillNotes and start organizing your learning
              </p>
            </div>


            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div>
                <div className="relative">
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                    placeholder="Full Name"
                    required
                    disabled={loading}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                    placeholder="Email Address"
                    required
                    disabled={loading}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <div className="relative">
                  <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                  <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    maxLength="10"
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                    placeholder="Mobile Number"
                    required
                    disabled={loading}
                  />
                </div>
                {fieldErrors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.mobile}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-12 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                    placeholder="Password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    disabled={loading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-12 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                    placeholder="Confirm Password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    disabled={loading}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-center gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                     className="rounded border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white focus:ring-0 disabled:opacity-50 accent-black dark:accent-white"
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to the{' '}
                       <Link to="/terms" className="text-gray-900 dark:text-white hover:underline">
                         Terms of Service
                       </Link>{' '}
                       and{' '}
                       <Link to="/privacy" className="text-gray-900 dark:text-white hover:underline">
                         Privacy Policy
                       </Link>
                  </label>
                </div>
                {fieldErrors.terms && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Already have an account?{' '}
                 <Link to="/login" className="text-gray-900 dark:text-white font-medium hover:underline">
                   Sign in
                 </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}