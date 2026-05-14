import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, sendInquiry } from '../api/products';
import { categories } from '../data/products';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [inquiry, setInquiry] = useState({ item: '', details: '', quantity: '', unit: 'Pcs' });

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

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    try {
      await sendInquiry(inquiry);
      alert('Your inquiry has been sent to suppliers!');
      setInquiry({ item: '', details: '', quantity: '', unit: 'Pcs' });
    } catch (error) {
      alert('Failed to send inquiry.');
    }
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" id="hero-section">
        <div className="container hero__inner">
          <aside className="hero__sidebar">
            <ul className="hero__categories">
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/products?category=${encodeURIComponent(category)}`} className="hero__cat-link">{category}</Link>
                </li>
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
              <p className="hero__user-text">
                {currentUser ? 'Welcome back!\nBrowse latest deals' : "Hi, user\nlet's get started"}
              </p>
              {currentUser ? (
                <Link to="/products" className="hero__user-btn hero__user-btn--primary">Shop now</Link>
              ) : (
                <>
                  <Link to="/signup" className="hero__user-btn hero__user-btn--primary">Join now</Link>
                  <Link to="/login" className="hero__user-btn hero__user-btn--outline">Log in</Link>
                </>
              )}
            </div>
            <Link to="/products?promo=new-supplier" className="hero__promo hero__promo--orange">Get US $10 off with a new supplier</Link>
            <Link to="/products?promo=supplier-quotes" className="hero__promo hero__promo--teal">Send quotes with supplier preferences</Link>
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
            <form className="supplier-request__form" onSubmit={handleSubmitInquiry}>
              <input 
                type="text" 
                placeholder="What item you need?" 
                className="supplier-request__input" 
                value={inquiry.item}
                onChange={e => setInquiry({...inquiry, item: e.target.value})}
                required
              />
              <textarea 
                placeholder="Type more details" 
                className="supplier-request__textarea" 
                rows="3"
                value={inquiry.details}
                onChange={e => setInquiry({...inquiry, details: e.target.value})}
                required
              ></textarea>
              <div className="supplier-request__row">
                <input 
                  type="number" 
                  placeholder="Quantity" 
                  className="supplier-request__input supplier-request__input--sm" 
                  value={inquiry.quantity}
                  onChange={e => setInquiry({...inquiry, quantity: e.target.value})}
                  required
                />
                <select 
                  className="supplier-request__select"
                  value={inquiry.unit}
                  onChange={e => setInquiry({...inquiry, unit: e.target.value})}
                >
                  <option>Pcs</option>
                  <option>Kg</option>
                  <option>Liters</option>
                </select>
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
              {title:"Source from Industry Hubs",bg:"#E3F0FF",color:"#127FFF",img:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=200&fit=crop"},
              {title:"Customize Your Products",bg:"#FFF3E0",color:"#FF9017",img:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"},
              {title:"Fast, reliable shipping by ocean or air",bg:"#E8F5E9",color:"#00B517",img:"https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=400&h=200&fit=crop"},
              {title:"Product monitoring and inspection",bg:"#F3E5F5",color:"#9C27B0",img:"https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=200&fit=crop"},
            ].map((s,i) => (
              <div key={i} className="services__card">
                <div className="services__card-img-wrap">
                  <img src={s.img} alt={s.title} className="services__card-img" />
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
