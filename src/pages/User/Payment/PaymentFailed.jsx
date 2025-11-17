import { Link, useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const reason = params.get("reason") || "Giao dịch thất bại";

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-10 text-center border border-gray-200 mt-10">
      <div className="text-6xl mb-5">❌</div>

      <h1 className="text-3xl font-extrabold text-red-600 mb-3">
        Thanh toán thất bại!
      </h1>

      <p className="text-gray-700 mb-6">
        Rất tiếc, giao dịch của bạn không thể thực hiện.  
        <br />
        <span className="font-semibold text-red-500">
          {reason}
        </span>
      </p>

      <div className="space-y-4">
        <Link
          to="/cart"
          className="w-full block bg-red-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-red-700 transition shadow-md"
        >
          Thử lại thanh toán
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
