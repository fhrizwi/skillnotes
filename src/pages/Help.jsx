import React, { useState } from 'react'
import { HelpCircle, Mail, Phone, MessageCircle, Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

export default function Help() {
    const [searchQuery, setSearchQuery] = useState('')
    const [openFAQ, setOpenFAQ] = useState(null)

    const faqData = [
        {
            id: 1,
            question: "How do I purchase a course?",
            answer: "To purchase a course, simply browse our store, select the course you're interested in, and click the 'Add to Cart' button. Then proceed to checkout to complete your purchase."
        },
        {
            id: 2,
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods. All transactions are processed securely."
        },
        {
            id: 3,
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund."
        },
        {
            id: 4,
            question: "How do I access my purchased courses?",
            answer: "Once you purchase a course, you can access it from your 'My Purchases' page. All your courses will be available there for lifetime access."
        },
        {
            id: 5,
            question: "Do you offer certificates upon completion?",
            answer: "Yes! After completing a course, you'll receive a certificate of completion that you can download and share on your professional profiles."
        },
        {
            id: 6,
            question: "Can I download course materials?",
            answer: "Yes, most courses include downloadable materials such as PDFs, templates, and resources that you can keep for future reference."
        },
        {
            id: 7,
            question: "Is there mobile app support?",
            answer: "Currently, our platform is fully responsive and works great on mobile browsers. We're working on dedicated mobile apps for iOS and Android."
        },
        {
            id: 8,
            question: "How do I update my profile information?",
            answer: "You can update your profile information by going to your Profile page and clicking the 'Edit Profile' button. Make sure to save your changes."
        }
    ]

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Support",
            description: "Get help via email within 24 hours",
            contact: "support@skillnotes.com",
            action: "Send Email"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "WhatsApp Support",
            description: "Chat with us on WhatsApp",
            contact: "+91 6206957650",
            action: "WhatsApp Chat"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Live Chat",
            description: "Chat with us in real-time",
            contact: "Available 9 AM - 6 PM EST",
            action: "Start Chat"
        }
    ]

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="w-8 h-8 text-black dark:text-white" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Help & Support
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find answers to common questions or get in touch with our support team
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Methods */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Contact Us
                            </h2>
                            <div className="space-y-4">
                                {contactMethods.map((method, index) => (
                                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <div className="flex items-start gap-3">
                                            <div className="text-black dark:text-white mt-1">
                                                {method.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                                    {method.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    {method.description}
                                                </p>
                                                <p className="text-sm font-medium text-black dark:text-white mb-2">
                                                    {method.contact}
                                                </p>
                                                <button className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1">
                                                    {method.action}
                                                    <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            
                            {searchQuery && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found for "{searchQuery}"
                                </p>
                            )}

                            <div className="space-y-4">
                                {filteredFAQs.length > 0 ? (
                                    filteredFAQs.map((faq) => (
                                        <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <span className="font-medium text-gray-900 dark:text-white pr-4">
                                                    {faq.question}
                                                </span>
                                                {openFAQ === faq.id ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                )}
                                            </button>
                                            {openFAQ === faq.id && (
                                                <div className="px-4 pb-4">
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 dark:text-gray-400">
                                            No results found for "{searchQuery}". Try different keywords.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-12">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Additional Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Documentation</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Comprehensive guides and tutorials
                                </p>
                                <button className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                                    View Docs
                                </button>
                            </div>
                            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Community</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Connect with other learners
                                </p>
                                <button className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                                    Join Community
                                </button>
                            </div>
                            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Status Page</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Check system status and updates
                                </p>
                                <button className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                                    Check Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
