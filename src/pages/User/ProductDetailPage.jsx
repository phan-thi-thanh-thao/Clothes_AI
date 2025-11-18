import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { orders } = useOrder();

  // ======================
  // PRODUCT DATA
  // ======================
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  // UI state
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);

  // Review input
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Show more / less reviews
  const [showAllReviews, setShowAllReviews] = useState(false);

  // ======================
  // LOAD PRODUCT + REVIEWS
  // ======================
  useEffect(() => {
    const loadData = async () => {
      const p = await api.getProduct(id);
      const r = await api.getReviews(id);
      const avg = await api.getAverageRating(id);

      setProduct(p);
      setMainImage(p.image);
      setReviews(r);
      setAvgRating(avg.avg);
    };
    loadData();
  }, [id]);

  // ======================
  // CHECK PURCHASED (must be completed)
  // ======================
  const hasPurchased = useMemo(() => {
    if (!user || !product) return false;

    return orders.some(
      (order) =>
        order.status === "completed" &&
        order.items.some((item) => item.id === product.id)
    );
  }, [orders, user, product?.id]);

  // ======================
  // TOP 2 REVIEWS (highest rating)
  // ======================
  const topTwoReviews = useMemo(() => {
    return [...reviews]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
  }, [reviews]);

  // ======================
  // SHOW LOADING
  // ======================
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p>Đang tải...</p>
      </div>
    );
  }

  // ======================
  // PRICE FORMAT
  // ======================
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // ======================
  // SUBMIT REVIEW
  // ======================
  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    const newReview = {
      productId: product.id,
      userId: user?.id || "u-anonymous",
      userName: user?.name || "Khách hàng",
      rating: reviewRating,
      comment: reviewText,
      images: [],
    };

    await api.addReview(newReview);

    toast.success("Đã gửi đánh giá!");

    const r = await api.getReviews(id);
    const avg = await api.getAverageRating(id);
    setReviews(r);
    setAvgRating(avg.avg);

    setReviewText("");
    setReviewRating(5);
  };

  // ======================
  // JSX MAIN
  // ======================
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ========== IMAGE ========== */}
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

        {/* ========== PRODUCT INFO ========== */}
        <div className="animate-fadeIn">

          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-500 text-lg mt-1">{product.category}</p>

          <div className="flex items-center mt-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(avgRating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462a1 1 0 01.592 1.806l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292a1 1 0 01-1.538 1.118L10 14.347l-2.8 2.03a1 1 0 01-1.538-1.117l1.07-3.292a1 1 0 00-.364-1.118L3.57 8.715A1 1 0 014.162 6.91h3.462a1 1 0 00.95-.69l1.475-4.292z" />
              </svg>
            ))}
            <span className="ml-3 text-gray-600 text-sm">
              {avgRating} / 5 ({reviews.length} đánh giá)
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
                  className={`px-5 py-2.5 rounded-xl font-medium ${
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
                  className={`px-5 py-2.5 rounded-xl font-medium ${
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
                className="w-10 h-10 rounded-full border flex items-center justify-center"
              >
                -
              </button>
              <span className="text-xl font-bold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border flex items-center justify-center"
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
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              Sản phẩm chất lượng cao, thiết kế hiện đại, chất liệu thoáng mát.
            </p>
          </div>

          {/* REVIEW FORM */}
          {hasPurchased ? (
            <div className="mt-10 border-t pt-8">
              <h3 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h3>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewRating(i + 1)}
                    className="text-yellow-400 text-3xl hover:scale-110"
                  >
                    {i < reviewRating ? "★" : "☆"}
                  </button>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Nhập cảm nhận của bạn..."
                className="w-full border rounded-xl p-4 h-32"
              />

              <button
                onClick={handleSubmitReview}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
              >
                Gửi đánh giá
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-4 text-sm italic">
              * Chỉ khách hàng đã mua và đơn hàng đã hoàn thành mới có thể đánh giá.
            </p>
          )}

          {/* ALL REVIEWS */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Phản hồi từ khách hàng</h3>

            {reviews.length === 0 ? (
              <p className="text-gray-500">Chưa có đánh giá nào.</p>
            ) : (
              <div className="space-y-6">

                {(showAllReviews ? reviews : topTwoReviews).map((rev) => (
                  <div
                    key={rev.id}
                    className="border rounded-xl p-5 shadow-sm bg-white"
                  >
                    <div className="font-semibold">{rev.userName}</div>

                    <div className="flex items-center text-yellow-400 mt-1">
                      {Array(rev.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>

                    <p className="mt-2 text-gray-700">{rev.comment}</p>

                    {rev.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {rev.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-full h-28 object-cover rounded-xl shadow"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(rev.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                ))}

                {/* SHOW MORE / SHOW LESS BUTTON */}
                {reviews.length > 2 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="text-blue-600 font-semibold mt-4 hover:underline"
                  >
                    {showAllReviews ? "Thu gọn" : "Xem thêm đánh giá"}
                  </button>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
