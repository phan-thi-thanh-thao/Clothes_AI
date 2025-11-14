import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword)
      return toast.error("Mật khẩu xác nhận không khớp!");

    setLoading(true);
    const result = await register(formData);

    if (result.success) {
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } else toast.error("Email đã tồn tại hoặc có lỗi!");

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* BLUR DECORATION */}
      <div className="absolute w-[380px] h-[380px] bg-blue-300/20 rounded-full blur-[120px] top-10 left-10"></div>
      <div className="absolute w-[360px] h-[360px] bg-blue-600/20 rounded-full blur-[150px] bottom-10 right-10"></div>

      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col justify-center px-16 animate-slideRight">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-6 drop-shadow">
          ClothesAI
        </h1>
        <p className="text-gray-600 text-xl max-w-md leading-relaxed">
          Chỉ mất 10 giây — tạo tài khoản và khám phá thế giới thời trang với AI 🌟
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 animate-fadeUp">

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Tạo tài khoản mới</h2>
          <p className="text-gray-500 mt-1">Nhanh – tiện lợi – hiện đại</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Name */}
          <div>
            <label className="form-label">Họ và tên</label>
            <div className="input-icon">
              <span>🧍</span>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="input-field pl-12"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Email</label>
            <div className="input-icon">
              <span>📧</span>
              <input
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

          <div>
  <label className="form-label">Mật khẩu</label>

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


          <div>
            <label className="form-label">Xác nhận mật khẩu</label>
            <div className="input-icon">
              <span>✔</span>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className="input-field pl-12"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

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
  background: #fff;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
  outline: none;
}

        `}
      </style>

    </div>
  );
};

export default RegisterPage;
