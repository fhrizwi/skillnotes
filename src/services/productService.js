// Product management service for digital marketplace
const API_BASE_URL = 'https://skillnotes.faizulhaque2002.workers.dev/api/skillnotes';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for products
let cachedProducts = null;

// Mock purchased products (user's purchase history)
const MOCK_PURCHASES = [];

export const productService = {
  // Get all products
  async getProducts(filters = {}) {
    try {
      // Use cached products if available
      if (!cachedProducts) {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        cachedProducts = await response.json();
      }
      
      let filteredProducts = [...cachedProducts];
      
      // Apply filters
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
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
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  // Get single product
  async getProduct(id) {
    try {
      // Ensure we have products loaded
      if (!cachedProducts) {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        cachedProducts = await response.json();
      }
      
      const product = cachedProducts.find(p => p.id === parseInt(id));
      
      if (product) {
        return {
          success: true,
          data: product
        };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Purchase product (mock payment)
  async purchaseProduct(productId, userId) {
    try {
      // Ensure we have products loaded
      if (!cachedProducts) {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        cachedProducts = await response.json();
      }
      
      const product = cachedProducts.find(p => p.id === parseInt(productId));
      
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
    } catch (error) {
      console.error('Error purchasing product:', error);
      throw error;
    }
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
    try {
      // Ensure we have products loaded
      if (!cachedProducts) {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        cachedProducts = await response.json();
      }
      
      const categories = [...new Set(cachedProducts.map(p => p.category))];
      
      return {
        success: true,
        data: categories
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  // Search products
  async searchProducts(query) {
    try {
      // Ensure we have products loaded
      if (!cachedProducts) {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        cachedProducts = await response.json();
      }
      
      const searchTerm = query.toLowerCase();
      const results = cachedProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
      
      return {
        success: true,
        data: results
      };
    } catch (error) {
      console.error('Error searching products:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }
};
