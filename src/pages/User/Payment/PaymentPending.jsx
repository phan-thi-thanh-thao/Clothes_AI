import { Link, useLocation } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";

export default function PaymentPending() {
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("orderId");

  const { getAllOrders } = useOrder();
  const orders = getAllOrders();
  const order = orders.find((o) => String(o.id) === String(orderId));

  const paymentText = {
    momo: "MoMo",
    vnpay: "VNPay",
    cod: "Thanh toán khi nhận hàng (COD)",
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5 animate-pulse">⏳</div>

      <h1 className="text-3xl font-extrabold text-blue-600 mb-3">
        Đơn hàng đang chờ xác nhận
      </h1>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Cảm ơn bạn! Chúng tôi đã nhận được đơn hàng của bạn.  
        Hiện hệ thống đang chờ Admin xác nhận.
      </p>

      {/* ORDER ID */}
      <div className="bg-gray-50 shadow-inner rounded-2xl p-5 text-left mb-6">
        <p className="text-gray-800 font-semibold text-lg">
          Mã đơn hàng:{" "}
          <span className="text-blue-600 font-bold">
            {order?.orderNumber || orderId || "—"}
          </span>
        </p>

        <p className="mt-2 text-gray-700">
          Phương thức thanh toán:{" "}
          <span className="font-semibold text-blue-700">
            {paymentText[order?.paymentMethod] || "Không rõ"}
          </span>
        </p>

        <p className="mt-1 text-gray-700">
          Trạng thái thanh toán:{" "}
          <span
            className={`font-semibold ${
              order?.paymentStatus === "paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order?.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
          </span>
        </p>

        <p className="mt-1 text-gray-700">
          Tổng tiền:{" "}
          <span className="font-semibold text-blue-700">
            {order?.totalAmount?.toLocaleString("vi-VN")}₫
          </span>
        </p>
      </div>

      {/* BUTTONS */}
      <div className="space-y-4 mt-6">
        <Link
          to="/orders"
          className="w-full block bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition shadow-md"
        >
          Xem đơn hàng
        </Link>

        <Link
          to="/products"
          className="w-full block py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
