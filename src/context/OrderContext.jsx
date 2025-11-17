import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

/* =============================================================
    HOOK useOrder — để import đúng trong các file
   ============================================================= */
export const useOrder = () => useContext(OrderContext);

/* =============================================================
    PROVIDER
   ============================================================= */
export const OrderProvider = ({ children }) => {
  // Load từ localStorage để không mất đơn khi reload
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        orderNumber: "DH001",
        userId: 2,
        items: [
          {
            id: 1,
            name: "Áo Thun Nam Basic",
            price: 299000,
            quantity: 2,
            size: "L",
            color: "Đen",
          },
        ],
        totalAmount: 598000,
        status: "delivered",
        shippingAddress: "123 Nguyễn Văn Linh, Q7, TP.HCM",
        paymentMethod: "cod",
        createdAt: "2024-01-15",
        customerName: "Nguyễn Văn A",
        customerEmail: "user@user.com",
      },
    ];
  });

  // Ghi xuống localStorage mỗi khi orders thay đổi
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* =============================================================
      CREATE ORDER (MoMo, VNPay, COD)
     ============================================================= */
  const createOrder = async (orderData) => {
    try {
      const isPaid =
        orderData.paymentMethod === "momo" ||
        orderData.paymentMethod === "vnpay";

      const id = Date.now();

      const newOrder = {
        id,
        orderNumber: `DH${String(id).slice(-6)}`,
        ...orderData,
        status: isPaid ? "paid" : "pending",
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);

      return { success: true, order: newOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /* =============================================================
      GETTERS
     ============================================================= */
  const getUserOrders = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  const getAllOrders = () => {
    return orders;
  };

  /* =============================================================
      UPDATE ORDER STATUS
     ============================================================= */
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  /* =============================================================
      CANCEL ORDER
     ============================================================= */
  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  /* =============================================================
      DELETE ORDER
     ============================================================= */
  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  /* =============================================================
      CONTEXT VALUE
     ============================================================= */
  const value = {
    orders,
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
