import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { items, getTotalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        userId: user.id,
        items: items,
        totalAmount: getTotalAmount(),
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod,
        customerName: formData.fullName,
        customerEmail: user.email,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        toast.success("Đặt hàng thành công!");
        navigate("/orders");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          Giỏ hàng đang trống
        </h2>
        <p className="text-gray-600 mb-8">
          Hãy chọn sản phẩm bạn yêu thích trước khi thanh toán.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md font-semibold"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  /* ================= CHECKOUT PAGE ================= */
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Thanh toán
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ================= FORM ================= */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SHIPPING INFO */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Thông tin giao hàng
              </h2>

              <div className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Phương thức thanh toán
              </h2>

              <div className="space-y-4 text-gray-800">

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-semibold">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-semibold">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán trước khi giao hàng
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Đặt hàng ngay"}
            </button>
          </form>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div>
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Đơn hàng của bạn
            </h2>

            <div className="space-y-5 mb-8">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-xl border"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.size} • {item.color} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính:</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí giao hàng:</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">
                  {formatPrice(getTotalAmount())}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Custom styles */}
      <style>
        {`
          .input-field {
            width: 100%;
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid #D1D5DB;
            transition: 0.25s;
            background: #F9FAFB;
          }
          .input-field:focus {
            border-color: #2563EB;
            background: white;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          }

          .payment-option {
            display: flex;
            gap: 12px;
            padding: 12px;
            border-radius: 14px;
            cursor: pointer;
            transition: 0.25s;
          }
          .payment-option:hover {
            background: #F3F4F6;
          }
          .payment-option input {
            transform: scale(1.2);
            accent-color: #2563EB;
          }
        `}
      </style>
    </div>
  );
};

export default CheckoutPage;
