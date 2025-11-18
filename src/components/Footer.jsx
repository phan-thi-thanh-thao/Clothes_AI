import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24 pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-3xl font-extrabold text-blue-700 mb-5 tracking-tight">
              ClothesAI
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Nền tảng thời trang ứng dụng AI giúp bạn tìm kiếm và gợi ý sản phẩm chính xác – nhanh chóng – thông minh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Liên kết nhanh</h4>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Trang chủ</a></li>
              <li><a href="/products" className="footer-link">Sản phẩm</a></li>
              <li><a href="/search" className="footer-link">Tìm kiếm AI</a></li>
              <li><a href="/discounts" className="footer-link">Ưu đãi</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="footer-title">Chính sách</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Bảo mật thông tin</a></li>
              <li><a href="#" className="footer-link">Điều khoản sử dụng</a></li>
              <li><a href="#" className="footer-link">Chính sách đổi trả</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Liên hệ</h4>
            <p className="text-gray-600 text-sm">Email: support@clothesai.com</p>
            <p className="text-gray-600 text-sm mt-1">Hotline: 1900-1234</p>

            {/* Icons */}
            <div className="flex items-center space-x-4 mt-5">
              <a href="#" className="footer-icon"><FaFacebookF /></a>
              <a href="#" className="footer-icon"><FaInstagram /></a>
              <a href="#" className="footer-icon"><FaTwitter /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-14 pt-6 text-center text-gray-500 text-sm">
          © 2024 ClothesAI — Mọi quyền được bảo lưu.
        </div>

      </div>

      {/* EXTRA CSS */}
      <style>{`
        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }

        .footer-list {
          display: grid;
          gap: 0.5rem;
        }

        .footer-link {
          color: #4b5563;
          font-size: 0.95rem;
          transition: .25s;
        }
        .footer-link:hover {
          color: #1e40af;
          transform: translateX(3px);
        }

        .footer-icon {
          font-size: 1.25rem;
          color: #475569;
          transition: .25s;
        }
        .footer-icon:hover {
          color: #2563eb;
          transform: scale(1.15);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
