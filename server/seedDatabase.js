const { rtdb } = require('./firebase');
const sampleProducts = require('../client/src/data/products.js'); // Use the arrays from this or create mock data
// Actually, let's just write our own array here so it's clean and matches the required attributes.
const sampleData = [
  {
    id: 'p1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones with active noise cancellation.',
    category: 'Electronics',
    stock: 50
  },
  {
    id: 'p2',
    name: 'Smart Fitness Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Track your health and fitness seamlessly with this smartwatch.',
    category: 'Wearables',
    stock: 120
  },
  {
    id: 'p3',
    name: '4K Ultra HD Monitor',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d4aff?w=500&q=80',
    description: 'Crisp and clear 4K monitor, perfect for gaming and productivity.',
    category: 'Electronics',
    stock: 35
  },
  {
    id: 'p4',
    name: 'Mechanic Keyboard',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
    description: 'Tactile mechanical keyboard with RGB backlighting.',
    category: 'Accessories',
    stock: 200
  },
  {
    id: 'p5',
    name: 'Ergonomic Office Chair',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
    description: 'Ergonomic chair designed for long hours of comfortable working.',
    category: 'Furniture',
    stock: 15
  },
  {
    id: 'p6',
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-41712a76f2fc?w=500&q=80',
    description: 'Portable bluetooth speaker with deep bass and waterproof design.',
    category: 'Electronics',
    stock: 80
  }
];

async function seedData() {
  if (!rtdb) {
    console.error('Firebase DB not initialized. Please configure serviceAccountKey.json and databaseURL first.');
    process.exit(1);
  }

  const productsRef = rtdb.ref('products');

  try {
    // Clear existing data
    await productsRef.remove();
    console.log('Cleared existing products.');

    for (const product of sampleData) {
      const newRef = productsRef.push();
      // Optional: Replace the ID with the generated key or preserve id
      product.id = newRef.key;
      await newRef.set(product);
      console.log(`Added product: ${product.name}`);
    }

    console.log('Successfully seeded database!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedData();