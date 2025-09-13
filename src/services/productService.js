// Product management service for digital marketplace
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Mock API

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock products data
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Complete React Development Guide",
    description: "A comprehensive PDF guide covering React fundamentals, hooks, state management, and advanced concepts.",
    price: 299,
    currency: "INR",
    category: "PDF",
    fileType: "pdf",
    fileSize: "2.5 MB",
    downloadCount: 150,
    rating: 4.8,
    image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=React+Guide",
    tags: ["React", "JavaScript", "Frontend", "Tutorial"],
    createdAt: "2024-01-15",
    isActive: true
  },
  {
    id: 2,
    title: "Modern UI Design System - PSD Files",
    description: "Complete PSD design system with components, icons, and templates for modern web applications.",
    price: 499,
    currency: "INR",
    category: "PSD",
    fileType: "psd",
    fileSize: "15.2 MB",
    downloadCount: 89,
    rating: 4.9,
    image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=UI+Design+System",
    tags: ["Design", "UI/UX", "PSD", "Templates"],
    createdAt: "2024-01-20",
    isActive: true
  },
  {
    id: 3,
    title: "Complete Web Development Bundle",
    description: "ZIP file containing HTML, CSS, JavaScript templates, and documentation for web development projects.",
    price: 799,
    currency: "INR",
    category: "ZIP",
    fileType: "zip",
    fileSize: "45.8 MB",
    downloadCount: 234,
    rating: 4.7,
    image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Web+Dev+Bundle",
    tags: ["Web Development", "Templates", "HTML", "CSS", "JavaScript"],
    createdAt: "2024-01-25",
    isActive: true
  },
  {
    id: 4,
    title: "Node.js Backend Architecture Guide",
    description: "Detailed PDF guide on building scalable Node.js applications with best practices and patterns.",
    price: 399,
    currency: "INR",
    category: "PDF",
    fileType: "pdf",
    fileSize: "3.2 MB",
    downloadCount: 67,
    rating: 4.6,
    image: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Node.js+Guide",
    tags: ["Node.js", "Backend", "Architecture", "JavaScript"],
    createdAt: "2024-02-01",
    isActive: true
  }
];

// Mock purchased products (user's purchase history)
const MOCK_PURCHASES = [];

export const productService = {
  // Get all products
  async getProducts(filters = {}) {
    await delay(1000);
    
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }
    
    return {
      success: true,
      data: filteredProducts
    };
  },

  // Get single product
  async getProduct(id) {
    await delay(500);
    
    const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    
    if (product) {
      return {
        success: true,
        data: product
      };
    } else {
      throw new Error('Product not found');
    }
  },

  // Purchase product (mock payment)
  async purchaseProduct(productId, userId) {
    await delay(2000);
    
    const product = MOCK_PRODUCTS.find(p => p.id === parseInt(productId));
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Mock payment success
    const purchase = {
      id: MOCK_PURCHASES.length + 1,
      productId: product.id,
      userId: userId,
      product: product,
      purchaseDate: new Date().toISOString(),
      amount: product.price,
      currency: product.currency,
      status: 'completed'
    };
    
    MOCK_PURCHASES.push(purchase);
    
    return {
      success: true,
      data: purchase
    };
  },

  // Get user's purchased products
  async getUserPurchases(userId) {
    await delay(800);
    
    const userPurchases = MOCK_PURCHASES.filter(p => p.userId === userId);
    
    return {
      success: true,
      data: userPurchases
    };
  },

  // Download product file (mock)
  async downloadProduct(productId, userId) {
    await delay(1000);
    
    const purchase = MOCK_PURCHASES.find(p => p.productId === parseInt(productId) && p.userId === userId);
    
    if (!purchase) {
      throw new Error('Product not purchased or not found');
    }
    
    // Mock file download
    return {
      success: true,
      data: {
        downloadUrl: `https://example.com/downloads/${purchase.product.fileType}/${productId}`,
        fileName: `${purchase.product.title}.${purchase.product.fileType}`,
        fileSize: purchase.product.fileSize
      }
    };
  },

  // Get product categories
  async getCategories() {
    await delay(300);
    
    const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
    
    return {
      success: true,
      data: categories
    };
  },

  // Search products
  async searchProducts(query) {
    await delay(500);
    
    const searchTerm = query.toLowerCase();
    const results = MOCK_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    return {
      success: true,
      data: results
    };
  }
};
