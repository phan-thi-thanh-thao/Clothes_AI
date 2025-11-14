import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { banners, products, categories } from "../../data/mockData";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % banners.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ===================== HERO BANNER ===================== */}
      <section className="relative h-[450px] md:h-[550px] overflow-hidden rounded-b-3xl">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-out
              ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          >
            <div
              className="h-full bg-cover bg-center relative flex items-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-400/20" />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl text-white drop-shadow">
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    {banner.title}
                  </h1>

                  <p className="text-lg md:text-2xl opacity-90 mb-6">
                    {banner.subtitle}
                  </p>

                  <Link
                    className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-100 transition shadow-lg"
                    to="/products"
                  >
                    {banner.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all
                ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow"
                    : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <section className="py-16 bg-gray-50 rounded-3xl mt-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Danh mục sản phẩm
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform text-blue-600">
                  {category.icon}
                </div>

                <h3 className="font-semibold text-lg text-gray-700">
                  {category.name}
                </h3>

                <p className="text-gray-500 mt-1">{category.count} sản phẩm</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FLASH SALE ===================== */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white mt-6 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide">
              ⚡ FLASH SALE
            </h2>
            <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
              Đang diễn ra • Deal cực tốt
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} flash />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600">
              Khám phá những sản phẩm được yêu thích nhất
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-700">
              🤖
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Tìm kiếm bằng AI</h3>
            <p className="text-gray-600 mt-2">Upload hình ảnh để tìm sản phẩm tương tự</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-700">
              🚚
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Giao hàng nhanh</h3>
            <p className="text-gray-600 mt-2">Giao hàng toàn quốc trong 1-3 ngày</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-700">
              ⭐
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Chất lượng đảm bảo</h3>
            <p className="text-gray-600 mt-2">Sản phẩm chính hãng, đổi trả 30 ngày</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
