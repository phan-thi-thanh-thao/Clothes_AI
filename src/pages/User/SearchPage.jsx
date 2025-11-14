import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/mockData";

const SearchPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!selectedImage) return;

    setIsSearching(true);
    // simulate AI
    setTimeout(() => {
      setSearchResults(products.slice(0, 3));
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Tìm kiếm sản phẩm bằng AI
        </h1>
        <p className="text-gray-600 text-lg">
          Upload hình ảnh — AI sẽ phân tích và tìm các sản phẩm tương tự cho bạn.
        </p>
      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-10 mb-12 border border-gray-100">
        <div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50"
        >
          {!imagePreview ? (
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="text-7xl mb-4">📷</div>

              <p className="text-gray-700 font-medium text-lg">
                Kéo thả hình ảnh hoặc
                <span className="text-blue-600 font-semibold ml-1">chọn file</span>
              </p>

              <p className="text-xs text-gray-500 mt-2">Hỗ trợ PNG, JPG, JPEG (tối đa 10MB)</p>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs mx-auto rounded-xl shadow-md mb-6"
              />

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 shadow"
                >
                  {isSearching ? "Đang tìm kiếm..." : "Tìm kiếm"}
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    setSearchResults([]);
                  }}
                  className="px-8 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition shadow"
                >
                  Chọn ảnh khác
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Searching Animation */}
      {isSearching && (
        <div className="text-center py-10">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-lg font-medium text-gray-700">
              AI đang phân tích hình ảnh...
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Kết quả tìm kiếm ({searchResults.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow p-10 border border-gray-100">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Cách thức hoạt động
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Step 1 */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold mb-1">Upload hình ảnh</h4>
            <p className="text-gray-600 text-sm">Chọn hình ảnh sản phẩm bạn muốn tìm kiếm.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">2</span>
            </div>
            <h4 className="font-semibold mb-1">AI phân tích</h4>
            <p className="text-gray-600 text-sm">AI nhận dạng đặc điểm sản phẩm trong ảnh.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <h4 className="font-semibold mb-1">Gợi ý tương tự</h4>
            <p className="text-gray-600 text-sm">Hệ thống trả về sản phẩm giống nhất.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;
