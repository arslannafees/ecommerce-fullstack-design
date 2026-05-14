import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts, sendMessage } from '../api/products';
import DiscountBanner from '../components/DiscountBanner';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Messaging State
  const [showModal, setShowModal] = useState(false);
  const [msgData, setMsgData] = useState({ userName: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);

  useEffect(() => {
    const loadProductAndRelated = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        
        const allProducts = await fetchProducts();
        const related = allProducts.filter(p => p.category === data.category && p.id !== id);
        setRelatedProducts(related.slice(0, 6));
        setYouMayLike(allProducts.filter(p => p.id !== id).sort(() => 0.5 - Math.random()).slice(0, 5));
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProductAndRelated();
  }, [id]);

  if (loading) return <div className="container"><p>Loading product...</p></div>;
  if (!product) return <div className="container"><p>Product not found.</p></div>;

  const basePrice = Number(product.price || 0);
  const pricingTiers = [
    { amount: basePrice, range: '1-100 pcs', min: 1 },
    { amount: Math.max(basePrice * 0.9, 1), range: '100-700 pcs', min: 100 },
    { amount: Math.max(basePrice * 0.78, 1), range: '700+ pcs', min: 700 },
  ];

  let currentTier = pricingTiers[0];
  if (quantity >= 700) {
    currentTier = pricingTiers[2];
  } else if (quantity >= 100) {
    currentTier = pricingTiers[1];
  }
  
  const currentUnitPrice = currentTier.amount;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendMessage({
        productId: product.id,
        productName: product.name,
        ...msgData
      });
      alert('Message sent to supplier successfully!');
      setShowModal(false);
      setMsgData({ userName: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const inlineSpecs = [
    ['Price:', `$${currentUnitPrice.toFixed(2)}`],
    ['Total:', `$${(currentUnitPrice * quantity).toFixed(2)}`],
    ['Type:', product.category || 'General'],
    ['Brand:', product.brand || 'Generic'],
    ['Material:', 'Premium mixed material'],
    ['Design:', 'Modern'],
    ['Customization:', 'Customized logo and design packages'],
    ['Protection:', 'Refund policy'],
    ['Warranty:', '2 years full warranty'],
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={`star ${i <= Math.floor(rating) ? 'star--filled' : ''}`}>★</span>);
    }
    return stars;
  };

  return (
    <div className="detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail__breadcrumb">
          <Link to="/">Home</Link><span>&gt;</span>
          <span>Clothings</span><span>&gt;</span>
          <span>Men's wear</span><span>&gt;</span>
          <span className="detail__breadcrumb-active">Summer clothing</span>
        </nav>

        {/* Product Section */}
        <section className="detail__product" id="product-detail-section">
          <div className="detail__gallery">
            <div className="detail__main-img-wrap">
              <img src={product.image} alt={product.name} className="detail__main-img" />
            </div>
            <div className="detail__thumbs">
              {[...Array(6)].map((_, i) => (
                <button key={i} className={`detail__thumb ${mainImage === i ? 'detail__thumb--active' : ''}`} onClick={() => setMainImage(i)}>
                  <img src={product.image} alt={`Thumbnail ${i+1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="detail__info">
            <span className="detail__stock">✓ In stock</span>
            <h1 className="detail__title">{product.name}</h1>
            <div className="detail__rating-row">
              <div className="detail__stars">{renderStars(product.rating)}</div>
              <span className="detail__rating-num">{product.rating}</span>
              <span className="detail__dot">·</span>
              <span className="detail__reviews">📝 {product.reviews} reviews</span>
              <span className="detail__dot">·</span>
              <span className="detail__sold">🛒 {product.orders} sold</span>
            </div>

            <div className="detail__pricing">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.range} 
                  className={`detail__price-tier ${currentTier.range === tier.range ? 'detail__price-tier--active' : ''}`}
                  onClick={() => setQuantity(tier.min)}
                  style={{cursor: 'pointer'}}
                >
                  <span className="detail__price-amount">${tier.amount.toFixed(2)}</span>
                  <span className="detail__price-range">{tier.range}</span>
                </div>
              ))}
            </div>

            <div className="detail__quantity-selector" style={{margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem'}}>
               <label style={{fontWeight: '500'}}>Quantity:</label>
               <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{width: '80px', padding: '0.5rem', border: '1px solid #e3e8ee', borderRadius: '4px'}}
               />
            </div>

            <table className="detail__specs-inline">
              <tbody>
                {inlineSpecs.map(([label, value]) => (
                  <tr key={label}><td>{label}</td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detail__supplier">
            <div className="detail__supplier-header">
              <div className="detail__supplier-avatar">R</div>
              <div>
                <p className="detail__supplier-label">Supplier</p>
                <p className="detail__supplier-name">Guanjoi Trading LLC</p>
              </div>
            </div>
            <div className="detail__supplier-details">
              <p>🇩🇪 Germany, Berlin</p>
              <p>✅ Verified Seller</p>
              <p>🌐 Worldwide shipping</p>
            </div>
            <button className="detail__supplier-btn detail__supplier-btn--primary" onClick={() => addToCart({...product, price: currentUnitPrice}, quantity)}>Add to Cart</button>
            <button className="detail__supplier-btn detail__supplier-btn--outline" onClick={() => setShowModal(true)}>Contact Supplier</button>
            <button className="detail__save-btn">♡ Save for later</button>
          </div>
        </section>

        {/* Tabs + You May Like */}
        <div className="detail__bottom-layout">
          <div className="detail__tabs-section">
            <div className="detail__tabs">
              {['Description','Reviews','Shipping','About seller'].map(tab => (
                <button key={tab} className={`detail__tab ${activeTab === tab.toLowerCase().replace(' ','') ? 'detail__tab--active' : ''}`} onClick={() => setActiveTab(tab.toLowerCase().replace(' ',''))}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="detail__tab-content">
              <p className="detail__description">
                {product.description || 'No detailed description available for this product yet.'}
              </p>
              <p className="detail__description">
                Bulk orders include discounted pricing tiers, tracked shipping, and supplier-level support for repeat purchases.
              </p>
            </div>
          </div>

          <aside className="detail__you-may-like">
            <h3>You may like</h3>
            {youMayLike.map(item => (
              <Link to={`/products/${item.id}`} key={item.id} className="detail__yml-item">
                <img src={item.image} alt={item.name} className="detail__yml-img" />
                <div>
                  <p className="detail__yml-name">{item.name}</p>
                  <p className="detail__yml-price">${item.price}</p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </div>

      {/* Messaging Modal - MOVED TO TOP LEVEL TO AVOID CLIPPING */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Contact Supplier</h3>
            <p>Inquiry for: <strong>{product.name}</strong></p>
            <form onSubmit={handleSendMessage}>
              <input type="text" placeholder="Your Name" value={msgData.userName} onChange={(e) => setMsgData({...msgData, userName: e.target.value})} required />
              <input type="email" placeholder="Your Email" value={msgData.email} onChange={(e) => setMsgData({...msgData, email: e.target.value})} required />
              <textarea placeholder="Your Message..." rows="4" value={msgData.message} onChange={(e) => setMsgData({...msgData, message: e.target.value})} required></textarea>
              <div className="modal-actions">
                <button type="submit" className="btn-send" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DiscountBanner />
    </div>
  );
}

export default ProductDetails;
