const express = require('express');
const cors = require('cors');
const path = require('path');
const { rtdb } = require('./firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up products CRUD API
const productsRef = rtdb ? rtdb.ref('products') : null;

// CREATE Product
app.post('/api/products', async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const newProductRef = productsRef.push();
    const productData = { id: newProductRef.key, ...req.body };
    await newProductRef.set(productData);
    res.status(201).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all Products
app.get('/api/products', async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const snapshot = await productsRef.once('value');
    const products = snapshot.val() ? Object.values(snapshot.val()) : [];
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ single Product by id
app.get('/api/products/:id', async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const snapshot = await productsRef.orderByChild('id').equalTo(req.params.id).once('value');
    const result = snapshot.val();
    if (result) {
      res.json(Object.values(result)[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Product
app.put('/api/products/:id', async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const snapshot = await productsRef.orderByChild('id').equalTo(req.params.id).once('value');
    const result = snapshot.val();
    if (result) {
      const key = Object.keys(result)[0];
      await productsRef.child(key).update(req.body);
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const snapshot = await productsRef.orderByChild('id').equalTo(req.params.id).once('value');
    const result = snapshot.val();
    if (result) {
      const key = Object.keys(result)[0];
      await productsRef.child(key).remove();
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'E-Commerce API is running' });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
