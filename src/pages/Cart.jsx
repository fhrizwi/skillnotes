import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Tag, Check, X } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, getTotalPrice, completePurchase } = useCart();
  const { showSuccess, showError } = useNotification();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  // Sample coupon codes
  const validCoupons = {
    'WELCOME10': { discount: 10, type: 'percentage', description: '10% off on your first order' },
    'SAVE20': { discount: 20, type: 'percentage', description: '20% off on orders above ₹500' },
    'FLAT50': { discount: 50, type: 'fixed', description: '₹50 off on any order' },
    'STUDENT15': { discount: 15, type: 'percentage', description: '15% off for students' }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    showSuccess('Removed from cart');
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const coupon = validCoupons[couponCode.toUpperCase()];
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    // Check minimum order value for certain coupons
    if (couponCode.toUpperCase() === 'SAVE20' && getTotalPrice() < 500) {
      setCouponError('Minimum order value of ₹500 required for this coupon');
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const total = getTotalPrice();
    if (appliedCoupon.type === 'percentage') {
      return (total * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, total);
    }
  };

  const getFinalTotal = () => {
    return getTotalPrice() - calculateDiscount();
  };

  const handleCheckout = () => {
    const result = completePurchase();
    if (result.success) {
      showSuccess('Purchase completed!');
    } else {
      showError('Purchase failed');
    }
  };


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
          </div>

          {/* Empty Cart */}
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
        </div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 sm:p-4 lg:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-4 lg:mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-0">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg">
                        {/* Product Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.banner} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-black dark:text-white text-sm sm:text-base line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          
                          {/* Price and Rating - Same line */}
                          <div className="flex items-center justify-between gap-3 sm:gap-4 mt-2 sm:mt-3">
                            <div className="flex items-center gap-2">
                              <p className="text-base sm:text-lg font-semibold text-black dark:text-white">
                                ₹{item.price}
                              </p>
                              {item.originalPrice && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                  ₹{item.originalPrice}
                                </p>
                              )}
                              {/* Rating */}
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                  <span className="text-xs font-medium text-black dark:text-white">{item.rating}</span>
                                </div>
                              )}
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-1">
                            {/* Preview Button */}
                            <button
                              onClick={() => navigate(`/store/preview/${item.id}`)}
                              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-1"
                              title="Preview item"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Preview
                            </button>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="bg-black dark:bg-white text-white dark:text-black px-2 py-1.5 rounded text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Horizontal Divider */}
                      {index < cartItems.length - 1 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 mx-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-4 lg:mb-6">
                Order Summary
              </h2>

               {/* Coupon Code Section */}
               <div className="mb-4 sm:mb-6">
                 <h3 className="text-sm font-medium text-black dark:text-white mb-2 sm:mb-3">Coupon Code</h3>
                 
                 {!appliedCoupon ? (
                   <div className="space-y-2">
                     <div className="flex flex-col sm:flex-row gap-2">
                       <input
                         type="text"
                         placeholder="Enter coupon code"
                         value={couponCode}
                         onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                         className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black dark:text-white uppercase"
                       />
                       <button
                         onClick={handleApplyCoupon}
                         className="px-3 py-2 sm:px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 justify-center"
                       >
                         <Tag className="w-4 h-4" />
                         Apply
                       </button>
                     </div>
                     {couponError && (
                       <p className="text-red-600 dark:text-red-400 text-xs">{couponError}</p>
                     )}
                   </div>
                 ) : (
                   <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                     <div className="flex items-start sm:items-center justify-between gap-2">
                       <div className="flex items-center gap-2">
                         <Check className="w-4 h-4 text-black dark:text-white flex-shrink-0" />
                         <div>
                           <p className="text-sm font-medium text-black dark:text-white">
                             {appliedCoupon.description}
                           </p>
                           <p className="text-xs text-gray-600 dark:text-gray-400">
                             Discount: ₹{calculateDiscount()}
                           </p>
                         </div>
                       </div>
                       <button
                         onClick={handleRemoveCoupon}
                         className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                       >
                         <X className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 )}
               </div>

               {/* Price Breakdown */}
               <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                 <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                   <span>Digital Notes ({cartItems.length} items)</span>
                   <span>₹{getTotalPrice()}</span>
                 </div>
                 <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                   <span>Instant Download</span>
                   <span>Included</span>
                 </div>
                 {appliedCoupon && (
                   <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                     <span>Discount ({appliedCoupon.discount}{appliedCoupon.type === 'percentage' ? '%' : '₹'})</span>
                     <span>-₹{calculateDiscount()}</span>
                   </div>
                 )}
                 <div className="border-t border-gray-200 dark:border-gray-700 pt-2 sm:pt-3">
                   <div className="flex justify-between text-base sm:text-lg font-semibold text-black dark:text-white">
                     <span>Total</span>
                     <span>₹{getFinalTotal()}</span>
                   </div>
                 </div>
               </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/store"
                className="w-full text-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 py-2 block text-xs sm:text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
