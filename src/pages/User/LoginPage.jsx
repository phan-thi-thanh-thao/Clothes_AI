import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        toast.success("Đăng nhập thành công!");
        navigate(result.user.role === "admin" ? "/admin" : "/");
      } else {
        toast.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50/40 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-10 border border-gray-100">
        
        {/* Logo */}
        <div className="text-center">
          <Link to="/">
            <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
              ClothesAI
            </h1>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Đăng nhập tài khoản
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Chào mừng bạn quay trở lại 👋
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              className="input-field"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="input-field"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              🔑 Tài khoản demo:
            </p>
            <p className="text-sm text-blue-600">Admin: admin@admin.com / admin</p>
            <p className="text-sm text-blue-600">User: user@user.com / user</p>
          </div>
        </form>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .input-field {
            width: 100%;
            padding: 12px 16px;
            border-radius: 14px;
            border: 1px solid #d1d5db;
            background: #f9fafb;
            transition: 0.25s;
          }
          .input-field:focus {
            background: white;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
