const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 pt-14 pb-8 mt-12 rounded-t-3xl">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
              ClothesAI
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Nền tảng mua sắm thời trang hiện đại, ứng dụng AI để tìm kiếm sản phẩm qua hình ảnh nhanh và chính xác.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Liên kết nhanh</h4>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Trang chủ</a></li>
              <li><a href="/products" className="footer-link">Sản phẩm</a></li>
              <li><a href="/search" className="footer-link">Tìm kiếm AI</a></li>
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
            <div className="space-y-3 text-gray-300">
              <p>Email: support@clothesai.com</p>
              <p>Hotline: 1900-1234</p>

              <div className="flex items-center space-x-4 mt-4">
                <a href="#" className="footer-icon">📘</a>
                <a href="#" className="footer-icon">📸</a>
                <a href="#" className="footer-icon">🐦</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-6 text-center text-gray-300 text-sm">
          © 2024 ClothesAI — Mọi quyền được bảo lưu.
        </div>
      </div>

      <style>
        {`
          .footer-title {
            font-size: 1.15rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 1rem;
          }
          .footer-link {
            color: #d1d5db;
            transition: 0.25s;
          }
          .footer-link:hover {
            color: white;
          }
          .footer-list li {
            margin-bottom: 0.6rem;
          }
          .footer-icon {
            font-size: 1.6rem;
            transition: 0.25s;
          }
          .footer-icon:hover {
            transform: scale(1.15);
            color: #fff;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
