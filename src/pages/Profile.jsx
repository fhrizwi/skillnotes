import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Edit3, Save, X, Globe, Camera, Lock } from 'lucide-react'
import { authService } from '../services/authService'

export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        bio: '',
        location: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [showPasswordFields, setShowPasswordFields] = useState(false)

    useEffect(() => {
        const userData = authService.getCurrentUser()
        if (!userData) {
            navigate('/login')
            return
        }
        setUser(userData)
        setEditForm({
            name: userData.name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            location: userData.location || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }, [navigate])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setShowPasswordFields(false)
        setEditForm({
            name: user?.name || '',
            email: user?.email || '',
            bio: user?.bio || '',
            location: user?.location || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handleSave = () => {
        // Update user data (you can implement actual update logic here)
        const updatedUser = { ...user, ...editForm }
        setUser(updatedUser)
        setIsEditing(false)
        setShowPasswordFields(false)
        // You might want to call an API to update user data
    }

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Handle profile picture upload logic here
            console.log('Profile picture selected:', file)
        }
    }

    const handleInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        })
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl text-white dark:text-black font-bold">
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user.name || 'User'}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Content */}
                <div className="max-w-4xl mx-auto space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Information
                            </h2>
                            
                            {isEditing ? (
                                <div className="space-y-6">
                                    {/* Profile Picture Section */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Profile Picture
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center">
                                                <span className="text-xl text-white dark:text-black font-bold">
                                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="profile-picture"
                                                    accept="image/*"
                                                    onChange={handleProfilePictureChange}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="profile-picture"
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                                                >
                                                    <Camera className="w-4 h-4" />
                                                    Change Picture
                                                </label>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    JPG, PNG up to 2MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Basic Information */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={editForm.bio}
                                                onChange={handleInputChange}
                                                rows={3}
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={editForm.location}
                                                onChange={handleInputChange}
                                                placeholder="City, Country"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Change Section */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                <Lock className="w-5 h-5" />
                                                Password
                                            </h3>
                                            <button
                                                onClick={() => setShowPasswordFields(!showPasswordFields)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                                    showPasswordFields 
                                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                                                        : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                                                }`}
                                            >
                                                {showPasswordFields ? 'Cancel' : 'Change Password'}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            Update your account password
                                        </p>
                                        
                                        {showPasswordFields && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="currentPassword"
                                                        value={editForm.currentPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter current password"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="newPassword"
                                                        value={editForm.newPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter new password"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={editForm.confirmPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="Confirm new password"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                            <p className="text-gray-900 dark:text-white">{user.name || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                            <p className="text-gray-900 dark:text-white">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                            <p className="text-gray-900 dark:text-white">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                    {user.bio && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-5 h-5 text-gray-400 mt-1">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
                                                <p className="text-gray-900 dark:text-white">{user.bio}</p>
                                            </div>
                                        </div>
                                    )}
                                    {user.location && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                                <p className="text-gray-900 dark:text-white">{user.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                </div>
            </div>
        </div>
    )
}
