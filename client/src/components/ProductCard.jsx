import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product, mode = 'grid' }) {
  const { addToCart } = useCart();
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= Math.floor(rating) ? 'star--filled' : i - 0.5 <= rating ? 'star--half' : ''}`}>★</span>
      );
    }
    return stars;
  };

  if (mode === 'list') {
    return (
      <div className="product-card product-card--list" id={`product-card-${product.id}`}>
        <Link to={`/products/${product.id}`} className="product-card__image-wrap product-card__image-wrap--list">
          <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        </Link>
        <div className="product-card__info product-card__info--list">
          <Link to={`/products/${product.id}`} className="product-card__name--list">{product.name}</Link>
          <div className="product-card__price-row">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="product-card__old-price">${product.oldPrice.toFixed(2)}</span>}
          </div>
          <div className="product-card__rating">
            <div className="product-card__stars">{renderStars(product.rating)}</div>
            <span className="product-card__rating-num">{product.ratingCount}</span>
            <span className="product-card__dot">·</span>
            <span className="product-card__orders">{product.orders} orders</span>
            <span className="product-card__dot">·</span>
            {product.freeShipping && <span className="product-card__shipping">Free Shipping</span>}
          </div>
          <p className="product-card__desc">{product.description}</p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Link to={`/products/${product.id}`} className="product-card__view-link">View details</Link>
            <button onClick={() => addToCart(product)} style={{ padding: '0.5rem', background: '#127FFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add to Cart</button>
          </div>
        </div>
        <button className="product-card__wishlist" aria-label="Add to wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      <Link to={`/products/${product.id}`} className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
      </Link>
      <div className="product-card__info">
        <div className="product-card__price-row">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="product-card__old-price">${product.oldPrice.toFixed(2)}</span>}
        </div>
        <div className="product-card__rating">
          <div className="product-card__stars">{renderStars(product.rating)}</div>
          <span className="product-card__rating-num">{product.ratingCount}</span>
        </div>
        <Link to={`/products/${product.id}`} className="product-card__name">{product.name}</Link>
        <button onClick={() => addToCart(product)} style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', background: '#127FFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add to Cart</button>
      </div>
      <button className="product-card__wishlist product-card__wishlist--grid" aria-label="Add to wishlist">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  );
}

export default ProductCard;
