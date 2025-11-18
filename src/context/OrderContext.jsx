import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Load từ localStorage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved
      ? JSON.parse(saved)
      : [
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

            /* FIX: tách trạng thái */
            status: "delivered", // định nghĩa: pending → confirmed → shipping → delivered
            paymentStatus: "unpaid",

            shippingAddress: "123 Nguyễn Văn Linh, Q7, TP.HCM",
            paymentMethod: "cod",
            createdAt: "2024-01-15",
            customerName: "Nguyễn Văn A",
            customerEmail: "user@user.com",
          },
        ];
  });

  // Lưu xuống localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* =============================================================
      CREATE ORDER
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

        // FIX: luôn để admin xác nhận đơn
        status: "pending",

        // FIX: thanh toán vẫn ghi nhận đã trả tiền
        paymentStatus: isPaid ? "paid" : "unpaid",

        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);

      return { success: true, order: newOrder };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /* =============================================================
      GETTERS
     ============================================================= */
  const getUserOrders = (userId) =>
    orders.filter((order) => order.userId === userId);

  const getAllOrders = () => orders;

  /* =============================================================
      UPDATE ORDER STATUS
     ============================================================= */
  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  /* =============================================================
      CANCEL ORDER
     ============================================================= */
  const cancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o))
    );
  };

  /* =============================================================
      DELETE ORDER
     ============================================================= */
  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

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
