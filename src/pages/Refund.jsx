import React from 'react'
import { RotateCcw, Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

export default function Refund() {
    return (
        <div className='min-h-screen bg-black text-white'>
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
                        <RotateCcw className='w-10 h-10 text-black' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-4'>Refund Policy</h1>
                    <p className='text-xl text-light-gray'>
                        Last updated: January 2025
                    </p>
                </div>

                {/* Content */}
                <div className='prose prose-invert max-w-none'>
                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <CheckCircle className='w-6 h-6' />
                            Refund Eligibility
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                We offer refunds for premium subscriptions under the following conditions:
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Refund request made within 30 days of purchase</li>
                                <li>Service not used extensively (less than 10% of subscription period)</li>
                                <li>Technical issues that we cannot resolve</li>
                                <li>Duplicate charges or billing errors</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <Clock className='w-6 h-6' />
                            Refund Processing Time
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                Once your refund request is approved:
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Credit card refunds: 5-10 business days</li>
                                <li>PayPal refunds: 3-5 business days</li>
                                <li>Bank transfers: 7-14 business days</li>
                                <li>Digital wallet refunds: 1-3 business days</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <CreditCard className='w-6 h-6' />
                            How to Request a Refund
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>To request a refund, please follow these steps:</p>
                            <ol className='list-decimal list-inside space-y-2 ml-4'>
                                <li>Contact our support team at refunds@skillnotes.com</li>
                                <li>Include your order number and reason for refund</li>
                                <li>Provide any relevant screenshots or documentation</li>
                                <li>Wait for our team to review your request</li>
                                <li>Receive confirmation and refund processing details</li>
                            </ol>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                            <AlertCircle className='w-6 h-6' />
                            Non-Refundable Items
                        </h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>The following items are not eligible for refunds:</p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Free trial periods</li>
                                <li>Services used for more than 30 days</li>
                                <li>Custom development work</li>
                                <li>Third-party integrations or add-ons</li>
                                <li>Refunds requested after 30 days</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Partial Refunds</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                In some cases, we may offer partial refunds based on:
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Amount of service used</li>
                                <li>Time remaining in subscription period</li>
                                <li>Nature of the issue</li>
                                <li>Customer satisfaction concerns</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Dispute Resolution</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                If you disagree with our refund decision, you can:
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Request a review by our management team</li>
                                <li>Provide additional documentation</li>
                                <li>Contact us for further discussion</li>
                                <li>Escalate through your payment provider if applicable</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-6'>Cancellation Policy</h2>
                        <div className='space-y-4 text-light-gray'>
                            <p>
                                You can cancel your subscription at any time:
                            </p>
                            <ul className='list-disc list-inside space-y-2 ml-4'>
                                <li>Cancel through your account settings</li>
                                <li>Contact support for assistance</li>
                                <li>Subscription will remain active until the end of billing period</li>
                                <li>No automatic renewal after cancellation</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-dark-gray rounded-lg p-8 text-center'>
                        <h2 className='text-2xl font-bold text-white mb-4'>Contact Us</h2>
                        <p className='text-light-gray mb-6'>
                            For refund requests or questions about this policy:
                        </p>
                        <div className='space-y-2'>
                            <p className='text-white'>Email: refunds@skillnotes.com</p>
                            <p className='text-white'>Phone: +91 6206957650</p>
                            <p className='text-white'>Address: Hostel-16, MMDU, Ambala, Haryana</p>
                        </div>
                        <div className='mt-6'>
                            <a 
                                href="/contactus" 
                                className='bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200'
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
