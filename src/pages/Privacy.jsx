import React from 'react'
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react'

export default function Privacy() {
    return (
        <div className='min-h-screen bg-black text-white'>
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
                        <Shield className='w-10 h-10 text-black' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-4'>Privacy Policy</h1>
                    <p className='text-xl text-light-gray'>
                        Last updated: January 2025
                    </p>
                </div>

                {/* Content */}
                <div className='prose prose-invert max-w-none'>
                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Lock className='w-6 h-6' />
                            Information We Collect
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, 
                                use our services, or contact us for support.
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Account information (name, email address, password)</li>
                                <li>Content you create (notes, documents, files)</li>
                                <li>Communication data (support messages, feedback)</li>
                                <li>Usage data (how you interact with our services)</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Eye className='w-6 h-6' />
                            How We Use Your Information
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>We use the information we collect to:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send technical notices and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Develop new products and services</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Database className='w-6 h-6' />
                            Data Security
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We implement appropriate technical and organizational measures to protect your 
                                personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>End-to-end encryption for all data transmission</li>
                                <li>Secure data storage with industry-standard encryption</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and authentication measures</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <UserCheck className='w-6 h-6' />
                            Your Rights
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>You have the right to:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Access your personal information</li>
                                <li>Correct inaccurate or incomplete data</li>
                                <li>Delete your personal information</li>
                                <li>Object to processing of your data</li>
                                <li>Data portability (export your data)</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Cookies and Tracking</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We use cookies and similar technologies to enhance your experience, 
                                analyze usage patterns, and improve our services. You can control 
                                cookie preferences through your browser settings.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Third-Party Services</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We may use third-party services for analytics, payment processing, 
                                and other functions. These services have their own privacy policies, 
                                and we encourage you to review them.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Changes to This Policy</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We may update this privacy policy from time to time. We will notify 
                                you of any changes by posting the new policy on this page and updating 
                                the "Last updated" date.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 text-center'>
                        <h2 className='text-2xl font-bold text-white mb-4'>Contact Us</h2>
                        <p className='text-light-gray mb-6'>
                            If you have any questions about this privacy policy, please contact us:
                        </p>
                        <div className='space-y-2'>
                            <p className='text-white'>Email: privacy@skillnotes.com</p>
                            <p className='text-white'>Phone: +91 6206957650</p>
                            <p className='text-white'>Address: Hostel-16, MMDU, Ambala, Haryana</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
