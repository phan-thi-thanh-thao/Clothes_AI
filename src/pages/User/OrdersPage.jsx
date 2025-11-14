import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const { getUserOrders, cancelOrder } = useOrder();

  const orders = getUserOrders(user?.id);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipping":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      cancelOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Đơn hàng của tôi
      </h1>

      {/* ================= EMPTY STATE ================= */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">📦</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bạn chưa có đơn hàng nào
          </h2>
          <p className="text-gray-600 text-lg">
            Hãy bắt đầu mua sắm để trải nghiệm ClothesAI nhé!
          </p>
        </div>
      ) : (
        <div className="space-y-8">

          {/* ================= ORDER CARD ================= */}
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Đơn hàng #{order.orderNumber}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Ngày đặt: {order.createdAt}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-gray-600 ml-2 text-sm">
                        x{item.quantity} • {item.size} • {item.color}
                      </span>
                    </div>

                    <span className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">

                  <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Xem chi tiết
                  </button>

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                      Hủy đơn hàng
                    </button>
                  )}

                  {order.status === "delivered" && (
                    <button className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">
                      Mua lại
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default OrdersPage;
