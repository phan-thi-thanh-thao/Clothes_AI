import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp!");
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        toast.success("Đăng ký thành công!");
        navigate("/");
      } else {
        toast.error("Có lỗi xảy ra!");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">

        {/* LOGO */}
        <div className="text-center">
          <Link to="/">
            <h1 className="text-4xl font-extrabold text-blue-600 tracking-wide">
              ClothesAI
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="text-gray-500 mt-2">Nhanh chóng – tiện lợi – hiện đại</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">

          {/* Full Name */}
          <div>
            <label className="form-label">Họ và tên</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="input-field"
            />
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="input-field"
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="input-field"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className="input-field"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      {/* Tailwind Custom Styles */}
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

          .form-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 6px;
            display: block;
          }

          .btn-primary {
            padding: 13px 20px;
            background: linear-gradient(to right, #2563eb, #1d4ed8);
            color: white;
            border-radius: 14px;
            font-weight: 600;
            font-size: 1rem;
            transition: 0.25s;
            box-shadow: 0 3px 10px rgba(37,99,235,0.25);
          }

          .btn-primary:hover {
            background: linear-gradient(to right, #1d4ed8, #1e40af);
          }
        `}
      </style>

    </div>
  );
};

export default RegisterPage;
