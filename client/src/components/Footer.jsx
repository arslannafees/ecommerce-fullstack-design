import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../api/products';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeNewsletter(email);
      alert('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      alert('Subscription failed.');
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter */}
      <section className="footer__newsletter" id="newsletter-section">
        <h3 className="footer__newsletter-title">Subscribe on our newsletter</h3>
        <p className="footer__newsletter-desc">Get daily news on upcoming offers from many suppliers all over the world</p>
        <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
          <div className="footer__newsletter-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input 
              type="email" 
              placeholder="Email" 
              className="footer__newsletter-input" 
              id="newsletter-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="footer__newsletter-btn" id="newsletter-subscribe-btn">Subscribe</button>
        </form>
      </section>

      {/* Footer links */}
      <div className="footer__main">
        <div className="container footer__main-inner">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__brand-logo">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#127FFF"/>
                <path d="M12 14h16v3H12zM12 20h10v3H12zM12 26h14v3H12z" fill="white"/>
              </svg>
              <span>Brand</span>
            </Link>
            <p className="footer__brand-desc">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__links-group">
            <h4>About</h4>
            <a href="#">About Us</a>
            <a href="#">Find store</a>
            <a href="#">Categories</a>
            <a href="#">Blogs</a>
          </div>
          <div className="footer__links-group">
            <h4>Partnership</h4>
            <a href="#">About Us</a>
            <a href="#">Find store</a>
            <a href="#">Categories</a>
            <a href="#">Blogs</a>
          </div>
          <div className="footer__links-group">
            <h4>Information</h4>
            <a href="#">Help Center</a>
            <a href="#">Money Refund</a>
            <a href="#">Shipping</a>
            <a href="#">Contact us</a>
          </div>
          <div className="footer__links-group">
            <h4>For users</h4>
            <a href="#">Login</a>
            <a href="#">Register</a>
            <a href="#">Settings</a>
            <a href="#">My Orders</a>
          </div>
          <div className="footer__links-group footer__app-group">
            <h4>Get app</h4>
            <a href="#" className="footer__app-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
            </a>
            <a href="#" className="footer__app-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© 2026 Ecommerce.</span>
          <span className="footer__lang">
            <span className="header__flag">🇺🇸</span>
            English
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
