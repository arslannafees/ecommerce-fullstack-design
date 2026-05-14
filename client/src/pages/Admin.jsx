import { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api/products';
import './Admin.css';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        brand: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            if (editingId) {
                await updateProduct(editingId, formData);
                setEditingId(null);
            } else {
                await addProduct(formData);
            }
            setFormData({ name: '', price: '', image: '', category: '', stock: '', brand: '', description: '' });
            loadProducts();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save product');
        }
    }

    function handleEdit(product) {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image || '',
            category: product.category || '',
            stock: product.stock || '',
            brand: product.brand || '',
            description: product.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function handleDelete(id) {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            setError('Failed to delete product');
        }
    }

    return (
        <div className="admin">
            <div className="admin__header">
                <h2 className="admin__title">Inventory Management</h2>
                <span className="admin__count">{products.length} Products</span>
            </div>
            
            {error && <div className="admin__error">{error}</div>}

            <div className="admin__form-card">
                <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="admin__form">
                    <div className="admin__form-group">
                        <label>Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Smart Watch" className="admin__input" />
                    </div>
                    <div className="admin__form-group">
                        <label>Price ($)</label>
                        <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required placeholder="0.00" className="admin__input" />
                    </div>
                    <div className="admin__form-group">
                        <label>Category</label>
                        <input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Electronics" className="admin__input" />
                    </div>
                    <div className="admin__form-group">
                        <label>Brand</label>
                        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Samsung, Apple" className="admin__input" />
                    </div>
                    <div className="admin__form-group">
                        <label>Stock Quantity</label>
                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="0" className="admin__input" />
                    </div>
                    <div className="admin__form-group">
                        <label>Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="admin__input" />
                    </div>
                    <div className="admin__form-group admin__form-group--full">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Tell us about the product..." className="admin__input" style={{ resize: 'vertical' }} />
                    </div>
                    
                    <div className="admin__actions">
                        <button type="submit" className="admin__btn admin__btn--primary">
                            {editingId ? 'Update Product' : 'Add Product'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', price: '', image: '', category: '', stock: '', brand: '', description: '' }); }} className="admin__btn admin__btn--cancel">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin__table-container">
                <table className="admin__table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading inventory...</td></tr> : 
                         products.map(product => (
                            <tr key={product.id}>
                                <td data-label="Product">
                                    <div className="admin__product-cell">
                                        {product.image && <img src={product.image} alt="" className="admin__product-img" />}
                                        <span style={{ fontWeight: '500' }}>{product.name}</span>
                                    </div>
                                </td>
                                <td data-label="Brand">{product.brand || 'Generic'}</td>
                                <td data-label="Category">{product.category || 'N/A'}</td>
                                <td data-label="Price">${Number(product.price).toFixed(2)}</td>
                                <td data-label="Stock">{product.stock || 0}</td>
                                <td data-label="Actions">
                                    <button onClick={() => handleEdit(product)} className="admin__edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="admin__delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
