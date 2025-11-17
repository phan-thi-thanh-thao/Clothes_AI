import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import { products } from "../../data/mockData";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { orders } = useOrder();

  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const [mainImage, setMainImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // -------------------------------
  // Check if user purchased this product at least once
  // -------------------------------
  const hasPurchased = useMemo(() => {
    if (!user) return false;
    return orders.some((order) =>
      order.items.some((item) => item.id === product.id)
    );
  }, [orders, user, product.id]);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    toast.success("Đã gửi đánh giá! (mock FE)");
    setReviewText("");
    setReviewRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-16">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ==================== IMAGE GALLERY ==================== */}
        <div>
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[480px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {[product.image, product.image, product.image, product.image].map(
              (img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
                    mainImage === img
                      ? "border-blue-600 shadow-lg"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-24 object-cover hover:opacity-80 transition"
                    alt="thumb"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* ==================== PRODUCT INFO ==================== */}
        <div className="animate-fadeIn">

          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-gray-500 text-lg mt-1">{product.category}</p>

          <div className="flex items-center mt-4 mb-6">
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
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-3 text-gray-600 text-sm">
              ({product.reviews} đánh giá)
            </span>
          </div>

          <div className="mb-10">
            <span className="text-4xl font-extrabold text-blue-600">
              {formatPrice(product.price)}
            </span>

            {discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through ml-5">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="ml-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* SIZE */}
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

          {/* COLOR */}
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

          {/* QUANTITY */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3">Số lượng</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-100 bg-white"
              >
                -
              </button>

              <span className="text-xl font-bold w-12 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-100 bg-white"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <div className="flex gap-5 mb-16">
            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize, selectedColor);
                toast.success("Đã thêm vào giỏ hàng!");
              }}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Thêm vào giỏ hàng
            </button>

            <button className="w-14 h-14 flex items-center justify-center border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition text-2xl">
              ♥
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              Sản phẩm chất lượng cao, thiết kế hiện đại, chất liệu thoáng mát và bền đẹp.
              Phù hợp cho nhiều dịp khác nhau – đi học, đi chơi, đi làm.
            </p>
          </div>

          {/* ================= REVIEW SECTION ================= */}
          {hasPurchased && (
            <div className="mt-10 border-t pt-8">
              <h3 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h3>

              {/* Rating stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewRating(i + 1)}
                    className="text-yellow-400 text-3xl hover:scale-110 transition-transform"
                  >
                    {i < reviewRating ? "★" : "☆"}
                  </button>
                ))}
              </div>

              {/* Review text */}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Nhập cảm nhận của bạn về sản phẩm..."
                className="w-full border rounded-xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Submit button */}
              <button
                onClick={handleSubmitReview}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow"
              >
                Gửi đánh giá
              </button>
            </div>
          )}

          {!hasPurchased && (
            <p className="text-gray-500 mt-4 text-sm italic">
              * Chỉ khách hàng đã mua sản phẩm mới có thể đánh giá.
            </p>
          )}
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Sản phẩm tương tự
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn .6s ease-out both;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetailPage;
