// Mock API service for authentication
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Using JSONPlaceholder as mock API

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    name: "Sonu Kumar",
    email: "mrsonukr@gmail.com",
    password: "123456"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    id: 3,
    name: "Jane Smith", 
    email: "jane@example.com",
    password: "password123"
  }
];

export const authService = {
  // Mock login API call
  async login(email, password) {
    await delay(1500); // Simulate network delay
    
    // Check if user exists in mock data
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store user data in localStorage (mock JWT token)
      const token = btoa(JSON.stringify({ id: user.id, email: user.email, exp: Date.now() + 24*60*60*1000 }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
      
      return {
        success: true,
        data: {
          user: { id: user.id, name: user.name, email: user.email },
          token: token
        }
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  // Mock signup API call
  async signup(userData) {
    await delay(1500); // Simulate network delay
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user (simulate API response)
    const newUser = {
      id: MOCK_USERS.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password // In real app, this would be hashed
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Store user data in localStorage
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, exp: Date.now() + 24*60*60*1000 }));
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));
    
    return {
      success: true,
      data: {
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token: token
      }
    };
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
