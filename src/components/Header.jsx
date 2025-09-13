import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Home, FileText, Phone, Info, LogIn, Menu, X, ShoppingCart } from 'lucide-react'

export default function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const underlineHover = 'hover:text-light-gray transition-colors duration-200';
    
    return (
        <header className='bg-black text-white shadow-lg sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center cursor-pointer' onClick={() => navigate('/')}>
                            <FileText className='w-6 h-6 text-black' />
                        </div>
                        <h1 className='text-2xl font-bold text-white'>SkillNotes</h1>
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
                        <div className='flex items-center gap-2 bg-dark-gray rounded-lg px-3 py-2'>
                            <Search className='w-4 h-4 text-light-gray' />
                            <input 
                                type="text" 
                                placeholder='Search notes...' 
                                className='bg-transparent text-white placeholder-light-gray focus:outline-none w-48'
                            />
                        </div>
                        <button className='relative p-2 text-white hover:text-light-gray transition-colors duration-200'>
                            <ShoppingCart className='w-6 h-6' />
                            <span className='absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>0</span>
                        </button>
                        <Link to="/login" className='bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center gap-2'>
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
                    <div className='md:hidden mt-4 pb-4 border-t border-dark-gray'>
                        <div className='flex flex-col space-y-4 pt-4'>
                            {/* Mobile Search */}
                            <div className='flex items-center gap-2 bg-dark-gray rounded-lg px-3 py-2'>
                                <Search className='w-4 h-4 text-light-gray' />
                                <input 
                                    type="text" 
                                    placeholder='Search notes...' 
                                    className='bg-transparent text-white placeholder-light-gray focus:outline-none flex-1'
                                />
                            </div>
                            
                            {/* Mobile Cart */}
                            <button className='relative p-3 text-white hover:text-light-gray transition-colors duration-200 flex items-center gap-2 w-full justify-center'>
                                <ShoppingCart className='w-5 h-5' />
                                <span>Cart</span>
                                <span className='absolute top-2 right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>0</span>
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
                                className='bg-white text-black px-4 py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200 flex items-center justify-center gap-2 mt-4'
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
