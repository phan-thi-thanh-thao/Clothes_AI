import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);
    if (result.success) {
      toast.success("Đăng nhập thành công!");
      navigate(result.user.role === "admin" ? "/admin" : "/");
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* BACKGROUND SLOW BLUR EFFECT */}
      <div className="absolute w-[380px] h-[380px] bg-blue-400/20 rounded-full blur-[120px] top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[140px] bottom-10 right-10"></div>

      {/* SIDE HERO */}
      <div className="hidden lg:flex flex-col justify-center px-16 animate-slideRight">
        <h1 className="text-6xl font-extrabold text-blue-700 drop-shadow mb-6">
          ClothesAI
        </h1>
        <p className="text-gray-600 text-xl leading-relaxed max-w-md">
          Nền tảng thời trang hiện đại ứng dụng trí tuệ nhân tạo.  
          Tìm kiếm – mua sắm – trải nghiệm thông minh hơn ✨
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/50 animate-fadeUp">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
              ClothesAI
            </h1>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="text-gray-500 text-sm mt-1">
            Chào mừng bạn quay lại 💙
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Mật khẩu</label>
            <div className="input-icon">
              <span>🔒</span>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                className="input-field pl-12"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800">
              Đăng ký ngay
            </Link>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
          <p className="text-sm font-semibold text-blue-700 mb-2">🔑 Tài khoản demo:</p>
          <p className="text-sm text-blue-600">Admin: admin@admin.com / admin</p>
          <p className="text-sm text-blue-600">User: user@user.com / user</p>
        </div>

      </div>

      {/* Custom CSS */}
      <style>
        {`
          .input-field {
            width: 100%;
            padding: 12px 16px;
            border-radius: 14px;
            background: #f9fafb;
            border: 1px solid #d1d5db;
            transition: 0.25s;
          }
          .input-field:focus {
            background: white;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
            outline: none;
          }

          .form-label {
            font-size: .9rem;
            font-weight: 600;
            margin-bottom: 4px;
            display: block;
            color: #374151;
          }

          .input-icon {
  position: relative;
}

.icon-svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.45;
  color: #6b7280; /* Gray-500 */
  display: flex;
  align-items: center;
  justify-content: center;
}


          .btn-primary {
            padding: 14px;
            background: linear-gradient(to right, #2563eb, #1e40af);
            color: white;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 600;
            transition: .25s;
            box-shadow: 0 3px 14px rgba(37,99,235,.35);
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            background: linear-gradient(to right, #1e40af, #1e3a8a);
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp {
            animation: fadeUp .6s ease-out;
          }

          @keyframes slideRight {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideRight {
            animation: slideRight .8s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
