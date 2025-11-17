import { useSearchParams, useNavigate } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";
import { useCart } from "../../../context/CartContext";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("orderId");
  const method = params.get("method") || "unknown";

  const { getAllOrders, updateOrderStatus } = useOrder();
  const { clearCart } = useCart();

  // FIXED — chỉ chạy 1 lần khi orderId xuất hiện
  useEffect(() => {
    if (!orderId) return;

    clearCart();
    updateOrderStatus(Number(orderId), "paid");
  }, [orderId]);   // ❗ chỉ để orderId, không để hàm vào đây

  const allOrders = getAllOrders();
  const order = allOrders.find((o) => String(o.id) === String(orderId));

  const paymentText = {
    momo: "MoMo",
    vnpay: "VNPay",
    cod: "Thanh toán khi nhận hàng",
    unknown: "Không rõ",
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5">🎉</div>

      <h1 className="text-3xl font-extrabold text-green-600 mb-3">
        Thanh toán thành công!
      </h1>

      <p className="text-gray-700 mb-6">
        Cảm ơn bạn đã đặt hàng tại <b>ClothesAI</b> 💙
      </p>

      {/* ========== ORDER BOX ========== */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-inner mb-6 text-left">
        <p className="text-lg text-gray-900 font-semibold">
          Mã đơn hàng:{" "}
          <span className="text-blue-600">
            {order?.orderNumber || `#${orderId}`}
          </span>
        </p>

        <p className="mt-2 text-gray-700">
          Phương thức thanh toán:{" "}
          <span className="font-semibold text-green-600">
            {paymentText[method]}
          </span>
        </p>

        <p className="mt-1 text-gray-700">
          Tổng tiền:{" "}
          <span className="font-semibold text-blue-700">
            {order?.totalAmount?.toLocaleString("vi-VN")}₫
          </span>
        </p>

        {!order && (
          <p className="text-sm text-red-500 mt-3">
            ⚠ Không tìm thấy thông tin đơn hàng — có thể do reload trang.
          </p>
        )}
      </div>

      {/* ========== Actions ========== */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/orders", { replace: true })}
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
