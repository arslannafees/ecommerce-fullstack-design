import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allCategoryOpen, setAllCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  const handleCategoryClick = (category) => {
    setAllCategoryOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <header className="header">
      {/* Top Header Bar */}
      <div className="header__top">
        <div className="container header__top-inner">
          {/* Mobile hamburger */}
          <button
            className="header__hamburger"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <Link to="/" className="header__logo" id="header-logo">
            <div className="header__logo-icon">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#127FFF"/>
                <path d="M12 14h16v3H12zM12 20h10v3H12zM12 26h14v3H12z" fill="white"/>
              </svg>
            </div>
            <span className="header__logo-text">Brand</span>
          </Link>

          {/* Search Bar — Desktop */}
          <form className="header__search" id="header-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            <select className="header__search-category" id="search-category">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
            </select>
            <button type="submit" className="header__search-btn" id="search-button">Search</button>
          </form>

          {/* Icons — Desktop */}
          <nav className="header__icons" id="header-icons">
            {isAdmin && (
              <Link to="/admin" className="header__icon-link" id="nav-admin">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                 </svg>
                 <span>Admin</span>
              </Link>
            )}
            
            {currentUser ? (
              <button onClick={() => logout()} className="header__icon-link" style={{ background:'transparent', border:'none', cursor:'pointer' }} id="nav-logout">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="header__icon-link" id="nav-profile">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Profile</span>
              </Link>
            )}
            <Link to="/" className="header__icon-link" id="nav-message">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Message</span>
            </Link>
            <Link to="/orders" className="header__icon-link" id="nav-orders">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>Orders</span>
            </Link>
            <Link to="/cart" className="header__icon-link" id="nav-cart">
              <div style={{ position: 'relative' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -10, background: '#127FFF', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' }}>{cartCount}</span>}
              </div>
              <span>My cart</span>
            </Link>
          </nav>

          {/* Mobile icons */}
          <div className="header__mobile-icons">
            {isAdmin && (
               <Link to="/admin" className="header__mobile-icon" id="mobile-admin">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                 </svg>
               </Link>
            )}
            <Link to="/orders" className="header__mobile-icon" id="mobile-orders">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </Link>
            <Link to="/cart" className="header__mobile-icon" id="mobile-cart" style={{ position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#127FFF', color: 'white', borderRadius: '50%', padding: '2px 5px', fontSize: '10px' }}>{cartCount}</span>}
            </Link>
            {currentUser ? (
               <button onClick={() => logout()} className="header__mobile-icon" style={{ background:'transparent', border:'none' }} id="mobile-logout">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                 </svg>
               </button>
            ) : (
               <Link to="/login" className="header__mobile-icon" id="mobile-profile">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                   <circle cx="12" cy="7" r="4"/>
                 </svg>
               </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="header__mobile-search">
        <div className="container">
          <div className="header__mobile-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search" className="header__mobile-search-input" id="mobile-search-input" />
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar — Desktop */}
      <div className="header__nav">
        <div className="container header__nav-inner">
          <div className="header__nav-left">
            <div className="header__nav-all-wrap">
            <button
              className="header__nav-link header__nav-all"
              id="nav-all-category"
              onClick={() => setAllCategoryOpen((prev) => !prev)}
              aria-expanded={allCategoryOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              All category
            </button>
            {allCategoryOpen && (
              <div className="header__category-dropdown" id="all-category-menu">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="header__category-item"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            </div>
            <Link to="/products?offer=hot" className="header__nav-link">Hot offers</Link>
            <Link to="/products?promo=gift-boxes" className="header__nav-link">Gift boxes</Link>
            <Link to="/products?type=project" className="header__nav-link">Projects</Link>
            <Link to="/products" className="header__nav-link">Menu item</Link>
            <Link to="/" className="header__nav-link header__nav-help">
              Help
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </Link>
          </div>
          <div className="header__nav-right">
            <span className="header__nav-locale">English, USD</span>
            <span className="header__nav-locale header__nav-ship">
              Ship to
              <span className="header__flag">🇩🇪</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Categories */}
      <div className="header__mobile-categories">
        <div className="header__mobile-categories-scroll">
          <button className="header__cat-pill header__cat-pill--active">All category</button>
          <button className="header__cat-pill">Gadgets</button>
          <button className="header__cat-pill">Clothes</button>
          <button className="header__cat-pill">Accessories</button>
          <button className="header__cat-pill">Electronics</button>
          <button className="header__cat-pill">Home</button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <div className="header__mobile-menu" id="mobile-menu">
          <div className="header__mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="header__mobile-menu-content">
            <div className="header__mobile-menu-header">
              <span>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <nav className="header__mobile-menu-nav">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>My Cart</Link>
              <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
              <a href="#">Hot offers</a>
              <a href="#">Gift boxes</a>
              <a href="#">Projects</a>
              <a href="#">Help</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
