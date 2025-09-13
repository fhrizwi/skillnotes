import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'

export default function FAQ() {
    const [openItems, setOpenItems] = useState({});
    
    const faqs = [
        {
            id: 1,
            question: "How do I get started with SkillNotes?",
            answer: "Getting started is easy! Simply create an account, verify your email, and you can immediately start creating and organizing your notes. No setup required - just sign up and begin taking notes."
        },
        {
            id: 2,
            question: "Is my data secure and private?",
            answer: "Yes, absolutely! We use industry-standard encryption to protect your notes and personal information. Your data is stored securely and we never share your personal information with third parties without your explicit consent."
        },
        {
            id: 3,
            question: "Can I export my notes?",
            answer: "Yes! You can export your notes in multiple formats including PDF, Markdown, and plain text. This ensures you always have access to your notes even if you decide to switch platforms."
        },
        {
            id: 4,
            question: "Is there a mobile app available?",
            answer: "Currently, SkillNotes is optimized for web browsers and works great on mobile devices. We're working on dedicated mobile apps for iOS and Android, which will be available soon."
        },
        {
            id: 5,
            question: "How much does SkillNotes cost?",
            answer: "SkillNotes offers a free tier with basic features. We also have premium plans with advanced features like unlimited notes, advanced search, and priority support. Check our pricing page for detailed information."
        },
        {
            id: 6,
            question: "Can I collaborate on notes with others?",
            answer: "Yes! Our premium plans include collaboration features that allow you to share notes with team members, work together in real-time, and leave comments on shared documents."
        },
        {
            id: 7,
            question: "What file types can I attach to my notes?",
            answer: "You can attach various file types including images (JPG, PNG, GIF), documents (PDF, DOC, DOCX), and other files. The maximum file size depends on your plan."
        },
        {
            id: 8,
            question: "How do I delete my account?",
            answer: "You can delete your account from the account settings page. Please note that this action is irreversible and all your notes and data will be permanently deleted. We recommend exporting your notes before deleting your account."
        }
    ];

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className='min-h-screen bg-black text-white'>
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-6'>
                        <HelpCircle className='w-10 h-10 text-black' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-4'>Frequently Asked Questions</h1>
                    <p className='text-xl text-light-gray max-w-2xl mx-auto'>
                        Find answers to common questions about SkillNotes. Can't find what you're looking for? 
                        <a href="/contactus" className='text-white hover:text-light-gray ml-1 underline'>Contact us</a>.
                    </p>
                </div>

                {/* Search Bar */}
                <div className='mb-8'>
                    <div className='relative max-w-md mx-auto'>
                        <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray' />
                        <input 
                            type="text" 
                            placeholder='Search FAQs...' 
                            className='w-full bg-dark-gray border border-light-gray rounded-lg pl-10 pr-4 py-3 text-white placeholder-light-gray focus:outline-none focus:border-white'
                        />
                    </div>
                </div>

                {/* FAQ Items */}
                <div className='space-y-4'>
                    {faqs.map((faq) => (
                        <div key={faq.id} className='bg-dark-gray rounded-lg overflow-hidden'>
                            <button
                                className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-80 transition-colors duration-200'
                                onClick={() => toggleItem(faq.id)}
                            >
                                <h3 className='text-lg font-semibold text-white pr-4'>{faq.question}</h3>
                                {openItems[faq.id] ? (
                                    <ChevronUp className='w-5 h-5 text-light-gray flex-shrink-0' />
                                ) : (
                                    <ChevronDown className='w-5 h-5 text-light-gray flex-shrink-0' />
                                )}
                            </button>
                            {openItems[faq.id] && (
                                <div className='px-6 pb-4'>
                                    <p className='text-light-gray leading-relaxed'>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className='mt-12 bg-dark-gray rounded-lg p-8 text-center'>
                    <h2 className='text-2xl font-bold text-white mb-4'>Still have questions?</h2>
                    <p className='text-light-gray mb-6'>
                        Can't find the answer you're looking for? Our support team is here to help!
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <a 
                            href="/contactus" 
                            className='bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-light-gray transition-colors duration-200'
                        >
                            Contact Support
                        </a>
                        <a 
                            href="mailto:support@skillnotes.com" 
                            className='border border-light-gray text-white px-6 py-3 rounded-lg font-medium hover:bg-dark-gray transition-colors duration-200'
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
