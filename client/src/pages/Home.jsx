import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Just slice out first few as featured for Home page
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" id="hero-section">
        <div className="container hero__inner">
          <aside className="hero__sidebar">
            <ul className="hero__categories">
              {["Automobiles","Clothes and wear","Home interiors","Computer and tech","Tools, equipments","Sports and outdoor","Animal and pets","Machinery tools","More category"].map((c,i) => (
                <li key={i}><a href="#" className="hero__cat-link">{c}</a></li>
              ))}
            </ul>
          </aside>
          <div className="hero__banner">
            <div className="hero__banner-content">
              <p className="hero__banner-subtitle">Latest trending</p>
              <h1 className="hero__banner-title">Electronic items</h1>
              <Link to="/products" className="hero__banner-btn">Learn more</Link>
            </div>
            <div className="hero__banner-image">
              <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=340&fit=crop" alt="Electronics" />
            </div>
          </div>
          <aside className="hero__right">
            <div className="hero__user-box">
              <p className="hero__user-text">Hi, user<br/>let's get started</p>
              <Link to="/" className="hero__user-btn hero__user-btn--primary">Join now</Link>
              <Link to="/" className="hero__user-btn hero__user-btn--outline">Log in</Link>
            </div>
            <div className="hero__promo hero__promo--orange">Get US $10 off with a new supplier</div>
            <div className="hero__promo hero__promo--teal">Send quotes with supplier preferences</div>
          </aside>
        </div>
      </section>

      {/* DEALS / FEATURED */}
      <section className="deals" id="deals-section">
        <div className="container deals__inner">
          <div className="deals__info">
            <h2 className="deals__title">Featured Products</h2>
            <p className="deals__subtitle">Explore our top picks</p>
          </div>
          <div className="deals__products">
            {loading ? <p>Loading featured products...</p> : featuredProducts.map(p => (
              <div key={p.id} className="deals__product">
                <Link to={`/products/${p.id}`} className="deals__product-img-wrap"><img src={p.image} alt={p.name} loading="lazy" /></Link>
                <p className="deals__product-name">{p.name}</p>
                <span className="deals__product-badge">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME AND OUTDOOR */}
      <section className="category-section" id="home-outdoor-section">
        <div className="container category-section__inner">
          <div className="category-section__banner" style={{background:'linear-gradient(135deg,#E3F0FF,#D1E8FF)'}}>
            <h2 className="category-section__banner-title">Home and outdoor</h2>
            <Link to="/products" className="category-section__banner-btn">Source now</Link>
          </div>
          <div className="category-section__grid">
            {!loading && featuredProducts.map(p => (
              <div key={p.id} className="category-section__item">
                <div className="category-section__item-info">
                  <p className="category-section__item-name">{p.name}</p>
                  <p className="category-section__item-price">From<br/>USD {p.price}</p>
                </div>
                <img src={p.image} alt={p.name} className="category-section__item-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSUMER ELECTRONICS */}
      <section className="category-section" id="electronics-section">
        <div className="container category-section__inner">
          <div className="category-section__banner" style={{background:'linear-gradient(135deg,#FFF3E0,#FFE0B2)'}}>
            <h2 className="category-section__banner-title">Consumer electronics and gadgets</h2>
            <Link to="/products" className="category-section__banner-btn">Source now</Link>
          </div>
          <div className="category-section__grid">
            {!loading && featuredProducts.map(p => (
              <div key={p.id} className="category-section__item">
                <div className="category-section__item-info">
                  <p className="category-section__item-name">{p.name}</p>
                  <p className="category-section__item-price">From<br/>USD {p.price}</p>
                </div>
                <img src={p.image} alt={p.name} className="category-section__item-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLIER REQUEST */}
      <section className="supplier-request" id="supplier-request-section">
        <div className="container supplier-request__inner">
          <div className="supplier-request__left">
            <h2 className="supplier-request__title">An easy way to send requests to all suppliers</h2>
            <p className="supplier-request__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="supplier-request__form-wrap">
            <h3 className="supplier-request__form-title">Send quote to suppliers</h3>
            <form className="supplier-request__form" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="What item you need?" className="supplier-request__input" />
              <textarea placeholder="Type more details" className="supplier-request__textarea" rows="3"></textarea>
              <div className="supplier-request__row">
                <input type="number" placeholder="Quantity" className="supplier-request__input supplier-request__input--sm" />
                <select className="supplier-request__select"><option>Pcs</option></select>
              </div>
              <button type="submit" className="supplier-request__btn">Send inquiry</button>
            </form>
          </div>
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="recommended" id="recommended-section">
        <div className="container">
          <h2 className="recommended__title">Recommended items</h2>
          <div className="recommended__grid">
            {!loading && featuredProducts.map(p => (
              <Link to={`/products/${p.id}`} key={p.id} className="recommended__card">
                <div className="recommended__card-img-wrap">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="recommended__card-info">
                  <span className="recommended__card-price">${p.price.toFixed(2)}</span>
                  <p className="recommended__card-name">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services-section">
        <div className="container">
          <h2 className="services__title">Our extra services</h2>
          <div className="services__grid">
            {[
              {title:"Source from Industry Hubs",bg:"#E3F0FF",color:"#127FFF"},
              {title:"Customize Your Products",bg:"#FFF3E0",color:"#FF9017"},
              {title:"Fast, reliable shipping by ocean or air",bg:"#E8F5E9",color:"#00B517"},
              {title:"Product monitoring and inspection",bg:"#F3E5F5",color:"#9C27B0"},
            ].map((s,i) => (
              <div key={i} className="services__card">
                <div className="services__card-img" style={{background:s.bg}}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <p className="services__card-title">{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="regions" id="regions-section">
        <div className="container">
          <h2 className="regions__title">Suppliers by region</h2>
          <div className="regions__grid">
            {[
              {flag:"🇦🇪",country:"Arabic Emirates",domain:"shopname.ae"},
              {flag:"🇦🇺",country:"Australia",domain:"shopname.ae"},
              {flag:"🇺🇸",country:"United States",domain:"shopname.ae"},
              {flag:"🇷🇺",country:"Russia",domain:"shopname.ru"},
              {flag:"🇮🇹",country:"Italy",domain:"shopname.it"},
              {flag:"🇩🇰",country:"Denmark",domain:"denmark.com.dk"},
              {flag:"🇫🇷",country:"France",domain:"shopname.com.fr"},
              {flag:"🇦🇪",country:"Arabic Emirates",domain:"shopname.ae"},
              {flag:"🇨🇳",country:"China",domain:"shopname.ae"},
              {flag:"🇬🇧",country:"Great Britain",domain:"shopname.co.uk"},
            ].map((r,i) => (
              <a href="#" key={i} className="regions__item">
                <span className="regions__flag">{r.flag}</span>
                <div><p className="regions__country">{r.country}</p><p className="regions__domain">{r.domain}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
