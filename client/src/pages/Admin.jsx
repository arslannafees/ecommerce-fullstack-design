import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const querySnapshot = await getDocs(collection(db, 'products'));
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDoc(doc(db, 'products', editingId), { name, price: parseFloat(price) });
                setEditingId(null);
            } else {
                await addDoc(collection(db, 'products'), { name, price: parseFloat(price) });
            }
            setName('');
            setPrice('');
            fetchProducts();
        } catch (error) {
            console.error("Error saving product: ", error);
        }
    }

    function handleEdit(product) {
        setEditingId(product.id);
        setName(product.name);
        setPrice(product.price);
    }

    async function handleDeleteProduct(id) {
        try {
            await deleteDoc(doc(db, 'products', id));
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    }

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
            <h2>Admin Panel - Manage Products</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    style={{ padding: '0.5rem', flex: 1 }}
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)} 
                    required 
                    style={{ padding: '0.5rem', width: '100px' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem', background: editingId ? 'green' : 'black', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {editingId ? 'Update Product' : 'Add Product'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setName(''); setPrice(''); }} style={{ padding: '0.5rem 1rem', background: 'gray', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Cancel
                    </button>
                )}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Name</th>
                        <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Price</th>
                        <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{product.name}</td>
                            <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>${product.price}</td>
                            <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                                <button onClick={() => handleEdit(product)} style={{ padding: '0.25rem 0.5rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteProduct(product.id)} style={{ padding: '0.25rem 0.5rem', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
