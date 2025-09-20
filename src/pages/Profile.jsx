import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Edit3, Save, X, Phone, Lock } from 'lucide-react'
import { authService } from '../services/authService'
import { useNotification } from '../contexts/NotificationContext'

export default function Profile() {
    const navigate = useNavigate()
    const { showSuccess, showError } = useNotification()
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [originalForm, setOriginalForm] = useState({
        name: '',
        email: '',
        mobileNumber: ''
    })
    const [showPasswordFields, setShowPasswordFields] = useState(false)

    useEffect(() => {
        const loadUserData = async () => {
            const userData = authService.getCurrentUser()
            if (!userData) {
                navigate('/login')
                return
            }
            
            // First set data from localStorage for immediate display
            setUser(userData)
            
            // Then fetch fresh data from API
            try {
                const userId = userData.userid || userData.id || userData._id || userData.userId || userData.user_id
                if (userId) {
                    const response = await authService.getUserData(userId)
                    if (response.success) {
                        const freshUserData = response.data
                        setUser(freshUserData)
                        
                        const formData = {
                            name: freshUserData.name || '',
                            email: freshUserData.email || '',
                            mobileNumber: freshUserData.mobileNumber || freshUserData.mobileno || ''
                        }
                        setEditForm({
                            ...formData,
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        })
                        setOriginalForm(formData)
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
                // Fallback to localStorage data
                const formData = {
                    name: userData.name || '',
                    email: userData.email || '',
                    mobileNumber: userData.mobileNumber || userData.mobileno || ''
                }
                setEditForm({
                    ...formData,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                setOriginalForm(formData)
            }
        }
        
        loadUserData()
    }, [navigate])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditForm({
            ...originalForm,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handlePasswordEdit = () => {
        setIsEditingPassword(true)
        setShowPasswordFields(true)
    }

    const handlePasswordCancel = () => {
        setIsEditingPassword(false)
        setShowPasswordFields(false)
        setEditForm({
            ...editForm,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handlePasswordSave = async () => {
        try {
            // Validate passwords
            if (!editForm.currentPassword || !editForm.newPassword || !editForm.confirmPassword) {
                showError('Please fill in all password fields')
                return
            }

            if (editForm.newPassword !== editForm.confirmPassword) {
                showError('New passwords do not match')
                return
            }

            if (editForm.newPassword.length < 6) {
                showError('New password must be at least 6 characters long')
                return
            }

            // Get user ID
            const userId = user?.userid || user?.id || user?._id || user?.userId || user?.user_id
            if (!userId) {
                showError('User ID not found. Please login again.')
                return
            }

            // Set loading state
            setIsChangingPassword(true)

            // Call API to change password
            const response = await authService.changePassword(userId, {
                oldpass: editForm.currentPassword,
                newpass: editForm.newPassword
            })

            if (response && response.success) {
                setIsEditingPassword(false)
                setShowPasswordFields(false)
                setEditForm({
                    ...editForm,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                showSuccess('Password updated successfully!')
            } else {
                showError(response?.message || 'Failed to update password')
            }
        } catch (error) {
            console.error('Error changing password:', error)
            showError(error.message || 'Error updating password. Please try again.')
        } finally {
            // Reset loading state
            setIsChangingPassword(false)
        }
    }

    const handleSave = async () => {
        try {
            console.log('Current user object:', user)
            console.log('User ID field:', user?.userid || user?.id || user?._id || user?.userId)
            
            
            // Find only changed fields
            const changes = {}
            if (editForm.name !== originalForm.name) {
                changes.name = editForm.name
            }
            if (editForm.email !== originalForm.email) {
                changes.email = editForm.email
            }
            if (editForm.mobileNumber !== originalForm.mobileNumber) {
                changes.mobileNumber = editForm.mobileNumber
            }

            // If no changes, just exit edit mode
            if (Object.keys(changes).length === 0) {
                setIsEditing(false)
                return
            }

            // Get user ID from various possible fields
            const userId = user?.userid || user?.id || user?._id || user?.userId || user?.user_id
            if (!userId) {
                // If no user ID found, try using email as identifier
                console.log('User ID not found, using email as identifier:', user?.email)
                if (!user?.email) {
                    throw new Error('User ID not found. Please login again.')
                }
                // For now, we'll use email as the identifier
                // You might need to update your API to accept email instead of user ID
                throw new Error('User ID not found in user data. Please check API response structure.')
            }

            // Set loading state
            setIsSavingProfile(true)

            // Call API to update profile
            const response = await authService.editProfile(userId, changes)
            console.log('API Response:', response)
            
            if (response && response.success) {
                // Update local state with new data
                const updatedUser = { ...user, ...response.data }
                setUser(updatedUser)
                
                // Update localStorage with new user data
                localStorage.setItem('user', JSON.stringify(updatedUser))
                
                // Update original form with new values
                const newFormData = {
                    name: updatedUser.name || '',
                    email: updatedUser.email || '',
                    mobileNumber: updatedUser.mobileNumber || updatedUser.mobileno || ''
                }
                setOriginalForm(newFormData)
                
                // Update edit form with new values
                setEditForm({
                    ...newFormData,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                
                setIsEditing(false)
                showSuccess('Profile updated successfully!')
            } else {
                throw new Error('Profile update failed - no success response')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            showError(error.message || 'Error updating profile. Please try again.')
        } finally {
            // Reset loading state
            setIsSavingProfile(false)
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
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center overflow-hidden">
                                {user.profilePicture ? (
                                    <img 
                                        src={user.profilePicture} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl text-white dark:text-black font-bold">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                )}
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
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Information
                            </h2>
                            
                            {isEditing ? (
                                <div className="space-y-6">

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
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                value={editForm.mobileNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter your mobile number"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>


                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSavingProfile}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                isSavingProfile 
                                                    ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed' 
                                                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                                            }`}
                                        >
                                            {isSavingProfile ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-black"></div>
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Save Changes</span>
                                                </>
                                            )}
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
                                    {(user.mobileNumber || user.mobileno) && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Number</p>
                                                <p className="text-gray-900 dark:text-white">{user.mobileNumber || user.mobileno}</p>
                                            </div>
                                        </div>
                                    )}
                                    {user.createdAt && (
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                                <p className="text-gray-900 dark:text-white">
                                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Password Change Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    Password
                                </h2>
                                {!isEditingPassword && (
                                    <button
                                        onClick={handlePasswordEdit}
                                        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 text-sm"
                                    >
                                        Change Password
                                    </button>
                                )}
                            </div>
                            
                            {isEditingPassword && (
                                <div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Update your account password
                                        </p>
                                    </div>
                                    
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

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handlePasswordSave}
                                            disabled={isChangingPassword}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                isChangingPassword 
                                                    ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed' 
                                                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                                            }`}
                                        >
                                            {isChangingPassword ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-black"></div>
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Save Password</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handlePasswordCancel}
                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                </div>
            </div>
        </div>
    )
}
