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
  const [modalType, setModalType] = useState(null); // momo | vnpay | debit | credit

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    paymentMethod: "momo",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ===========================
  // FINAL CONFIRM PAYMENT
  // ===========================
  const confirmPayment = async () => {
    setLoading(true);

    try {
      const isPaid = ["momo", "vnpay"].includes(formData.paymentMethod);

      const orderData = {
        userId: user?.id,
        items,
        totalAmount: getTotalAmount(),
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod,
        customerName: formData.fullName,
        customerEmail: user?.email || "",
        status: isPaid ? "paid" : "pending",
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        navigate(
          isPaid
            ? `/payment-success?orderId=${result.order.id}`
            : `/payment-pending?orderId=${result.order.id}`
        );
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // MAIN SUBMIT HANDLER
  // ===========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (formData.paymentMethod === "cod") {
      confirmPayment();
      return;
    }

    setModalType(formData.paymentMethod);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  if (items.length === 0) {
    return (
      <div className="p-24 text-center">
        <h2 className="text-3xl font-bold">Giỏ hàng đang trống</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-10">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SHIPPING */}
            <div className="bg-white rounded-3xl shadow-md p-8 border">
              <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>

              <div className="space-y-5">
                <input
                  name="fullName"
                  placeholder="Họ và tên *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />

                <input
                  name="phone"
                  placeholder="Số điện thoại *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />

                <textarea
                  name="address"
                  placeholder="Địa chỉ giao hàng *"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="input-field"
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl shadow-md p-8 border">
              <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>

              {/* WALLET */}
              <p className="font-semibold mb-2">Ví điện tử (Ưu tiên)</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* MoMo */}
                <button
                  type="button"
                  className={`wallet-button ${
                    formData.paymentMethod === "momo" ? "wallet-selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "momo" })
                  }
                >
                  <img src="/images/payment/momo.png" className="w-16 mx-auto" />
                  <p className="text-pink-600 font-semibold text-center">MoMo</p>
                </button>

                {/* VNPay */}
                <button
                  type="button"
                  className={`wallet-button ${
                    formData.paymentMethod === "vnpay" ? "wallet-selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "vnpay" })
                  }
                >
                  <img src="/images/payment/vnpay.png" className="w-16 mx-auto" />
                  <p className="text-blue-600 font-semibold text-center">
                    VNPay
                  </p>
                </button>
              </div>

              {/* BANK */}
              <p className="font-semibold mb-2">Thẻ ngân hàng</p>

              <div
                className={`bank-item ${
                  formData.paymentMethod === "debit" ? "bank-selected" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: "debit" })
                }
              >
                <img src="/images/payment/debit.png" className="w-10" />
                <span>Thẻ ghi nợ (ATM / Napas)</span>
              </div>

              <div
                className={`bank-item ${
                  formData.paymentMethod === "credit" ? "bank-selected" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: "credit" })
                }
              >
                <img src="/images/payment/credit.png" className="w-10" />
                <span>Thẻ tín dụng (Visa / Master)</span>
              </div>

              {/* COD */}
              <p className="font-semibold mt-6">Thanh toán khi nhận hàng</p>

              <button
                type="button"
                className={`payment-button-full ${
                  formData.paymentMethod === "cod" ? "selected-main" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: "cod" })
                }
              >
                💵 Thanh toán khi nhận hàng (COD)
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl text-lg"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-3xl shadow-lg p-8 border sticky top-28">
            <h2 className="text-2xl font-bold mb-6">Đơn hàng</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`} // 👈 FIX KEY HERE
                  className="flex items-center gap-4"
                >
                  <img src={item.image} className="w-20 h-20 rounded-xl" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">
                      {item.size} • {item.color} × {item.quantity}
                    </p>
                  </div>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span className="text-green-600">Miễn phí</span>
              </div>

              <div className="flex justify-between text-xl font-bold mt-3">
                <span>Tổng:</span>
                <span className="text-blue-600">
                  {formatPrice(getTotalAmount())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== MODALS ====================== */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[420px] shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {modalType === "momo" && "Thanh toán MoMo"}
              {modalType === "vnpay" && "Thanh toán VNPay"}
              {modalType === "debit" && "Thanh toán thẻ ghi nợ"}
              {modalType === "credit" && "Thanh toán thẻ tín dụng"}
            </h2>

            {modalType === "momo" ? (
              <div className="text-center">
                <img
                  src="/images/payment/momo-qr.png"
                  className="w-64 mx-auto rounded-2xl shadow"
                />
                <p className="mt-3 font-medium">
                  Quét QR để thanh toán {formatPrice(getTotalAmount())}
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-600 mb-4">
                Đây chỉ là mock FE. BE thực sẽ xử lý sau.
              </p>
            )}

            <div className="mt-6 flex justify-between gap-3">
              <button
                className="flex-1 py-3 bg-gray-200 rounded-xl"
                onClick={() => setModalType(null)}
              >
                Hủy
              </button>
              <button
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl"
                onClick={confirmPayment}
              >
                Tôi đã thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== CSS ====================== */}
      <style>
        {`
          .input-field {
            width: 100%;
            padding: 12px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
            background: #f9fafb;
          }
          .wallet-button {
            border: 1px solid #d1d5db;
            padding: 16px;
            border-radius: 16px;
            background: #f9fafb;
          }
          .wallet-selected {
            background: white;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37,99,235,.15);
          }
          .bank-item {
            display: flex;
            padding: 12px;
            gap: 12px;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            margin-bottom: 10px;
            background: #f9fafb;
            cursor: pointer;
          }
          .bank-selected {
            background: white;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37,99,235,.15);
          }
          .payment-button-full {
            width: 100%;
            padding: 14px;
            border-radius: 14px;
            border: 1px solid #d1d5db;
            background: #f3f4f6;
            text-align: left;
          }
          .selected-main {
            background: white;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37,99,235,.15);
          }
        `}
      </style>
    </div>
  );
};

export default CheckoutPage;
