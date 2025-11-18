import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const { getAllOrders, updateOrderStatus, deleteOrder } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [payFilter, setPayFilter] = useState("");

  const orders = getAllOrders();

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === "" || order.status === statusFilter;
    const matchPayment =
      payFilter === "" || order.paymentStatus === payFilter;

    return matchSearch && matchStatus && matchPayment;
  });

  /* ======================================================
      STATUS UI
  ====================================================== */
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

  /* ======================================================
      PAYMENT STATUS UI (FIX)
  ====================================================== */
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "unpaid":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "unpaid":
        return "Chưa thanh toán";
      default:
        return "Không rõ";
    }
  };

  /* ======================================================
      HANDLERS
  ====================================================== */
  const handleStatusUpdate = (id, status) => {
    updateOrderStatus(id, status);
    toast.success("Cập nhật trạng thái thành công!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      deleteOrder(id);
      toast.success("Xóa đơn hàng thành công!");
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  /* ======================================================
      RENDER
  ====================================================== */
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Quản lý đơn hàng
        </h1>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍  Tìm theo mã đơn hoặc tên khách hàng"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* FILTER STATUS */}
        <select
          className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="shipping">Đang giao hàng</option>
          <option value="delivered">Đã giao hàng</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        {/* FILTER PAYMENT STATUS */}
        <select
          className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={payFilter}
          onChange={(e) => setPayFilter(e.target.value)}
        >
          <option value="">Mọi thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="unpaid">Chưa thanh toán</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Đơn hàng
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Khách hàng
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Ngày đặt
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Thanh toán
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Tổng tiền
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr
                key={o.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* ORDER NUMBER */}
                <td className="px-6 py-5">
                  <div className="font-semibold text-gray-900">
                    #{o.orderNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {o.items.length} sản phẩm
                  </div>
                </td>

                {/* CUSTOMER */}
                <td className="px-6 py-5">
                  <div className="font-medium text-gray-900">
                    {o.customerName || "Khách vãng lai"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {o.customerEmail || "Không có email"}
                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-5 text-gray-800">{o.createdAt}</td>

                {/* PAYMENT STATUS (FIXED) */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                      o.paymentStatus
                    )}`}
                  >
                    {getPaymentStatusText(o.paymentStatus)}
                  </span>
                </td>

                {/* ORDER STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      o.status
                    )}`}
                  >
                    {getStatusText(o.status)}
                  </span>
                </td>

                {/* TOTAL */}
                <td className="px-6 py-5 text-gray-900 font-semibold">
                  {formatPrice(o.totalAmount)}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      Chi tiết
                    </button>

                    {o.status === "pending" && (
                      <button
                        onClick={() => handleStatusUpdate(o.id, "confirmed")}
                        className="text-green-600 hover:text-green-800 font-semibold"
                      >
                        Xác nhận
                      </button>
                    )}

                    {o.status === "confirmed" && (
                      <button
                        onClick={() => handleStatusUpdate(o.id, "shipping")}
                        className="text-purple-600 hover:text-purple-800 font-semibold"
                      >
                        Giao hàng
                      </button>
                    )}

                    {o.status === "shipping" && (
                      <button
                        onClick={() => handleStatusUpdate(o.id, "delivered")}
                        className="text-green-700 hover:text-green-900 font-semibold"
                      >
                        Hoàn thành
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(o.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-lg text-gray-500">
          Không tìm thấy đơn hàng nào
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
