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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-600 tracking-tight hover:opacity-75 transition"
          >
            ClothesAI
          </Link>

          {/* NAVIGATION (DESKTOP) */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link className="lux-nav" to="/">Trang chủ</Link>
            <Link className="lux-nav" to="/products">Sản phẩm</Link>
            <Link className="lux-nav" to="/search">Tìm kiếm AI</Link>
            <Link className="lux-nav" to="/discounts">Ưu đãi</Link>
          </nav>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-10">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 shadow-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition">
                🔍
              </button>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-6">

            {/* CART ICON */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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

            {/* USER MENU */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <span className="font-medium">{user.name}</span>

                  <svg className="w-4 h-4" fill="none" stroke="currentColor">
                    <path
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 animate-fadeIn">
                    <Link className="lux-menu" to="/profile">Thông tin cá nhân</Link>
                    <Link className="lux-menu" to="/orders">Đơn hàng</Link>

                    {user.role === "admin" && (
                      <Link className="lux-menu" to="/admin">Quản trị</Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="lux-menu text-red-600 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link className="lux-login" to="/login">
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXTRA CSS */}
      <style>
        {`
          /* NAV LINK (LUXURY STYLE) */
          .lux-nav {
            font-weight: 500;
            color: #374151;
            position: relative;
            padding-bottom: 6px;
            transition: .25s;
          }
          .lux-nav:hover {
            color: #2563eb;
          }
          .lux-nav::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 0%;
            height: 2px;
            background: #2563eb;
            border-radius: 4px;
            transition: .3s;
          }
          .lux-nav:hover::after {
            width: 100%;
          }

          /* DROPDOWN MENU */
          .lux-menu {
            display: block;
            padding: 10px 16px;
            font-weight: 500;
            color: #374151;
            transition: .25s;
          }
          .lux-menu:hover {
            background: #f5f7fa;
          }

          /* LOGIN LINK */
          .lux-login {
            font-weight: 500;
            color: #374151;
            transition: .25s;
          }
          .lux-login:hover {
            color: #2563eb;
          }

          /* DROPDOWN ANIMATION */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn .25s ease-out;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
