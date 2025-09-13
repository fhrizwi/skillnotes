import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Home, FileText, Phone, Info, LogIn, Menu, X, ShoppingCart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const underlineHover = 'hover:text-light-gray transition-colors duration-200';
    
    return (
        <header className='bg-white dark:bg-black text-black dark:text-white sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center cursor-pointer' onClick={() => navigate('/')}>
                            <FileText className='w-6 h-6 text-white dark:text-black' />
                        </div>
                        <h1 className='text-2xl font-bold text-black dark:text-white'>SkillNotes</h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        <Link to="/" className={`flex items-center gap-2 ${underlineHover}`}>
                            <Home className='w-4 h-4' />
                            Home
                        </Link>
                        <Link to="/notes" className={`flex items-center gap-2 ${underlineHover}`}>
                            <FileText className='w-4 h-4' />
                            Notes
                        </Link>
                        <Link to="/contactus" className={`flex items-center gap-2 ${underlineHover}`}>
                            <Phone className='w-4 h-4' />
                            Contact Us
                        </Link>
                        <Link to="/about" className={`flex items-center gap-2 ${underlineHover}`}>
                            <Info className='w-4 h-4' />
                            About
                        </Link>
                    </nav>
                    
                    {/* Desktop Search and Login */}
                    <div className='hidden md:flex items-center gap-3'>
                        <div className='flex items-center gap-2 bg-gray-100 dark:bg-dark-gray rounded-lg px-3 py-2'>
                            <Search className='w-4 h-4 text-gray-500 dark:text-light-gray' />
                            <input 
                                type="text" 
                                placeholder='Search notes...' 
                                className='bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-light-gray focus:outline-none w-48'
                            />
                        </div>
                        <ThemeToggle />
                        <button className='relative p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray transition-colors duration-200'>
                            <ShoppingCart className='w-6 h-6' />
                            <span className='absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>0</span>
                        </button>
                        <Link to="/login" className='bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-light-gray transition-colors duration-200 flex items-center gap-2'>
                            <LogIn className='w-4 h-4' />
                            Get Started
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className='md:hidden p-2'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-dark-gray'>
                        <div className='flex flex-col space-y-4 pt-4'>
                            {/* Mobile Search */}
                            <div className='flex items-center gap-2 bg-gray-100 dark:bg-dark-gray rounded-lg px-3 py-2'>
                                <Search className='w-4 h-4 text-gray-500 dark:text-light-gray' />
                                <input 
                                    type="text" 
                                    placeholder='Search notes...' 
                                    className='bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-light-gray focus:outline-none flex-1'
                                />
                            </div>
                            
                            {/* Mobile Theme Toggle */}
                            <div className='flex justify-center'>
                                <ThemeToggle />
                            </div>
                            
                            {/* Mobile Cart */}
                            <button className='relative p-3 text-black dark:text-white hover:text-gray-600 dark:hover:text-light-gray transition-colors duration-200 flex items-center gap-2 w-full justify-center'>
                                <ShoppingCart className='w-5 h-5' />
                                <span>Cart</span>
                                <span className='absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>0</span>
                            </button>
                            
                            {/* Mobile Navigation */}
                            <nav className='flex flex-col space-y-3'>
                                <Link to="/" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <Home className='w-4 h-4' />
                                    Home
                                </Link>
                                <Link to="/notes" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <FileText className='w-4 h-4' />
                                    Notes
                                </Link>
                                <Link to="/contactus" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <Phone className='w-4 h-4' />
                                    Contact Us
                                </Link>
                                <Link to="/about" className={`flex items-center gap-2 py-2 ${underlineHover}`} onClick={() => setIsMenuOpen(false)}>
                                    <Info className='w-4 h-4' />
                                    About
                                </Link>
                            </nav>
                            
                            {/* Mobile Login Button */}
                            <Link 
                                to="/login" 
                                className='bg-black dark:bg-white text-white dark:text-black px-4 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-light-gray transition-colors duration-200 flex items-center justify-center gap-2 mt-4'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn className='w-4 h-4' />
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
