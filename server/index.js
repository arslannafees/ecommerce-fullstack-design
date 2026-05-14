const express = require('express');
const cors = require('cors');
const path = require('path');
const { admin, rtdb } = require('./firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  if (!rtdb) return res.status(500).json({ error: 'Database not initialized' });
  try {
    const userSnapshot = await rtdb.ref(`users/${req.user.uid}`).once('value');
    const userData = userSnapshot.val();
    if (userData && userData.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set up products CRUD API
const productsRef = rtdb ? rtdb.ref('products') : null;

// CREATE Product (Protected)
app.post('/api/products', verifyToken, isAdmin, async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  const { name, price, image, description, category, stock, brand } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const newProductRef = productsRef.push();
    const productData = { 
      id: newProductRef.key, 
      name, 
      price: parseFloat(price), 
      image: image || '', 
      description: description || '', 
      category: category || 'General', 
      stock: parseInt(stock) || 0,
      brand: brand || 'Generic'
    };
    await newProductRef.set(productData);
    res.status(201).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all Products (Public)
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

// READ single Product by id (Public)
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

// UPDATE Product (Protected)
app.put('/api/products/:id', verifyToken, isAdmin, async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  try {
    const snapshot = await productsRef.orderByChild('id').equalTo(req.params.id).once('value');
    const result = snapshot.val();
    if (result) {
      const key = Object.keys(result)[0];
      const updateData = { ...req.body };
      if (updateData.price) updateData.price = parseFloat(updateData.price);
      if (updateData.stock) updateData.stock = parseInt(updateData.stock);
      
      await productsRef.child(key).update(updateData);
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Product (Protected)
app.delete('/api/products/:id', verifyToken, isAdmin, async (req, res) => {
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

// NEWSLETTER (Public)
app.post('/api/newsletter', async (req, res) => {
  if (!rtdb) return res.status(500).json({ error: 'Database not initialized' });
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    await rtdb.ref('newsletter').push({ email, timestamp: Date.now() });
    res.json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SUPPLIER INQUIRIES (Public)
app.post('/api/inquiries', async (req, res) => {
  if (!rtdb) return res.status(500).json({ error: 'Database not initialized' });
  try {
    await rtdb.ref('inquiries').push({ ...req.body, timestamp: Date.now() });
    res.json({ message: 'Inquiry sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Orders (Protected)
app.get('/api/orders', verifyToken, async (req, res) => {
  if (!rtdb) return res.status(500).json({ error: 'Database not initialized' });
  try {
    const snapshot = await rtdb.ref(`orders/${req.user.uid}`).once('value');
    const orders = snapshot.val() ? Object.values(snapshot.val()) : [];
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CHECKOUT (Decrement Stock & Save Order)
app.post('/api/checkout', verifyToken, async (req, res) => {
  if (!productsRef) return res.status(500).json({ error: 'Firebase not configured' });
  const { items } = req.body; // Array of { id, quantity, name, price, image }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    const updates = {};
    const snapshot = await productsRef.once('value');
    const allProducts = snapshot.val();
    let totalAmount = 0;

    for (const item of items) {
      const productKey = Object.keys(allProducts).find(key => allProducts[key].id === item.id);
      if (!productKey) throw new Error(`Product ${item.id} not found`);

      const product = allProducts[productKey];
      if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

      updates[`${productKey}/stock`] = product.stock - item.quantity;
      totalAmount += product.price * item.quantity;
    }

    // Update stock
    await productsRef.update(updates);

    // Save order
    const orderData = {
      items,
      totalAmount,
      timestamp: Date.now(),
      status: 'Processing'
    };
    await rtdb.ref(`orders/${req.user.uid}`).push(orderData);

    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'E-Commerce API is running' });
});

// API is purely backend; Frontend is on Vercel

// MESSAGES / INQUIRIES
app.post('/api/messages', async (req, res) => {
  const { productId, productName, userName, email, message } = req.body;
  if (!email || !message) return res.status(400).json({ error: 'Email and message are required' });

  try {
    const messagesRef = rtdb.ref('messages');
    const newMsgRef = messagesRef.push();
    await newMsgRef.set({
      id: newMsgRef.key,
      productId,
      productName,
      userName: userName || 'Anonymous',
      email,
      message,
      timestamp: Date.now()
    });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
