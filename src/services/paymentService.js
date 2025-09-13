// Payment service for digital marketplace
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock payment methods
const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  UPI: 'upi',
  CARD: 'card'
};

export const paymentService = {
  // Initialize payment
  async initializePayment(productId, amount, currency = 'INR', paymentMethod = 'razorpay') {
    await delay(1500);
    
    // Mock payment initialization
    const paymentData = {
      id: `pay_${Date.now()}`,
      productId: productId,
      amount: amount,
      currency: currency,
      paymentMethod: paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Store payment data in localStorage (in real app, this would be server-side)
    localStorage.setItem(`payment_${paymentData.id}`, JSON.stringify(paymentData));
    
    return {
      success: true,
      data: {
        paymentId: paymentData.id,
        amount: amount,
        currency: currency,
        // Mock Razorpay order data
        razorpayOrderId: `order_${Date.now()}`,
        razorpayKey: 'rzp_test_1234567890', // Mock key
        // Mock Stripe data
        stripeClientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        // UPI data
        upiId: 'merchant@paytm',
        upiMerchantId: 'MERCHANT123'
      }
    };
  },

  // Verify payment
  async verifyPayment(paymentId, paymentData) {
    await delay(2000);
    
    // Mock payment verification
    const storedPayment = JSON.parse(localStorage.getItem(`payment_${paymentId}`) || '{}');
    
    if (!storedPayment.id) {
      throw new Error('Payment not found');
    }
    
    // Mock verification logic (in real app, verify with payment gateway)
    const isVerified = Math.random() > 0.1; // 90% success rate for demo
    
    if (isVerified) {
      storedPayment.status = 'completed';
      storedPayment.verifiedAt = new Date().toISOString();
      storedPayment.transactionId = `txn_${Date.now()}`;
      
      localStorage.setItem(`payment_${paymentId}`, JSON.stringify(storedPayment));
      
      return {
        success: true,
        data: {
          paymentId: paymentId,
          status: 'completed',
          transactionId: storedPayment.transactionId,
          amount: storedPayment.amount,
          currency: storedPayment.currency
        }
      };
    } else {
      storedPayment.status = 'failed';
      storedPayment.failedAt = new Date().toISOString();
      
      localStorage.setItem(`payment_${paymentId}`, JSON.stringify(storedPayment));
      
      throw new Error('Payment verification failed');
    }
  },

  // Get payment methods
  async getPaymentMethods() {
    await delay(300);
    
    return {
      success: true,
      data: [
        {
          id: 'razorpay',
          name: 'Razorpay',
          description: 'Pay with UPI, Cards, Net Banking',
          icon: '💳',
          isActive: true
        },
        {
          id: 'stripe',
          name: 'Stripe',
          description: 'International payment processing',
          icon: '🌍',
          isActive: true
        },
        {
          id: 'upi',
          name: 'UPI',
          description: 'Quick UPI payments',
          icon: '📱',
          isActive: true
        },
        {
          id: 'card',
          name: 'Credit/Debit Card',
          description: 'Direct card payments',
          icon: '💎',
          isActive: true
        }
      ]
    };
  },

  // Get payment history
  async getPaymentHistory(userId) {
    await delay(800);
    
    // Get all payments from localStorage (in real app, this would be from server)
    const payments = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('payment_')) {
        const payment = JSON.parse(localStorage.getItem(key));
        if (payment.userId === userId) {
          payments.push(payment);
        }
      }
    }
    
    return {
      success: true,
      data: payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  },

  // Refund payment (mock)
  async refundPayment(paymentId, reason) {
    await delay(2000);
    
    const storedPayment = JSON.parse(localStorage.getItem(`payment_${paymentId}`) || '{}');
    
    if (!storedPayment.id) {
      throw new Error('Payment not found');
    }
    
    if (storedPayment.status !== 'completed') {
      throw new Error('Payment not completed, cannot refund');
    }
    
    // Mock refund processing
    const refundId = `refund_${Date.now()}`;
    storedPayment.refund = {
      id: refundId,
      amount: storedPayment.amount,
      reason: reason,
      status: 'processed',
      processedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`payment_${paymentId}`, JSON.stringify(storedPayment));
    
    return {
      success: true,
      data: {
        refundId: refundId,
        amount: storedPayment.amount,
        status: 'processed'
      }
    };
  }
};
