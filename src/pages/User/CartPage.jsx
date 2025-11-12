import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalAmount } = useCart();
  const { isAuthenticated } = useAuth();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center p-6 border-b last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>Size: {item.size}</span>
                    <span className="ml-4">Màu: {item.color}</span>
                  </div>
                  <p className="text-blue-600 font-semibold mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <div className="ml-6">
                  <p className="font-semibold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-red-600 hover:text-red-800 text-sm mt-1"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">{formatPrice(getTotalAmount())}</span>
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors block text-center font-semibold"
              >
                Tiến hành thanh toán
              </Link>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors block text-center font-semibold"
                >
                  Đăng nhập để thanh toán
                </Link>
                <p className="text-sm text-gray-600 text-center">
                  Hoặc{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800">
                    đăng ký tài khoản mới
                  </Link>
                </p>
              </div>
            )}

            <Link
              to="/products"
              className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors block text-center"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;