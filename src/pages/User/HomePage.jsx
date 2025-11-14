import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { banners, products, categories } from "../../data/mockData";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // countdown for Today Deals (24 hours from page load)
  const [timeLeft, setTimeLeft] = useState(() => 24 * 60 * 60); // seconds

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % banners.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // pick 3 deals from products (use real product images)
  const dealProducts = products.slice(5, 8).length ? products.slice(5, 8) : products.slice(0, 3);

  return (
    <div className="overflow-x-hidden bg-white">

     {/* ===================== HERO BANNER (PREMIUM VERSION) ===================== */}
<section className="relative h-[480px] md:h-[600px] overflow-hidden rounded-b-[38px] shadow-lg">

  {banners.map((banner, index) => (
    <div
      key={banner.id}
      className={`absolute inset-0 transition-all duration-[1200ms] ease-out
      ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
    >
      {/* Background image */}
      <div
        className="h-full w-full bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        {/* Layer 1: dark to light diagonal gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-900/40 to-transparent" />

        {/* Layer 2: subtle top and bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

        {/* CONTENT */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.3)] animate-slideUp">
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              {banner.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl opacity-95 mb-8 font-light">
              {banner.subtitle}
            </p>

            {/* CTA Button */}
            <Link
              to="/products"
              className="inline-block px-10 py-3 bg-white text-blue-700 font-bold text-lg rounded-full shadow-xl hover:bg-blue-100 hover:-translate-y-1 transition-all"
            >
              {banner.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* SLIDE DOTS */}
  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
    {banners.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300
        ${
          index === currentSlide
            ? "bg-white scale-150 shadow-xl"
            : "bg-white/40 hover:bg-white/60"
        }`}
      />
    ))}
  </div>

  {/* Extra subtle animated overlay */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] animate-pulse-slow" />
</section>

     {/* ===================== CATEGORIES (PREMIUM VERSION) ===================== */}
<section className="py-20 mt-10">
  <div className="container mx-auto px-4">

    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14 tracking-tight">
      Danh mục nổi bật
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/products?category=${category.name}`}
          className="group relative block rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100"
        >
          {/* Ảnh nền */}
          <div
            className="w-full h-40 sm:h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${category.image})` }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-all"></div>

          {/* Nội dung */}
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg sm:text-xl font-semibold drop-shadow">
              {category.name}
            </h3>
            <p className="text-sm text-white/80 mt-1">
              {category.count} sản phẩm
            </p>
          </div>
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

      {/* ===================== TODAY DEALS (G) — Banner + 3 Cards ===================== */}
      <section className="py-12 mt-10">
        <div className="container mx-auto px-4">

          {/* MAIN BANNER */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div
              className="w-full h-56 md:h-80 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(4,8,27,0.72) 0%, rgba(37,99,235,0.35) 60%), url('/images/deals/banner-deal.jpg')",
              }}
            />

            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
              <div className="max-w-2xl text-white">
                <div className="text-sm uppercase bg-white/10 inline-block px-3 py-1 rounded-full mb-3 font-semibold">
                  Ưu đãi hôm nay
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold leading-tight">
                  Giảm đến <span className="text-yellow-300">30%</span> cho sản phẩm chọn lọc
                </h3>

                <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl">
                  Ưu đãi chỉ trong hôm nay. Nhanh tay chọn sản phẩm yêu thích — số lượng có hạn.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    to="/products"
                    className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-50 transition"
                  >
                    Xem ngay
                  </Link>

                  <div className="text-white text-sm flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 3v1" />
                    </svg>
                    <span>Kết thúc sau</span>
                    <span className="ml-2 font-mono bg-black/20 px-3 py-1 rounded">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Right small highlight (optional) */}
              <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-72">
                <div className="bg-white/5 rounded-2xl p-3">
                  <div className="text-xs text-white/80">Hot pick</div>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={dealProducts[0]?.image || "/placeholder.png"}
                      alt={dealProducts[0]?.name}
                      className="w-14 h-14 object-cover rounded-lg shadow"
                    />
                    <div className="text-white">
                      <div className="font-medium">{dealProducts[0]?.name}</div>
                      <div className="text-sm text-white/80">{dealProducts[0]?.price?.toLocaleString()}₫</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DEAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {dealProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="relative">
                  <img src={p.image || "/placeholder.png"} alt={p.name} className="w-full h-44 object-cover" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    DEAL
                  </div>
                  {p.originalPrice > p.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      -{Math.round(((p.originalPrice - p.price)/p.originalPrice)*100)}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 line-clamp-2">{p.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{p.category}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{p.price.toLocaleString()}₫</div>
                      {p.originalPrice > p.price && (
                        <div className="text-sm text-gray-400 line-through">{p.originalPrice.toLocaleString()}₫</div>
                      )}
                    </div>

                    <Link to={`/products/${p.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS (PREMIUM VERSION) ===================== */}
<section className="py-20 bg-white relative">
  <div className="container mx-auto px-4">

    {/* Title */}
    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
        Sản phẩm nổi bật
      </h2>
      <p className="text-gray-600 text-lg">
        Những sản phẩm được yêu thích & bán chạy nhất tuần này
      </p>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.slice(0, 8).map((product) => (
        <div
          key={product.id}
          className="animate-fadeInUp"
          style={{ animationDelay: `${product.id * 0.06}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <div className="text-center mt-14">
      <Link
        to="/products"
        className="px-10 py-3 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
      >
        Xem tất cả sản phẩm
      </Link>
    </div>

  </div>

  {/* Fade top divider */}
  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
</section>

<style>
{`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp .6s ease-out forwards;
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slideUp {
    animation: slideUp 0.9s ease-out both;
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.04; }
    50% { opacity: 0.08; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 5s ease-in-out infinite;
  }
`}
</style>

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
