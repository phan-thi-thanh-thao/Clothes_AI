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

  // Format VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính % Giảm giá
  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // Ảnh fallback
  const productImage =
    product.image || product.images?.[0] || "/placeholder.png";

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative border border-gray-100 hover:scale-[1.02]">

      {/* BADGE FLASH SALE */}
      {flash && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-20">
          FLASH SALE
        </div>
      )}

      {/* BADGE DISCOUNT */}
      {discountPercent > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-20">
          -{discountPercent}%
        </div>
      )}

      {/* CARD CONTENT */}
      <Link to={`/products/${product.id}`}>
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover overlay nhẹ */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500"></div>
        </div>

        {/* INFO AREA */}
        <div className="p-4 pb-20"> {/* thêm pb-20 để chừa chỗ cho nút */}
          {/* TITLE */}
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 min-h-[52px] group-hover:text-blue-600 transition">
            {product.name}
          </h3>

          {/* CATEGORY */}
          <p className="text-gray-500 text-sm mt-1 mb-2">
            {product.category}
          </p>

          {/* RATING */}
          <div className="flex items-center text-yellow-400 text-sm mb-2">
            <AiFillStar className="mr-1" />
            <span>{product.rating || 4.8}</span>
            <span className="text-gray-500 ml-1 text-xs">
              ({product.reviews || 120})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-end space-x-2 mt-1">
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

      {/* ADD TO CART (CỐ ĐỊNH - KHÔNG SLIDE) */}
      <button
        onClick={handleAddToCart}
        className="
          absolute bottom-0 left-0 right-0 
          bg-blue-600 text-white py-3 text-center font-medium 
          rounded-b-3xl
          hover:bg-blue-700 hover:scale-[1.02]
          transition-all duration-200
        "
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
