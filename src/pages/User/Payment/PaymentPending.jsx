import { Link, useLocation } from "react-router-dom";

export default function PaymentPending() {
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("orderId");

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5 animate-pulse">⏳</div>

      <h1 className="text-3xl font-extrabold text-blue-600 mb-3">
        Đơn hàng đang chờ xác nhận
      </h1>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Cảm ơn bạn! Hệ thống đang kiểm tra và xác nhận đơn hàng của bạn.
      </p>

      {/* ORDER ID */}
      <p className="text-gray-800 font-semibold text-lg mb-6">
        Mã đơn hàng:{" "}
        <span className="text-blue-600 font-bold">{orderId || "—"}</span>
      </p>

      <p className="text-gray-600 mb-6">
        Vui lòng chờ ít phút. Chúng tôi sẽ phản hồi sớm nhất có thể.
      </p>

      <div className="space-y-4 mt-6">
        <Link
          to="/orders"
          className="w-full block bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition shadow-md"
        >
          Xem danh sách đơn hàng
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
