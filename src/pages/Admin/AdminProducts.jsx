import { useState, useEffect } from "react";
import ApiService from "../../services/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    rating: 4.5,
    reviews: 0,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getProducts();
      setProducts(data);
    } catch (e) {
      toast.error("Lỗi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      rating: 4.5,
      reviews: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await ApiService.deleteProduct(id);
      toast.success("Đã xóa sản phẩm");
      loadProducts();
    } catch {
      toast.error("Xóa thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await ApiService.updateProduct(editingProduct.id, formData);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await ApiService.createProduct(formData);
        toast.success("Thêm sản phẩm thành công!");
      }

      loadProducts();
      setShowModal(false);
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Quản lý sản phẩm
        </h1>

        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍  Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Sản phẩm
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Giá
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Đánh giá
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* Product info */}
                <td className="px-6 py-5 flex items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover shadow-sm"
                  />
                  <span className="ml-4 font-medium text-gray-900">{p.name}</span>
                </td>

                <td className="px-6 py-5 text-gray-800">{p.category}</td>
                <td className="px-6 py-5 font-semibold text-gray-900">
                  {new Intl.NumberFormat("vi-VN").format(p.price)} đ
                </td>

                <td className="px-6 py-5 text-gray-800">
                  ⭐ {p.rating} ({p.reviews})
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="py-10 text-center text-gray-500 text-lg">
            Không có sản phẩm nào
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg border border-gray-100">

            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="font-medium text-gray-700 text-sm mb-1 block">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field"
                />
              </div>

              {/* Price */}
              <div>
                <label className="font-medium text-gray-700 text-sm mb-1 block">
                  Giá
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseInt(e.target.value) })
                  }
                  className="input-field"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="font-medium text-gray-700 text-sm mb-1 block">
                  Giá gốc
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      originalPrice: parseInt(e.target.value),
                    })
                  }
                  className="input-field"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-medium text-gray-700 text-sm mb-1 block">
                  Danh mục
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="Áo thun">Áo thun</option>
                  <option value="Quần jeans">Quần jeans</option>
                  <option value="Áo sơ mi">Áo sơ mi</option>
                  <option value="Váy">Váy</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow"
                >
                  {editingProduct ? "Cập nhật" : "Thêm mới"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
              </div>
            </form>

            {/* Custom styles */}
            <style>{`
              .input-field {
                width: 100%;
                padding: 12px 16px;
                border-radius: 14px;
                border: 1px solid #d1d5db;
                background: #f9fafb;
                outline: none;
                transition: 0.2s;
              }
              .input-field:focus {
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
                background: white;
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
