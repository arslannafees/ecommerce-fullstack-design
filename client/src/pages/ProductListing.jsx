import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import { brands, features } from '../data/products';
import './ProductListing.css';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple', 'Pocco']);
  const [selectedFeatures, setSelectedFeatures] = useState(['Metallic']);
  const [activeTags, setActiveTags] = useState(['Samsung', 'Apple', 'Poco', 'Metallic', '4 star', '3 star']);
  
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
  };
  const removeTag = (tag) => {
    setActiveTags(prev => prev.filter(t => t !== tag));
  };

  const filteredProducts = products.filter(product => {
     if (searchQuery) {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
     }
     return true;
  });

  return (
    <div className="listing">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="listing__breadcrumb" id="listing-breadcrumb">
          <Link to="/">Home</Link>
          <span className="listing__breadcrumb-sep">&gt;</span>
          <span>Clothings</span>
          <span className="listing__breadcrumb-sep">&gt;</span>
          <span>Men's wear</span>
          <span className="listing__breadcrumb-sep">&gt;</span>
          <span className="listing__breadcrumb-active">Summer clothing</span>
        </nav>

        <div className="listing__layout">
          {/* Sidebar */}
          <aside className="listing__sidebar" id="listing-sidebar">
            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Category</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              </div>
              {['Mobile accessory','Electronics','Smartphones','Modern tech'].map(c => (
                <a href="#" key={c} className="listing__filter-link">{c}</a>
              ))}
              <a href="#" className="listing__filter-see-all">See all</a>
            </div>

            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Brands</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              </div>
              {brands.map(b => (
                <label key={b} className="listing__checkbox">
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                  <span className="listing__checkbox-custom"></span>
                  {b}
                </label>
              ))}
              <a href="#" className="listing__filter-see-all">See all</a>
            </div>

            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Features</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              </div>
              {features.map(f => (
                <label key={f} className="listing__checkbox">
                  <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={() => toggleFeature(f)} />
                  <span className="listing__checkbox-custom"></span>
                  {f}
                </label>
              ))}
              <a href="#" className="listing__filter-see-all">See all</a>
            </div>

            {['Price range','Condition','Ratings','Manufacturer'].map(section => (
              <div key={section} className="listing__filter-group listing__filter-group--collapsed">
                <div className="listing__filter-header">
                  <h3>{section}</h3>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            ))}
          </aside>

          {/* Main content */}
          <main className="listing__main" id="listing-main">
            {/* Top bar */}
            <div className="listing__topbar">
              <input 
                type="text" 
                placeholder="Search products by name or category..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '300px', marginRight: '10px' }}
              />
              <p className="listing__count">{filteredProducts.length} items in <strong>Mobile accessory</strong></p>
              <div className="listing__topbar-right">
                <label className="listing__verified">
                  <input type="checkbox" />
                  <span className="listing__checkbox-custom"></span>
                  Verified only
                </label>
                <select className="listing__sort" id="listing-sort">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <div className="listing__view-toggle">
                  <button className={`listing__view-btn ${viewMode === 'grid' ? 'listing__view-btn--active' : ''}`} onClick={() => setViewMode('grid')} id="view-grid-btn" aria-label="Grid view">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </button>
                  <button className={`listing__view-btn ${viewMode === 'list' ? 'listing__view-btn--active' : ''}`} onClick={() => setViewMode('list')} id="view-list-btn" aria-label="List view">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Active tags */}
            <div className="listing__tags">
              {activeTags.map(tag => (
                <span key={tag} className="listing__tag">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="listing__tag-remove" aria-label={`Remove ${tag}`}>×</button>
                </span>
              ))}
              <button className="listing__tags-clear" onClick={() => setActiveTags([])}>Clear all filter</button>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'listing__grid' : 'listing__list'}>
              {loading ? <p>Loading products...</p> : 
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} mode={viewMode} />
                ))
              }
            </div>

            {/* Pagination */}
            <div className="listing__pagination" id="listing-pagination">
              <div className="listing__pagination-left">
                <select className="listing__page-size">
                  <option>Show 10</option>
                  <option>Show 20</option>
                  <option>Show 50</option>
                </select>
              </div>
              <div className="listing__pagination-right">
                <button className="listing__page-btn" disabled>&lt;</button>
                <button className="listing__page-btn listing__page-btn--active">1</button>
                <button className="listing__page-btn">2</button>
                <button className="listing__page-btn">3</button>
                <button className="listing__page-btn">&gt;</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
