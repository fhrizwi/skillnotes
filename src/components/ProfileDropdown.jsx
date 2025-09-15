import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, HelpCircle } from 'lucide-react'
import { authService } from '../services/authService'

export default function ProfileDropdown({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        onLogout()
        setIsOpen(false)
    }

    const handleOptionClick = () => {
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
                <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center'>
                    <span className='text-sm text-white dark:text-black font-medium'>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            to="/profile"
                            onClick={handleOptionClick}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </Link>


                        <Link
                            to="/help"
                            onClick={handleOptionClick}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
