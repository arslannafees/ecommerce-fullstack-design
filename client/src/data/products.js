// Mock product data for static pages
export const products = [
  {
    id: 1,
    name: "Canon Cmera EOS 2000, Black 10x zoom",
    price: 998.00,
    oldPrice: 1128.00,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 32,
    orders: 154,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Samsung",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.00,
    oldPrice: 1128.00,
    rating: 4.0,
    ratingCount: 5.9,
    reviews: 32,
    orders: 154,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 32,
    orders: 154,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: 4,
    name: "Apple iPhone 12 Pro Max 128GB",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 5.0,
    ratingCount: 7.5,
    reviews: 154,
    orders: 340,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "The latest iPhone with A14 Bionic chip, 5G capability, and professional camera system."
  },
  {
    id: 5,
    name: "MacBook Pro 13-inch M1 Chip",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 89,
    orders: 200,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "Apple M1 chip with 8-core CPU, 8-core GPU, and 16-core Neural Engine."
  },
  {
    id: 6,
    name: "Canon EOS Camera Professional DSLR",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 45,
    orders: 120,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Pocco",
    description: "Professional-grade DSLR camera with 4K video recording and advanced autofocus."
  },
  {
    id: 7,
    name: "Apple Watch Series 6 GPS Cellular",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.0,
    ratingCount: 7.5,
    reviews: 67,
    orders: 180,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "Advanced health features including blood oxygen monitoring and ECG."
  },
  {
    id: 8,
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 99.50,
    oldPrice: null,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 98,
    orders: 250,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Samsung",
    description: "The ultimate smartphone with 108MP camera and S Pen support."
  },
  {
    id: 9,
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.5,
    ratingCount: 7.5,
    reviews: 234,
    orders: 500,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Lenovo",
    description: "Industry-leading noise cancellation with Dual Noise Sensor technology."
  },
];

export const dealProducts = [
  { id: 101, name: "Smart watches", discount: "-25%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: 102, name: "Laptops", discount: "-15%", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
  { id: 103, name: "GoPro cameras", discount: "-40%", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop" },
  { id: 104, name: "Headphones", discount: "-25%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { id: 105, name: "Canon cameras", discount: "-25%", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop" },
];

export const homeOutdoorProducts = [
  { id: 201, name: "Soft chairs", price: 19, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop" },
  { id: 202, name: "Sofa & chair", price: 19, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&h=200&fit=crop" },
  { id: 203, name: "Kitchen dishes", price: 19, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
  { id: 204, name: "Smart watches", price: 19, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: 205, name: "Kitchen mixer", price: 100, image: "https://images.unsplash.com/photo-1585237672814-8922571e5921?w=200&h=200&fit=crop" },
  { id: 206, name: "Blenders", price: 39, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&h=200&fit=crop" },
  { id: 207, name: "Home appliance", price: 19, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
  { id: 208, name: "Coffee maker", price: 10, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop" },
];

export const consumerElectronics = [
  { id: 301, name: "Smart watches", price: 19, image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=200&h=200&fit=crop" },
  { id: 302, name: "Cameras", price: 89, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop" },
  { id: 303, name: "Headphones", price: 10, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { id: 304, name: "Smart watches", price: 90, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: 305, name: "Gaming set", price: 35, image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop" },
  { id: 306, name: "Laptops & PC", price: 340, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
  { id: 307, name: "Smartphones", price: 19, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
  { id: 308, name: "Electric kettle", price: 240, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
];

export const recommendedProducts = [
  { id: 401, name: "T-shirts with multiple colors, for men", price: 10.30, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" },
  { id: 402, name: "Jeans shorts for men blue color", price: 10.30, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" },
  { id: 403, name: "Brown winter coat medium size", price: 12.50, image: "https://images.unsplash.com/photo-1544923246-77307dd270cb?w=300&h=300&fit=crop" },
  { id: 404, name: "Jeans bag for travel for men", price: 34.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
  { id: 405, name: "Leather wallet", price: 99.00, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop" },
  { id: 406, name: "Canon camera black, 100x zoom", price: 9.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop" },
  { id: 407, name: "Headset for gaming with mic", price: 8.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop" },
  { id: 408, name: "Smartwatch silver color modern", price: 10.30, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" },
  { id: 409, name: "Blue wallet for men leather metarfial", price: 10.30, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop" },
  { id: 410, name: "Jeans bag for travel for men", price: 80.95, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
];

export const cartItems = [
  {
    id: 1,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 78.99,
    quantity: 9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Best factory LLC",
    price: 39.00,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 170.50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544923246-77307dd270cb?w=200&h=200&fit=crop"
  },
];

export const savedForLater = [
  { id: 501, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop" },
  { id: 502, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop" },
  { id: 503, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop" },
  { id: 504, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop" },
];

export const youMayLike = [
  { id: 601, name: "Men Blazers Sets Elegant Formal", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 602, name: "Men Shirt Sleeve Polo Contrast", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop" },
  { id: 603, name: "Apple Watch Series Space Gray", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=100&h=100&fit=crop" },
  { id: 604, name: "Basketball Crew Socks Long Stuff", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop" },
  { id: 605, name: "New Summer Men's castrol T-Shirts", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" },
];

export const relatedProducts = [
  { id: 701, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
  { id: 702, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { id: 703, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=200&h=200&fit=crop" },
  { id: 704, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
  { id: 705, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: 706, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop" },
];

export const categories = [
  "Automobiles", "Clothes and wear", "Home interiors", "Computer and tech",
  "Tools, equipments", "Sports and outdoor", "Animal and pets", "Machinery tools", "More category"
];

export const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
export const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
