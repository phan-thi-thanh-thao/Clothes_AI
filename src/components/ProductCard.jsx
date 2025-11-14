import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";

const ProductCard = ({ product, flash = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, "M", "Đen");
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100">

      {/* FLASH SALE BADGE – tone xanh */}
      {flash && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg z-20">
          FLASH SALE
        </div>
      )}

      <Link to={`/products/${product.id}`}>

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>

          {/* CATEGORY */}
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>

          {/* RATING */}
          <div className="flex items-center text-yellow-400 text-sm mb-2">
            <AiFillStar className="mr-1" />
            <span>{product.rating || 4.8}</span>
            <span className="text-gray-500 ml-1 text-xs">({product.reviews})</span>
          </div>

          {/* PRICE */}
          <div className="flex items-end space-x-2">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice > product.price && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ADD TO CART BUTTON – tone xanh */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-3 text-center font-medium transform translate-y-full group-hover:translate-y-0 transition-all duration-300"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
