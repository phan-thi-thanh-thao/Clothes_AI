import { useParams } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { orders } = useOrder();

  const order = orders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-red-600">
          ❌ Không tìm thấy đơn hàng!
        </h2>
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-6">
        Chi tiết đơn hàng #{order.orderNumber}
      </h1>

      <div className="bg-white rounded-3xl shadow-md p-8 border space-y-6">

        <div>
          <p className="text-gray-600">Ngày đặt: {order.createdAt}</p>
          <p className="text-gray-600">
            Trạng thái:{" "}
            <span className="font-semibold text-blue-600">
              {order.status}
            </span>
          </p>
          <p className="text-gray-600">
            Phương thức thanh toán:{" "}
            <span className="font-semibold">
              {order.paymentMethod.toUpperCase()}
            </span>
          </p>
        </div>

        <hr />

        <h2 className="text-xl font-bold">Sản phẩm</h2>

        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  x{item.quantity} • {item.size} • {item.color}
                </p>
              </div>
              <p className="font-semibold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Tổng cộng:</span>
          <span className="text-blue-600">
            {formatPrice(order.totalAmount)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailPage;
