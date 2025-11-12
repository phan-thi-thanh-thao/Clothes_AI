const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ClothesAI</h3>
            <p className="text-gray-300 mb-4">
              Hệ thống mua sắm quần áo trực tuyến với công nghệ AI tìm kiếm theo hình ảnh.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Trang chủ</a></li>
              <li><a href="/products" className="hover:text-white">Sản phẩm</a></li>
              <li><a href="/search" className="hover:text-white">Tìm kiếm AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Chính sách</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white">Chính sách đổi trả</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@clothesai.com</p>
              <p>Hotline: 1900-1234</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 ClothesAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;