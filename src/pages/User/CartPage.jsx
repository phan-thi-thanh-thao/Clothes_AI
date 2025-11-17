import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalAmount } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  /* ======================== EMPTY CART ======================== */
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-3xl p-10">
          <div className="text-6xl mb-5">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Giỏ hàng của bạn trống
          </h2>
          <p className="text-gray-600 mb-8">
            Hãy khám phá những sản phẩm tuyệt vời từ ClothesAI!
          </p>

          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-md font-semibold"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  /* ======================== CART PAGE ======================== */
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-5">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl border"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Size: <span className="font-medium">{item.size}</span> • Màu:{" "}
                  <span className="font-medium">{item.color}</span>
                </p>

                <p className="text-blue-600 font-bold text-lg mt-2">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.size,
                      item.color,
                      item.quantity - 1
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-bold"
                >
                  -
                </button>

                <span className="text-xl font-semibold w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.size,
                      item.color,
                      item.quantity + 1
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size, item.color)
                  }
                  className="text-red-500 hover:text-red-700 text-sm mt-2 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div>
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính:</span>
                <span className="font-semibold">
                  {formatPrice(getTotalAmount())}
                </span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-green-600">Miễn phí</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">
                    {formatPrice(getTotalAmount())}
                  </span>
                </div>
              </div>
            </div>

            {/* ====================== NEW CHECKOUT BUTTON ====================== */}
            <Link to="/checkout">
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-md">
                Thanh toán
              </button>
            </Link>

            <Link
              to="/products"
              className="w-full mt-5 py-3 rounded-xl border border-gray-300 text-gray-700 block text-center hover:bg-gray-50 transition font-medium"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
