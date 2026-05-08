import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { youMayLike, relatedProducts } from '../data/products';
import DiscountBanner from '../components/DiscountBanner';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div className="container"><p>Loading product...</p></div>;
  if (!product) return <div className="container"><p>Product not found.</p></div>;

  const thumbs = [product.image, product.image, product.image, product.image, product.image, product.image];

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
              <img src={thumbs[mainImage]} alt={product.name} className="detail__main-img" />
            </div>
            <div className="detail__thumbs">
              {thumbs.slice(0, 6).map((t, i) => (
                <button key={i} className={`detail__thumb ${mainImage === i ? 'detail__thumb--active' : ''}`} onClick={() => setMainImage(i)}>
                  <img src={t} alt={`Thumbnail ${i+1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="detail__info">
            <span className="detail__stock">✓ In stock</span>
            <h1 className="detail__title">{product.name || "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle"}</h1>
            <div className="detail__rating-row">
              <div className="detail__stars">{renderStars(product.rating)}</div>
              <span className="detail__rating-num">{product.rating}</span>
              <span className="detail__dot">·</span>
              <span className="detail__reviews">📝 {product.reviews} reviews</span>
              <span className="detail__dot">·</span>
              <span className="detail__sold">🛒 {product.orders} sold</span>
            </div>

            <div className="detail__pricing">
              <div className="detail__price-tier detail__price-tier--active">
                <span className="detail__price-amount">${product.price < 100 ? '98.00' : product.price.toFixed(2)}</span>
                <span className="detail__price-range">50-100 pcs</span>
              </div>
              <div className="detail__price-tier">
                <span className="detail__price-amount">$90.00</span>
                <span className="detail__price-range">100-700 pcs</span>
              </div>
              <div className="detail__price-tier">
                <span className="detail__price-amount">$78.00</span>
                <span className="detail__price-range">700+ pcs</span>
              </div>
            </div>

            <table className="detail__specs-inline">
              <tbody>
                <tr><td>Price:</td><td>Negotiable</td></tr>
                <tr><td>Type:</td><td>Classic shoes</td></tr>
                <tr><td>Material:</td><td>Plastic material</td></tr>
                <tr><td>Design:</td><td>Modern nice</td></tr>
                <tr><td>Customization:</td><td>Customized logo and design custom packages</td></tr>
                <tr><td>Protection:</td><td>Refund Policy</td></tr>
                <tr><td>Warranty:</td><td>2 years full warranty</td></tr>
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
            <button className="detail__supplier-btn detail__supplier-btn--primary" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="detail__supplier-btn detail__supplier-btn--outline">Seller's profile</button>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              </p>
              <p className="detail__description">
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <table className="detail__specs-table">
                <tbody>
                  <tr><td>Model</td><td>#8786867</td></tr>
                  <tr><td>Style</td><td>Classic style</td></tr>
                  <tr><td>Certificate</td><td>ISO-898921212</td></tr>
                  <tr><td>Size</td><td>34mm x 450mm x 19mm</td></tr>
                  <tr><td>Memory</td><td>36GB RAM</td></tr>
                </tbody>
              </table>

              <div className="detail__features">
                <p>✓ Some great feature name here</p>
                <p>✓ Lorem ipsum dolor sit amet, consectetur</p>
                <p>✓ Duis aute irure dolor in reprehenderit</p>
                <p>✓ Some great feature name here</p>
              </div>
            </div>
          </div>

          <aside className="detail__you-may-like">
            <h3>You may like</h3>
            {youMayLike.map(item => (
              <Link to={`/products/${item.id}`} key={item.id} className="detail__yml-item">
                <img src={item.image} alt={item.name} className="detail__yml-img" />
                <div>
                  <p className="detail__yml-name">{item.name}</p>
                  <p className="detail__yml-price">{item.priceRange}</p>
                </div>
              </Link>
            ))}
          </aside>
        </div>

        {/* Related Products */}
        <section className="detail__related" id="related-products">
          <h2 className="detail__related-title">Related products</h2>
          <div className="detail__related-grid">
            {relatedProducts.map(item => (
              <Link to={`/products/${item.id}`} key={item.id} className="detail__related-card">
                <div className="detail__related-img-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <p className="detail__related-name">{item.name}</p>
                <p className="detail__related-price">{item.priceRange}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <DiscountBanner />
    </div>
  );
}

export default ProductDetails;
