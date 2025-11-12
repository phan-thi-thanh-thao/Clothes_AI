import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'DH001',
      userId: 2,
      items: [
        { id: 1, name: 'Áo Thun Nam Basic', price: 299000, quantity: 2, size: 'L', color: 'Đen' }
      ],
      totalAmount: 598000,
      status: 'delivered',
      shippingAddress: '123 Nguyễn Văn Linh, Q7, TP.HCM',
      paymentMethod: 'cod',
      createdAt: '2024-01-15',
      customerName: 'Nguyễn Văn A',
      customerEmail: 'user@user.com'
    }
  ]);

  const createOrder = async (orderData) => {
    try {
      const newOrder = {
        id: Date.now(),
        orderNumber: `DH${String(Date.now()).slice(-6)}`,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setOrders(prev => [newOrder, ...prev]);
      return { success: true, order: newOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const getAllOrders = () => {
    return orders;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const value = {
    orders,
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    deleteOrder
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};