import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: "📊" },
    { path: "/admin/products", name: "Quản lý sản phẩm", icon: "📦" },
    { path: "/admin/orders", name: "Quản lý đơn hàng", icon: "🛒" },
    { path: "/admin/users", name: "Quản lý người dùng", icon: "👥" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 fixed h-screen top-0 left-0 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            ClothesAI Admin
          </h2>
          <p className="text-xs text-gray-500">Quản lý hệ thống</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium
                    ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 pb-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold shadow"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-500">
                Chào mừng bạn quay lại hệ thống 🎉
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                A
              </div>
              <span className="font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
