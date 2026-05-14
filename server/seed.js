const { admin, rtdb } = require('./firebase');

const products = [
  {
    name: "4K Ultra HD Monitor",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    category: "Electronics",
    brand: "Samsung",
    stock: 50,
    description: "Experience crystal clear visuals with this 27-inch 4K monitor. Perfect for designers and gamers alike."
  },
  {
    name: "Bluetooth Wireless Speaker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?w=800&q=80",
    category: "Electronics",
    brand: "JBL",
    stock: 120,
    description: "Portable waterproof speaker with 20 hours of playtime and high-fidelity sound."
  },
  {
    name: "Smart Watch Series X",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1544117518-3063a03973d5?w=800&q=80",
    category: "Gadgets",
    brand: "Apple",
    stock: 85,
    description: "Stay connected and track your health with the latest smart watch featuring an OLED display."
  },
  {
    name: "Pro Gaming Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    category: "Electronics",
    brand: "Razer",
    stock: 40,
    description: "Mechanical switches and customizable RGB lighting for the ultimate gaming experience."
  },
  {
    name: "Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Accessories",
    brand: "Sony",
    stock: 65,
    description: "Industry-leading noise cancellation with premium sound quality and touch controls."
  }
];

async function seed() {
  if (!rtdb) {
    console.error("Database not initialized. Check your firebase.js and serviceAccountKey.json");
    process.exit(1);
  }

  const productsRef = rtdb.ref('products');
  
  console.log("Seeding products...");
  
  for (const p of products) {
    const newRef = productsRef.push();
    await newRef.set({
      ...p,
      id: newRef.key
    });
    console.log(`Added: ${p.name}`);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed();
