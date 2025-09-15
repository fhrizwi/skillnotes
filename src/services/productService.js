// Product management service for digital marketplace
import productsData from '../data/products.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Use products from JSON file
const MOCK_PRODUCTS = productsData;

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
      p.description.toLowerCase().includes(searchTerm)
    );
    
    return {
      success: true,
      data: results
    };
  }
};
