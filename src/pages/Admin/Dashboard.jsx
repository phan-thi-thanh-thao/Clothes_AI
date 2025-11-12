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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Đơn hàng gần đây</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                      order.status === 'Đang giao' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Sản phẩm bán chạy</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded object-cover mr-3"></div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Đã bán: {product.sold}</p>
                    </div>
                  </div>
                  <p className="font-medium">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;