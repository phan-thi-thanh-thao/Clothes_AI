import { useSearchParams, useNavigate } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";
import { useCart } from "../../../context/CartContext";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("orderId");

  const { getAllOrders, updateOrderStatus } = useOrder();
  const { clearCart } = useCart();

  // Load order
  const orders = getAllOrders();
  const order = orders.find((o) => String(o.id) === String(orderId));

  // Map tên hiển thị của phương thức
  const paymentText = {
    momo: "MoMo",
    vnpay: "VNPay",
    cod: "Thanh toán khi nhận hàng (COD)",
  };

  // Khi vào trang → clear cart + set paymentStatus = paid
  useEffect(() => {
    if (!orderId || !order) return;

    clearCart();

    // cập nhật trạng thái thanh toán (không động vào trạng thái vận chuyển)
    updateOrderStatus(order.id, order.status); // giữ nguyên status shipping/pending/...

    // cập nhật paymentStatus
    order.paymentStatus = "paid";

    // cập nhật localStorage
    localStorage.setItem("orders", JSON.stringify([...orders]));

  }, [orderId]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Không tìm thấy đơn hàng!
        </h1>
        <p className="mt-2 text-gray-600">
          Có thể bạn đã reload trang sau khi thanh toán.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5">🎉</div>

      <h1 className="text-3xl font-extrabold text-green-600 mb-3">
        Thanh toán thành công!
      </h1>

      <p className="text-gray-700 mb-6">
        Cảm ơn bạn đã đặt hàng tại <b>ClothesAI</b> 💙
      </p>

      {/* Order box */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-inner mb-6 text-left">
        <p className="text-lg text-gray-900 font-semibold">
          Mã đơn hàng:{" "}
          <span className="text-blue-600">{order.orderNumber}</span>
        </p>

        <p className="mt-2 text-gray-700">
          Phương thức thanh toán:{" "}
          <span className="font-semibold text-green-600">
            {paymentText[order.paymentMethod]}
          </span>
        </p>

        <p className="mt-1 text-gray-700">
          Tổng tiền:{" "}
          <span className="font-semibold text-blue-700">
            {order.totalAmount.toLocaleString("vi-VN")}₫
          </span>
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate(`/orders/${order.id}`)}
          className="w-full block bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition"
        >
          Xem đơn hàng
        </button>

        <button
          onClick={() => navigate("/products")}
          className="w-full block py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
}
