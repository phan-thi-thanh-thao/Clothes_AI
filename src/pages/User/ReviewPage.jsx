import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ReviewPage = () => {
  const { orderId, productId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrder();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // =============================
  // LOAD PRODUCT INFO
  // =============================
  useEffect(() => {
    const load = async () => {
      const p = await api.getProduct(productId);
      setProduct(p);
    };
    load();
  }, [productId]);

  if (!product) return <p>Đang tải...</p>;

  // =============================
  // VALIDATE ORDER
  // =============================
  const order = orders.find((o) => o.id === Number(orderId));

  if (!order) {
    return <p className="p-10 text-red-500">Không tìm thấy đơn hàng.</p>;
  }

  const item = order.items.find((i) => i.id === Number(productId));

  if (!item) {
    return <p className="p-10 text-red-500">Sản phẩm không thuộc đơn hàng này.</p>;
  }

  if (order.status !== "delivered") {
    return (
      <p className="p-10 text-red-500">
        Đơn hàng chưa giao, bạn không thể đánh giá.
      </p>
    );
  }

  // =============================
  // HANDLE IMAGE UPLOAD
  // =============================
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // =============================
  // SUBMIT REVIEW
  // =============================
  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    // Upload ảnh mock
    let uploaded = [];
    if (images.length > 0) {
      uploaded = await api.uploadImages(images);
    }

    // Create review object
    const newReview = {
      productId: Number(productId),
      userId: user?.id || "guest",
      userName: user?.name || "Khách hàng",
      rating,
      comment,
      images: uploaded,
    };

    await api.addReview(newReview);

    toast.success("Đánh giá thành công!");

    navigate(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Đánh giá sản phẩm</h1>

      {/* ================= PRODUCT SUMMARY ================= */}
      <div className="flex gap-4 mb-8 p-4 border rounded-2xl bg-white shadow-sm">
        <img
          src={product.image}
          className="w-20 h-20 object-cover rounded-xl"
          alt=""
        />
        <div>
          <h2 className="font-bold text-lg">{product.name}</h2>
          <p className="text-gray-600">Danh mục: {product.category}</p>
        </div>
      </div>

      {/* ================= RATING ================= */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Chọn số sao</h3>
        <div className="flex gap-2 text-4xl">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              className={`transition-transform ${
                s <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:scale-110`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* ================= COMMENT ================= */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Nhận xét</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập cảm nhận của bạn về sản phẩm..."
          className="w-full border rounded-xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ================= IMAGES ================= */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Hình ảnh (tùy chọn)</h3>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="mb-3"
        />

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-28 object-cover rounded-xl border shadow"
                alt="preview"
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= SUBMIT ================= */}
      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
      >
        Gửi đánh giá
      </button>
    </div>
  );
};

export default ReviewPage;
