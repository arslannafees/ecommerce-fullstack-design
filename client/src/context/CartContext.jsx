import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('ecommerce-cart');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('ecommerce-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product) {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(productId) {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) return removeFromCart(productId);
        setCartItems(prev => prev.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    }

    function clearCart() {
        setCartItems([]);
    }

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
