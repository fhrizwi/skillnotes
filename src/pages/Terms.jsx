import React from 'react'
import { FileText, Scale, AlertTriangle, Users, Shield } from 'lucide-react'

export default function Terms() {
    return (
        <div className='min-h-screen bg-black text-white'>
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
                        <Scale className='w-10 h-10 text-black' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-4'>Terms of Service</h1>
                    <p className='text-xl text-light-gray'>
                        Last updated: January 2025
                    </p>
                </div>

                {/* Content */}
                <div className='prose prose-invert max-w-none'>
                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <FileText className='w-6 h-6' />
                            Acceptance of Terms
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                By accessing and using SkillNotes, you accept and agree to be bound by the 
                                terms and provision of this agreement. If you do not agree to abide by the 
                                above, please do not use this service.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Users className='w-6 h-6' />
                            User Accounts
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>When you create an account with us, you must provide information that is:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Accurate, current, and complete</li>
                                <li>Not misleading or fraudulent</li>
                                <li>In compliance with all applicable laws</li>
                            </ul>
                            <p>
                                You are responsible for maintaining the confidentiality of your account 
                                and password and for restricting access to your computer.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Shield className='w-6 h-6' />
                            Acceptable Use
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>You agree not to use SkillNotes to:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Upload, post, or transmit any content that is illegal, harmful, or offensive</li>
                                <li>Violate any laws or regulations</li>
                                <li>Infringe on intellectual property rights</li>
                                <li>Transmit viruses or malicious code</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Use the service for commercial purposes without permission</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <AlertTriangle className='w-6 h-6' />
                            Prohibited Activities
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>The following activities are strictly prohibited:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Reverse engineering or attempting to extract source code</li>
                                <li>Creating multiple accounts to circumvent restrictions</li>
                                <li>Sharing your account credentials with others</li>
                                <li>Using automated tools to access the service</li>
                                <li>Engaging in any form of harassment or abuse</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Intellectual Property</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                The service and its original content, features, and functionality are and 
                                will remain the exclusive property of SkillNotes and its licensors. The 
                                service is protected by copyright, trademark, and other laws.
                            </p>
                            <p>
                                You retain ownership of the content you create and upload to SkillNotes. 
                                By using our service, you grant us a license to store, process, and 
                                display your content as necessary to provide the service.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Service Availability</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We strive to provide continuous service availability, but we do not 
                                guarantee that the service will be uninterrupted or error-free. We 
                                reserve the right to modify or discontinue the service at any time 
                                without notice.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Limitation of Liability</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                In no event shall SkillNotes, nor its directors, employees, partners, 
                                agents, suppliers, or affiliates, be liable for any indirect, incidental, 
                                special, consequential, or punitive damages, including without limitation, 
                                loss of profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Termination</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We may terminate or suspend your account immediately, without prior notice 
                                or liability, for any reason whatsoever, including without limitation if 
                                you breach the Terms.
                            </p>
                            <p>
                                Upon termination, your right to use the service will cease immediately. 
                                If you wish to terminate your account, you may simply discontinue using 
                                the service.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Changes to Terms</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these 
                                Terms at any time. If a revision is material, we will try to provide at 
                                least 30 days notice prior to any new terms taking effect.
                            </p>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 text-center'>
                        <h2 className='text-2xl font-bold text-white mb-4'>Contact Information</h2>
                        <p className='text-light-gray mb-6'>
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <div className='space-y-2'>
                            <p className='text-white'>Email: legal@skillnotes.com</p>
                            <p className='text-white'>Phone: +91 6206957650</p>
                            <p className='text-white'>Address: Hostel-16, MMDU, Ambala, Haryana</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
