const Dashboard = () => {
  const stats = [
    { title: "Tổng sản phẩm", value: "1,234", icon: "📦", color: "blue" },
    { title: "Đơn hàng hôm nay", value: "89", icon: "🛒", color: "green" },
    { title: "Người dùng", value: "2,456", icon: "👥", color: "purple" },
    { title: "Doanh thu tháng", value: "125M", icon: "💰", color: "yellow" }
  ];

  const recentOrders = [
    { id: "DH001", customer: "Nguyễn Văn A", amount: "599,000đ", status: "Hoàn thành" },
    { id: "DH002", customer: "Trần Thị B", amount: "299,000đ", status: "Đang giao" },
    { id: "DH003", customer: "Lê Văn C", amount: "450,000đ", status: "Chờ xử lý" }
  ];

  const topProducts = [
    { name: "Áo Thun Nam Basic", sold: 156, revenue: "46,644,000đ" },
    { name: "Quần Jeans Slim Fit", sold: 89, revenue: "53,311,000đ" },
    { name: "Áo Sơ Mi Công Sở", sold: 134, revenue: "60,300,000đ" }
  ];

  return (
    <div>
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 shadow-inner`}
              >
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Đơn hàng gần đây</h3>
          </div>

          <div className="p-6 space-y-5">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>

                  <span
                    className={`mt-1 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Hoàn thành"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Đang giao"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Sản phẩm bán chạy</h3>
          </div>

          <div className="p-6 space-y-5">
            {topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl shadow-inner" />
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">Đã bán: {product.sold}</p>
                  </div>
                </div>

                <p className="font-semibold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
