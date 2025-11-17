import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart from localStorage 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const saveToStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const addToCart = (product, quantity = 1, size = '', color = '') => {
    const existingItem = items.find(
      item => item.id === product.id && item.size === size && item.color === color
    );

    let newItems;
    if (existingItem) {
      newItems = items.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        size,
        color
      };
      newItems = [...items, newItem];
    }

    setItems(newItems);
    saveToStorage(newItems);
  };

  const removeFromCart = (productId, size = '', color = '') => {
    const newItems = items.filter(
      item => !(item.id === productId && item.size === size && item.color === color)
    );
    setItems(newItems);
    saveToStorage(newItems);
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    const newItems = items.map(item =>
      item.id === productId && item.size === size && item.color === color
        ? { ...item, quantity }
        : item
    );
    setItems(newItems);
    saveToStorage(newItems);
  };

  // Clear Cart — KHÔNG gọi useEffect tự động
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalAmount,
    getItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
