import { Link, useSearchParams } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const { getAllOrders } = useOrder();

  const reason = params.get("reason") || "Giao dịch thất bại";
  const orderId = params.get("orderId");

  const orders = getAllOrders();
  const order = orders.find((o) => String(o.id) === String(orderId));

  const paymentText = {
    momo: "MoMo",
    vnpay: "VNPay",
    cod: "Thanh toán khi nhận hàng (COD)",
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5">❌</div>

      <h1 className="text-3xl font-extrabold text-red-600 mb-3">
        Thanh toán thất bại!
      </h1>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Rất tiếc, giao dịch của bạn không thể thực hiện.
      </p>

      {/* BOX INFO */}
      <div className="bg-gray-50 p-5 rounded-2xl shadow-inner text-left mb-6">
        {order ? (
          <>
            <p className="text-gray-800 font-semibold">
              Mã đơn hàng:{" "}
              <span className="text-blue-600">{order.orderNumber}</span>
            </p>

            <p className="mt-2 text-gray-700">
              Phương thức:{" "}
              <span className="font-semibold text-gray-900">
                {paymentText[order.paymentMethod] || "Không rõ"}
              </span>
            </p>

            <p className="mt-1 text-gray-700">
              Tổng tiền:{" "}
              <span className="font-semibold text-blue-600">
                {order.totalAmount.toLocaleString("vi-VN")}₫
              </span>
            </p>

            <p className="mt-3 text-sm text-red-500 font-medium">
              Lý do thất bại: {reason}
            </p>

            <p className="mt-2 text-sm text-yellow-600">
              ⚠ Đơn hàng vẫn được tạo nhưng đang ở trạng thái
              <b> chưa thanh toán</b>.
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-800 font-semibold">
              Không tìm thấy thông tin đơn hàng.
            </p>
            <p className="text-sm text-red-500 mt-2">Có thể bạn đã reload trang.</p>
          </>
        )}
      </div>

      {/* BUTTONS */}
      <div className="space-y-4">
        <Link
          to="/cart"
          className="w-full block bg-red-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-red-700 transition shadow-md"
        >
          Thử lại thanh toán
        </Link>

        {order && (
          <Link
            to="/orders"
            className="w-full block bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition shadow-md"
          >
            Xem đơn hàng
          </Link>
        )}

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
