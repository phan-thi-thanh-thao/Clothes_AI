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

    // Simulate AI processing
    setTimeout(() => {
      setSearchResults(products.slice(0, 3));
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-16">

      {/* =================== TITLE =================== */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Tìm kiếm bằng hình ảnh (AI Search)
        </h1>
        <p className="text-gray-600 text-lg">
          Upload hình ảnh – AI sẽ phân tích và tìm những sản phẩm tương tự nhất.
        </p>
      </div>

      {/* =================== UPLOAD ZONE =================== */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-12 border border-gray-100">
        <label
          htmlFor="image-upload"
          className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center bg-gray-50 hover:border-blue-500 hover:bg-blue-50/30 transition-all"
        >
          {!imagePreview ? (
            <>
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-gray-700 text-lg font-medium">
                Kéo thả hình ảnh hoặc
                <span className="text-blue-600 font-semibold ml-1">Chọn ảnh</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Hỗ trợ JPG, JPEG, PNG — tối đa 10MB
              </p>
            </>
          ) : (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs mx-auto rounded-xl shadow-md mb-6"
              />

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSearching ? "AI đang phân tích..." : "Tìm kiếm"}
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    setSearchResults([]);
                  }}
                  className="px-8 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition"
                >
                  Chọn ảnh khác
                </button>
              </div>
            </>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* =================== AI LOADING ANIMATION =================== */}
      {isSearching && (
        <div className="text-center py-14">
          <div className="inline-flex flex-col items-center">

            <div className="relative">
              <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

              {/* laser scan line */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-400 animate-pulse"></div>
            </div>

            <p className="text-gray-700 mt-4 text-lg font-medium">
              AI đang phân tích hình ảnh...
            </p>
          </div>
        </div>
      )}

      {/* =================== RESULTS =================== */}
      {searchResults.length > 0 && !isSearching && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Kết quả tìm kiếm ({searchResults.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* =================== HOW IT WORKS =================== */}
      <div className="max-w-4xl mx-auto mt-24 bg-white rounded-3xl shadow-lg p-12 border border-gray-100">
        <h3 className="text-3xl font-bold mb-10 text-center">
          Cách AI hoạt động
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 shadow">
              <span className="text-2xl font-bold text-blue-700">1</span>
            </div>
            <h4 className="font-semibold text-lg mb-1">Upload hình ảnh</h4>
            <p className="text-gray-600 text-sm">
              Chọn hoặc kéo thả ảnh sản phẩm cần tìm.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 shadow">
              <span className="text-2xl font-bold text-blue-700">2</span>
            </div>
            <h4 className="font-semibold text-lg mb-1">AI phân tích</h4>
            <p className="text-gray-600 text-sm">
              AI quét hình ảnh và nhận diện các đặc điểm nổi bật.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 shadow">
              <span className="text-2xl font-bold text-blue-700">3</span>
            </div>
            <h4 className="font-semibold text-lg mb-1">Gợi ý tương tự</h4>
            <p className="text-gray-600 text-sm">
              Hệ thống trả về các sản phẩm phù hợp nhất.
            </p>
          </div>

        </div>
      </div>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes pulseLine {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default SearchPage;
