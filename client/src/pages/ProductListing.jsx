import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import { features } from '../data/products';
import './ProductListing.css';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeTags, setActiveTags] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  useEffect(() => {
    setSearchQuery(urlSearch);
    setSelectedCategory(urlCategory);
  }, [urlSearch, urlCategory]);

  useEffect(() => {
    const tags = [
      ...(selectedCategory ? [selectedCategory] : []),
      ...selectedBrands,
      ...selectedFeatures,
    ];
    setActiveTags(tags);
  }, [selectedCategory, selectedBrands, selectedFeatures]);

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
    if (tag === selectedCategory) {
      setSelectedCategory('');
      return;
    }
    if (selectedBrands.includes(tag)) {
      setSelectedBrands((prev) => prev.filter((brand) => brand !== tag));
      return;
    }
    if (selectedFeatures.includes(tag)) {
      setSelectedFeatures((prev) => prev.filter((feature) => feature !== tag));
    }
  };

  const categoryOptions = [...new Set(products.map((product) => product.category).filter(Boolean))];
  const brandOptions = [...new Set(products.map((product) => product.brand).filter(Boolean))];
  const visibleCategories = showAllCategories ? categoryOptions : categoryOptions.slice(0, 4);

  const matchesFeature = (product, feature) => {
    const searchText = `${product.name} ${product.description || ''}`.toLowerCase();
    const featureToken = feature.toLowerCase().split(' ')[0];
    return searchText.includes(featureToken);
  };

  const filteredProducts = products.filter(product => {
     const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
     const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
     const matchesBrand = selectedBrands.length ? selectedBrands.includes(product.brand) : true;
     const featureChecks = selectedFeatures.length
      ? selectedFeatures.every((feature) => matchesFeature(product, feature))
      : true;

     return matchesSearch && matchesCategory && matchesBrand && featureChecks;
  });

  return (
    <div className="listing">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="listing__breadcrumb">
          <Link to="/">Home</Link>
          <span className="listing__breadcrumb-sep">&gt;</span>
          <span>Products</span>
          {selectedCategory && (
            <>
              <span className="listing__breadcrumb-sep">&gt;</span>
              <span className="listing__breadcrumb-active">{selectedCategory}</span>
            </>
          )}
        </nav>

        <div className="listing__layout">
          {/* Sidebar */}
          <aside className={`listing__sidebar ${showMobileSidebar ? 'listing__sidebar--show' : ''}`}>
            <div className="listing__sidebar-header-mobile">
              <h3>Filters</h3>
              <button onClick={() => setShowMobileSidebar(false)} className="listing__sidebar-close">×</button>
            </div>
            
            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Category</h3>
              </div>
              <button 
                className={`listing__filter-link listing__filter-link--button ${!selectedCategory ? 'listing__filter-link--active' : ''}`}
                onClick={() => { setSelectedCategory(''); setShowMobileSidebar(false); }}
              >
                All Categories
              </button>
              {categoryOptions.map(category => (
                <button
                  type="button"
                  key={category}
                  className={`listing__filter-link listing__filter-link--button ${selectedCategory === category ? 'listing__filter-link--active' : ''}`}
                  onClick={() => { setSelectedCategory(category); setShowMobileSidebar(false); }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Brands</h3>
              </div>
              {brandOptions.map(b => (
                <label key={b} className="listing__checkbox">
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                  {b}
                </label>
              ))}
            </div>

            <div className="listing__filter-group">
              <div className="listing__filter-header">
                <h3>Features</h3>
              </div>
              {['Metallic','Plastic','Leather','Cotton'].map(f => (
                <label key={f} className="listing__checkbox">
                  <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={() => toggleFeature(f)} />
                  {f}
                </label>
              ))}
            </div>
            
            <button className="listing__apply-btn-mobile" onClick={() => setShowMobileSidebar(false)}>Apply Filters</button>
          </aside>

          {/* Main content */}
          <main className="listing__main">
            {/* Top bar */}
            <div className="listing__topbar">
              <div className="listing__search-mobile-row">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="listing__search-input"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="listing__filter-toggle-btn" onClick={() => setShowMobileSidebar(true)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Filter
                </button>
              </div>
              
              <div className="listing__topbar-info">
                <p className="listing__count">{filteredProducts.length} items found</p>
                <div className="listing__view-toggle">
                  <button className={`listing__view-btn ${viewMode === 'grid' ? 'listing__view-btn--active' : ''}`} onClick={() => setViewMode('grid')}>Grid</button>
                  <button className={`listing__view-btn ${viewMode === 'list' ? 'listing__view-btn--active' : ''}`} onClick={() => setViewMode('list')}>List</button>
                </div>
              </div>
            </div>

            {/* Active tags */}
            {activeTags.length > 0 && (
              <div className="listing__tags">
                {activeTags.map(tag => (
                  <span key={tag} className="listing__tag">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="listing__tag-remove">×</button>
                  </span>
                ))}
                <button className="listing__tags-clear" onClick={() => { setSelectedCategory(''); setSelectedBrands([]); setSelectedFeatures([]); }}>Clear all</button>
              </div>
            )}

            {/* Products */}
            <div className={viewMode === 'grid' ? 'listing__grid' : 'listing__list'}>
              {loading ? <p>Loading products...</p> : 
                filteredProducts.length > 0 ? 
                  filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} mode={viewMode} />
                  )) : <p className="listing__empty">No products found matching your filters.</p>
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
