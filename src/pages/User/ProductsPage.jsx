import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../data/mockData";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10">

        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28 border border-gray-100">

            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Bộ lọc tìm kiếm
            </h3>

            {/* CATEGORY FILTER */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Danh mục</h4>

              <div className="space-y-2 text-gray-600">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>Tất cả</span>
                </label>

                {categories.map((category) => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      checked={selectedCategory === category.name}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE FILTER */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Khoảng giá</h4>
              <div className="space-y-2 text-gray-600">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Dưới 500,000đ</span>
                </label>

                <label className="filter-option">
                  <input type="checkbox" />
                  <span>500,000đ – 1,000,000đ</span>
                </label>

                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Trên 1,000,000đ</span>
                </label>
              </div>
            </div>

            {/* SORT */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Sắp xếp</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="name">Tên A-Z</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </aside>

        {/* ================= PRODUCTS GRID ================= */}
        <section className="lg:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sản phẩm</h1>
            <p className="text-gray-600">{filteredProducts.length} sản phẩm</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Không tìm thấy sản phẩm nào phù hợp.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .filter-option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.25s;
          }

          .filter-option:hover {
            background: #f3f4f6;
            color: #2563eb;
          }

          .filter-option input {
            accent-color: #2563eb;
          }
        `}
      </style>
    </div>
  );
};

export default ProductsPage;
