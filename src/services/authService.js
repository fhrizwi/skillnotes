// Real API service for authentication
const API_BASE_URL = 'https://api-skillnotes.faizulhaque2002.workers.dev/api';

export const authService = {
  // Real login API call
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && (data.success || data.user)) {
        // Store user data in localStorage
        const token = data.token || 'temp_token_' + Date.now();
        // Normalize mobile number field name
        const userData = {
          ...data.user,
          mobileNumber: data.user.mobileNumber || data.user.mobileno
        };
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('Login successful, user stored:', userData);
        console.log('User ID in response:', data.user?.userid || data.user?.id || data.user?._id || data.user?.userId);
        console.log('Token stored:', token);
        
        return {
          success: true,
          data: {
            user: userData,
            token: token
          }
        };
      } else {
        // Handle API error messages
        const errorMessage = data.error || data.message || 'Login failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Real signup API call
  async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          mobileno: userData.mobile, // Note: API expects 'mobileno' not 'mobile'
          password: userData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.message === "User created successfully") {
        // Store user data in localStorage
        const token = data.token || 'temp_token_' + Date.now();
        // Normalize mobile number field name
        const userData = {
          ...data.user,
          mobileNumber: data.user.mobileNumber || data.user.mobileno
        };
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('Signup successful, user stored:', userData);
        console.log('User ID in response:', data.user?.userid || data.user?.id || data.user?._id || data.user?.userId);
        console.log('Token stored:', token);
        
        return {
          success: true,
          data: {
            user: userData,
            token: token
          }
        };
      } else {
        // Handle API error messages
        const errorMessage = data.error || data.message || 'Signup failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    // If we have both token and user data, consider user authenticated
    if (token && user) {
      try {
        // If token is a JWT with expiration, check it
        if (token.includes('.')) {
          const decoded = JSON.parse(atob(token));
          return decoded.exp > Date.now();
        }
        // If it's a temporary token, just check if user exists
        return true;
      } catch {
        // If token parsing fails, check if user exists
        return !!user;
      }
    }
    
    return false;
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get user data from API
  async getUserData(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.message === "User data retrieved successfully") {
        // Normalize mobile number field name
        const userData = {
          ...data.user,
          mobileNumber: data.user.mobileNumber || data.user.mobileno
        };
        
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('User data fetched from API:', userData);
        
        return {
          success: true,
          data: userData
        };
      } else {
        const errorMessage = data.error || data.message || 'Failed to fetch user data';
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Edit profile - only send changed fields
  async editProfile(userId, changes) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/edit-profile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...changes,
          token: token
        })
      });

      const data = await response.json();

      if (response.ok && (data.success || data.message === 'Profile updated successfully')) {
        console.log('Profile updated successfully:', data.user);
        
        return {
          success: true,
          data: data.user || data
        };
      } else {
        const errorMessage = data.error || (data.message && data.message !== 'Profile updated successfully' ? data.message : 'Profile update failed');
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Change Password
  async changePassword(userId, passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/change-password/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentpass: passwordData.oldpass,
          newpass: passwordData.newpass
        })
      });

      const data = await response.json();

      if (response.ok && (data.success || data.message === 'Password changed successfully')) {
        console.log('Password changed successfully:', data);
        
        return {
          success: true,
          data: data
        };
      } else {
        const errorMessage = data.error || data.message || 'Password change failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
