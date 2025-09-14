import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Phone, Info, LogIn, Menu, X, ShoppingCart, User, LogOut, BookOpen, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { authService } from '../services/authService'
import { useCart } from '../contexts/CartContext'

export default function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { getTotalItems } = useCart();
    const underlineHover = 'hover:text-light-gray transition-colors duration-200';

    useEffect(() => {
        // Check if user is authenticated on component mount
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            const userData = authService.getCurrentUser();
            setIsAuthenticated(isAuth);
            setUser(userData);
        };

        checkAuth();

        // Listen for storage changes (when user logs in from another tab)
        const handleStorageChange = () => {
            checkAuth();
        };

        // Listen for custom login event
        const handleUserLogin = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userLogin', handleUserLogin);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLogin', handleUserLogin);
        };
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    return (
        <header className='bg-white/80 dark:bg-black/80 backdrop-blur-md text-black dark:text-white sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center cursor-pointer' onClick={() => navigate('/')}>
                            <BookOpen className='w-4 h-4 sm:w-6 sm:h-6 text-white dark:text-black' />
                        </div>
                        <h1 className='text-lg sm:text-2xl font-bold text-black dark:text-white'>SkillNotes</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        <Link to="/" className={`flex items-center gap-2 ${underlineHover}`}>
                            <Home className='w-4 h-4' />
                            Home
                        </Link>
                        <Link to="/store" className={`flex items-center gap-2 ${underlineHover}`}>
                            <ShoppingCart className='w-4 h-4' />
                            Store
                        </Link>
                        {isAuthenticated && (
                            <Link to="/my-purchases" className={`flex items-center gap-2 ${underlineHover}`}>
                                <User className='w-4 h-4' />
                                My Purchases
                            </Link>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Link to="/contactus" className={`flex items-center gap-2 ${underlineHover}`}>
                                    <Phone className='w-4 h-4' />
                                    Contact Us
                                </Link>
                                <Link to="/about" className={`flex items-center gap-2 ${underlineHover}`}>
                                    <Info className='w-4 h-4' />
                                    About
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Desktop Login */}
                    <div className='hidden md:flex items-center gap-3'>
                        <ThemeToggle />
                        <button 
                            onClick={() => navigate('/cart')}
                            className='relative p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray transition-colors duration-200'
                        >
                            <ShoppingCart className='w-6 h-6' />
                            <span className='absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                                {getTotalItems()}
                            </span>
                        </button>
                        {isAuthenticated ? (
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center'>
                                    <span className='text-sm text-white dark:text-black'>
                                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className='bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-light-gray transition-colors duration-200 flex items-center gap-2'>
                                <ArrowRight className='w-4 h-4' />
                                Get Started
                            </Link>
                        )}
                    </div>

                    {/* Mobile Cart and Menu Button */}
                    <div className='md:hidden flex items-center gap-1 sm:gap-2'>

                        {/* Mobile Cart */}
                        <button 
                            onClick={() => {
                                navigate('/cart');
                                setIsMenuOpen(false);
                            }}
                            className='relative p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray transition-colors duration-200'
                        >
                            <ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
                            <span className='absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold'>
                                {getTotalItems()}
                            </span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className='p-2'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className='w-5 h-5 sm:w-6 sm:h-6' /> : <Menu className='w-5 h-5 sm:w-6 sm:h-6' />}
                        </button>
                    </div>
                </div>


                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-dark-gray'>
                        <div className='flex flex-col space-y-4 pt-4'>
                            {/* Mobile Navigation */}
                            <nav className='flex flex-col space-y-3'>
                                <Link to="/" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <Home className='w-4 h-4' />
                                    Home
                                </Link>
                                <Link to="/store" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <ShoppingCart className='w-4 h-4' />
                                    Store
                                </Link>
                                {isAuthenticated && (
                                    <Link to="/my-purchases" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                        <User className='w-4 h-4' />
                                        My Purchases
                                    </Link>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <Link to="/contactus" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                            <Phone className='w-4 h-4' />
                                            Contact Us
                                        </Link>
                                        <Link to="/about" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                            <Info className='w-4 h-4' />
                                            About
                                        </Link>
                                    </>
                                )}

                                {/* Theme Toggle as Navigation Item */}
                                <div className={`flex items-center gap-2 py-2`}>
                                    <svg className='w-4 h-4 text-black dark:text-white' fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                    <span className='text-black dark:text-white '>Dark Theme</span>
                                    <div className='ml-auto'>
                                        <ThemeToggle />
                                    </div>
                                </div>

                                {/* Mobile User Section - After About */}
                                {isAuthenticated && (
                                    <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center'>
                                                    <span className='text-lg text-white dark:text-black'>
                                                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className='font-medium text-black dark:text-white'>{user?.name || 'User'}</p>
                                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{user?.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className='p-2 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200'
                                                title='Logout'
                                            >
                                                <LogOut className='w-5 h-5' />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </nav>

                            {/* Mobile Login Button */}
                            {!isAuthenticated && (
                                <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                                    <Link
                                        to="/login"
                                        className='w-full bg-black dark:bg-white text-white dark:text-black px-4 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-light-gray transition-colors duration-200 flex items-center justify-center gap-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <ArrowRight className='w-4 h-4' />
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
