import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-600 tracking-wide hover:opacity-80 transition"
          >
            ClothesAI
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link className="nav-item" to="/">Trang chủ</Link>
            <Link className="nav-item" to="/products">Sản phẩm</Link>
            <Link className="nav-item" to="/search">Tìm kiếm AI</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-10">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-5 py-2.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition">
                🔍
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2m1 4h13l3-6H5.4M7 13l-1.7 4.3a2 2 0 001.9 2.7h9.6a2 2 0 001.9-2.7L16 13"
                />
              </svg>

              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <span className="font-medium">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg py-2 border border-gray-200">
                    <Link className="menu-item" to="/profile">Thông tin cá nhân</Link>
                    <Link className="menu-item" to="/orders">Đơn hàng</Link>

                    {user.role === "admin" && (
                      <Link className="menu-item" to="/admin">Quản trị</Link>
                    )}

                    <button onClick={handleLogout} className="menu-item text-red-600 hover:bg-red-50">
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link className="text-gray-700 hover:text-blue-600 font-medium transition" to="/login">
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Nav Item Style */}
      <style>
        {`
          .nav-item {
            position: relative;
            padding-bottom: 4px;
            font-weight: 500;
            color: #374151;
            transition: all 0.25s;
          }
          .nav-item:hover {
            color: #2563eb;
          }
          .nav-item::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background: #2563eb;
            transition: width 0.3s ease;
          }
          .nav-item:hover::after {
            width: 100%;
          }
          .menu-item {
            display: block;
            padding: 10px 16px;
            color: #374151;
            font-weight: 500;
            transition: all .25s;
          }
          .menu-item:hover {
            background: #f3f4f6;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
