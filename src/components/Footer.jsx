import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, LinkedIn, GitHub, YouTube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='bg-black text-white'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                {/* Main Footer Content */}
                <div className='grid md:grid-cols-3 gap-8 mb-8'>
                    {/* Quick Links */}
                    <div>
                        <h3 className='text-xl font-bold text-white mb-4'>Quick Links</h3>
                        <div className='space-y-3'>
                            <Link to="/" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Home
                            </Link>
                            <Link to="/notes" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Notes
                            </Link>
                            <Link to="/contactus" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Contact Us
                            </Link>
                            <Link to="/about" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className='text-xl font-bold text-white mb-4'>Support</h3>
                        <div className='space-y-3'>
                            <Link to="/faq" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                FAQ's
                            </Link>
                            <Link to="/privacy" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Terms of Service
                            </Link>
                            <Link to="/refund" className='block text-light-gray hover:text-white transition-colors duration-200'>
                                Refund Policy
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className='text-xl font-bold text-white mb-4'>Contact Info</h3>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <Mail className='w-5 h-5 text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-light-gray'>support@skillnotes.com</p>
                                    <p className='text-light-gray text-sm'>We'll respond within 24 hours</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Phone className='w-5 h-5 text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-light-gray'>+91 6206957650</p>
                                    <p className='text-light-gray text-sm'>Mon-Fri 9AM-6PM IST</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MapPin className='w-5 h-5 text-light-gray mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-light-gray'>Hostel-16, MMDU</p>
                                    <p className='text-light-gray'>Ambala, Haryana, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Social Links and Copyright */}
                <div className='border-t border-dark-gray pt-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        {/* Social Links */}
                        <div className='flex items-center gap-4'>
                            <span className='text-light-gray'>Follow us:</span>
                            <div className='flex items-center gap-3'>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <Facebook className='w-5 h-5' />
                                </a>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <Instagram className='w-5 h-5' />
                                </a>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <Twitter className='w-5 h-5' />
                                </a>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <LinkedIn className='w-5 h-5' />
                                </a>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <GitHub className='w-5 h-5' />
                                </a>
                                <a href="#" className='text-light-gray hover:text-white transition-colors duration-200'>
                                    <YouTube className='w-5 h-5' />
                                </a>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className='text-center md:text-right'>
                            <p className='text-light-gray text-sm'>
                                © 2025 SkillNotes. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
