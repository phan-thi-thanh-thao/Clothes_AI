import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/mockData";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ==================== PRODUCT IMAGES ==================== */}
        <div>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  className="w-full h-20 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ==================== PRODUCT INFO ==================== */}
        <div>
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-500 text-lg mb-4">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-3 text-gray-600 text-sm">
              ({product.reviews} đánh giá)
            </span>
          </div>

          {/* Price */}
          <div className="mb-8">
            <span className="text-4xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through ml-4">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Kích thước</h3>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                    selectedSize === size
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Màu sắc</h3>
            <div className="flex gap-3">
              {["Đen", "Trắng", "Xám"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                    selectedColor === color
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Số lượng</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 text-xl font-bold rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100"
              >
                -
              </button>

              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 text-xl font-bold rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-5 mb-10">
            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize, selectedColor);
                toast.success("Đã thêm vào giỏ hàng!");
              }}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow"
            >
              Thêm vào giỏ hàng
            </button>

            <button className="w-14 h-14 flex items-center justify-center border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition text-2xl">
              ♥
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              Sản phẩm chất lượng cao, thiết kế hiện đại và phù hợp với xu hướng thời trang.
              Chất liệu cao cấp, thoáng mát và bền đẹp. Phù hợp cho nhiều dịp khác nhau.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
