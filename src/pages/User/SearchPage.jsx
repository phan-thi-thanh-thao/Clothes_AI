import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/mockData';

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
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setSearchResults(products.slice(0, 3));
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Tìm kiếm sản phẩm bằng AI</h1>
          <p className="text-gray-600">
            Upload hình ảnh sản phẩm để tìm những sản phẩm tương tự trong cửa hàng
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs max-h-64 mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSearching ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setSearchResults([]);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Chọn ảnh khác
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">📷</div>
                <div className="mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Kéo thả hình ảnh vào đây hoặc
                    </span>
                    <span className="text-blue-600 hover:text-blue-500"> chọn file</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-lg">AI đang phân tích hình ảnh...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Kết quả tìm kiếm ({searchResults.length} sản phẩm)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Cách thức hoạt động</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Upload hình ảnh</h4>
              <p className="text-sm text-gray-600">Chọn hình ảnh sản phẩm bạn muốn tìm</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">AI phân tích</h4>
              <p className="text-sm text-gray-600">Hệ thống AI phân tích đặc điểm sản phẩm</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Kết quả tương tự</h4>
              <p className="text-sm text-gray-600">Nhận được danh sách sản phẩm tương tự</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;