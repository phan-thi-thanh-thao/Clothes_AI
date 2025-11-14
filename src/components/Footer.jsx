import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 pt-16 pb-10 mt-16 rounded-t-3xl shadow-xl">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-5 tracking-wide drop-shadow">
              ClothesAI
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Nền tảng thời trang hiện đại ứng dụng AI để tìm kiếm và gợi ý sản phẩm nhanh chóng, chính xác.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-white transition">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 hover:text-white transition">
                  Tìm kiếm AI
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Chính sách</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Bảo mật thông tin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liên hệ</h4>
            <p className="text-gray-300 text-sm">Email: support@clothesai.com</p>
            <p className="text-gray-300 text-sm mt-1">Hotline: 1900-1234</p>

            {/* Icons */}
            <div className="flex items-center space-x-4 mt-5">
              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-blue-700 mt-12 pt-6 text-center text-gray-300 text-sm">
          © 2024 ClothesAI — Mọi quyền được bảo lưu.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
