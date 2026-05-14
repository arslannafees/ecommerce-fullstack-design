import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { savedForLater } from '../data/products';
import { checkout } from '../api/products';
import DiscountBanner from '../components/DiscountBanner';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems: items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [saved, setSaved] = useState(savedForLater);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 0 ? 60.00 : 0;
  const tax = subtotal > 0 ? 14.00 : 0;
  const total = subtotal > 0 ? subtotal - discount + tax : 0;

  const updateQty = (id, qty) => {
    updateQuantity(id, parseInt(qty));
  };
  const removeItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const checkoutItems = items.map(i => ({ 
        id: i.id, 
        quantity: i.quantity,
        name: i.name,
        price: i.price,
        image: i.image
      }));
      await checkout(checkoutItems);
      alert('Checkout successful! Stock has been updated.');
      clearCart();
    } catch (err) {
      alert(err.response?.data?.error || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveForLater = (id) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setSaved(prev => [...prev, { id: item.id, name: item.name, price: item.price, image: item.image }]);
      removeItem(id);
    }
  };
  const moveToCart = (id) => {
    const item = saved.find(i => i.id === id);
    if (item) {
      // Need to import useCart again above or just call addToCart. For now mock behavior.
      // In a real app we would call addToCart(item);
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title" id="cart-title">My cart ({items.length})</h1>

        <div className="cart-page__layout">
          {/* Cart Items */}
          <div className="cart-page__items">
            {items.map(item => (
              <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                <Link to={`/products/${item.id}`} className="cart-item__img-wrap">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                </Link>
                <div className="cart-item__details">
                  <div className="cart-item__top">
                    <div className="cart-item__info">
                      <Link to={`/products/${item.id}`} className="cart-item__name">{item.name}</Link>
                      <p className="cart-item__meta">Size: {item.size}, Color: {item.color}, Material: {item.material}</p>
                      <p className="cart-item__seller">Seller: {item.seller}</p>
                    </div>
                    <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="cart-item__bottom">
                    <div className="cart-item__actions-desktop">
                      <button className="cart-item__action cart-item__action--remove" onClick={() => removeItem(item.id)}>Remove</button>
                      <button className="cart-item__action cart-item__action--save" onClick={() => saveForLater(item.id)}>Save for later</button>
                    </div>
                    <select className="cart-item__qty" value={item.quantity} onChange={(e) => updateQty(item.id, e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>Qty: {n}</option>
                      ))}
                    </select>
                  </div>
                  {/* Mobile qty controls */}
                  <div className="cart-item__mobile-qty">
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}>−</button>
                    <span className="cart-item__qty-num">{item.quantity}</span>
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    <span className="cart-item__mobile-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button className="cart-item__mobile-menu" aria-label="More options">⋮</button>
              </div>
            ))}

            <div className="cart-page__actions-bar">
              <Link to="/products" className="cart-page__back-btn" id="back-to-shop-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Back to shop
              </Link>
              <button className="cart-page__remove-all" onClick={() => clearCart()}>Remove all</button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="cart-page__sidebar" id="cart-sidebar">
            <div className="cart-page__coupon">
              <p className="cart-page__coupon-label">Have a coupon?</p>
              <div className="cart-page__coupon-input-wrap">
                <input type="text" placeholder="Add coupon" className="cart-page__coupon-input" value={coupon} onChange={e => setCoupon(e.target.value)} id="coupon-input" />
                <button className="cart-page__coupon-btn" id="apply-coupon-btn">Apply</button>
              </div>
            </div>

            <div className="cart-page__summary">
              <div className="cart-page__summary-row">
                <span>Subtotal:</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--discount">
                <span>Discount:</span><span className="cart-page__discount">- ${discount.toFixed(2)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--tax">
                <span>Tax:</span><span className="cart-page__tax">+ ${tax.toFixed(2)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-total">
                <span>Total:</span><span>${total.toFixed(2)}</span>
              </div>
              <button className="cart-page__checkout-btn" id="checkout-btn" onClick={handleCheckout} disabled={loading || items.length === 0}>
                {loading ? 'Processing...' : 'Checkout'}
              </button>
              <div className="cart-page__payment-icons">
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" width="40" />
                <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" width="40" />
                <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" width="40" />
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" width="40" />
                <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" width="40" />
              </div>
            </div>

            {/* Mobile summary */}
            <div className="cart-page__mobile-summary">
              <div className="cart-page__mobile-summary-row"><span>Items ({items.length}):</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="cart-page__mobile-summary-row"><span>Shipping:</span><span>$10.00</span></div>
              <div className="cart-page__mobile-summary-row"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
              <div className="cart-page__mobile-summary-row cart-page__mobile-total"><span>Total:</span><span>${total.toFixed(2)}</span></div>
              <button className="cart-page__mobile-checkout-btn" onClick={handleCheckout} disabled={loading || items.length === 0}>
                {loading ? 'Processing...' : `Checkout (${items.length} items)`}
              </button>
            </div>
          </aside>
        </div>

        {/* Trust badges */}
        <div className="cart-page__trust" id="trust-badges">
          <div className="cart-page__trust-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div><p className="cart-page__trust-title">Secure payment</p><p className="cart-page__trust-desc">Have you ever finally just</p></div>
          </div>
          <div className="cart-page__trust-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <div><p className="cart-page__trust-title">Customer support</p><p className="cart-page__trust-desc">Have you ever finally just</p></div>
          </div>
          <div className="cart-page__trust-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <div><p className="cart-page__trust-title">Free delivery</p><p className="cart-page__trust-desc">Have you ever finally just</p></div>
          </div>
        </div>

        {/* Saved for later */}
        {saved.length > 0 && (
          <section className="cart-page__saved" id="saved-for-later">
            <h2 className="cart-page__saved-title">Saved for later</h2>
            <div className="cart-page__saved-grid">
              {saved.map(item => (
                <div key={item.id} className="saved-card">
                  <div className="saved-card__img-wrap">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="saved-card__info">
                    <span className="saved-card__price">${item.price.toFixed(2)}</span>
                    <p className="saved-card__name">{item.name}</p>
                    <button className="saved-card__btn" onClick={() => moveToCart(item.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                      Move to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <DiscountBanner />
    </div>
  );
}

export default Cart;
