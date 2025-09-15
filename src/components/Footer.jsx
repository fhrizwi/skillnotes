import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Github, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='bg-gray-100 dark:bg-black text-black dark:text-white border-t border-gray-200 dark:border-gray-800'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                {/* Main Footer Content */}
                <div className='grid md:grid-cols-4 gap-8 mb-8'>
                    {/* Quick Links */}
                    <div>
                        <h3 className='text-xl font-bold text-black dark:text-white mb-4'>Quick Links</h3>
                        <div className='space-y-3'>
                            <Link to="/" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                Home
                            </Link>
                            <Link to="/contactus" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                Contact Us
                            </Link>
                            <Link to="/about" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className='text-xl font-bold text-black dark:text-white mb-4'>Support</h3>
                        <div className='space-y-3'>
                            <Link to="/faq" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                FAQ's
                            </Link>
                            <Link to="/privacy" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                Terms of Service
                            </Link>
                            <Link to="/refund" className='block text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200'>
                                Refund Policy
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className='text-xl font-bold text-black dark:text-white mb-4'>Contact Info</h3>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <Mail className='w-5 h-5 text-gray-600 dark:text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-gray-600 dark:text-light-gray'>support@skillnotes.com</p>
                                    <p className='text-gray-600 dark:text-light-gray text-sm'>We'll respond within 24 hours</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Phone className='w-5 h-5 text-gray-600 dark:text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-gray-600 dark:text-light-gray'>+91 6206957650</p>
                                    <p className='text-gray-600 dark:text-light-gray text-sm'>Mon-Fri 9AM-6PM IST</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MapPin className='w-5 h-5 text-gray-600 dark:text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-gray-600 dark:text-light-gray'>Hostel-16, MMDU</p>
                                    <p className='text-gray-600 dark:text-light-gray'>Ambala, Haryana, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo and Taglines */}
                    <div className='flex flex-col items-center md:items-start'>
                        <div className='mb-4'>
                            <div className='text-3xl font-bold text-black dark:text-white mb-2'>
                                SkillNotes
                            </div>
                            <div className='w-16 h-1 bg-gray-400 dark:bg-gray-600 rounded-full'></div>
                        </div>
                        <div className='text-center md:text-left space-y-2'>
                            <p className='text-gray-600 dark:text-light-gray text-sm font-medium'>
                                "Master Your Skills"
                            </p>
                            <p className='text-gray-600 dark:text-light-gray text-xs'>
                                Quality study materials for every student
                            </p>
                            <p className='text-gray-600 dark:text-light-gray text-xs'>
                                Learn • Practice • Excel
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Social Links and Copyright */}
                <div className='border-t border-gray-300 dark:border-dark-gray pt-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        {/* Social Links */}
                        <div className='flex items-center gap-4'>
                            <span className='text-gray-600 dark:text-light-gray'>Follow us:</span>
                            <div className='flex items-center gap-3'>

                                <a href="https://youtube.com/@skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="YouTube">
                                    <Youtube className='w-5 h-5' />
                                </a>
                                <a href="https://instagram.com/skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="Instagram">
                                    <Instagram className='w-5 h-5' />
                                </a>
                                <a href="https://facebook.com/skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="Facebook">
                                    <Facebook className='w-5 h-5' />
                                </a>
                                <a href="https://twitter.com/skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="Twitter">
                                    <Twitter className='w-5 h-5' />
                                </a>
                                <a href="https://linkedin.com/company/skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="LinkedIn">
                                    <Linkedin className='w-5 h-5' />
                                </a>
                                <a href="https://github.com/skillnotes" target="_blank" rel="noopener noreferrer" className='text-gray-600 dark:text-light-gray hover:text-black dark:hover:text-white transition-colors duration-200' title="GitHub">
                                    <Github className='w-5 h-5' />
                                </a>

                            </div>
                        </div>

                        {/* Copyright */}
                        <div className='text-center md:text-right'>
                            <p className='text-gray-600 dark:text-light-gray text-sm'>
                                © 2025 SkillNotes. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
