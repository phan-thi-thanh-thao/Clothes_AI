import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { banners, products, categories as origCategories } from "../../data/mockData";

/**
 * HomePage V3 — Premium Blue (Flash Sale full-slider, Category style B, Top tuần auto-scroll)
 *
 * Notes:
 * - Categories images are overridden with curated Unsplash links (high-quality editorial).
 * - Flash Sale: groups of 3 cards per slide, auto-advances, smooth transform-based slider (no scrollbar).
 * - Top Tuần: horizontal auto-scroll list (small cards), loops.
 * - Uses basic JS + Tailwind; no external carousel libs.
 */

const CATEGORY_IMAGES = {
  "Áo thun": "https://images.unsplash.com/photo-1585386959984-a4155228f618?auto=format&fit=crop&w=1200&q=80",
  "Quần jeans": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
  "Áo sơ mi": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  "Váy": "https://images.unsplash.com/photo-1520975922215-1c00daaf64b4?auto=format&fit=crop&w=1200&q=80",
  "Giày": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  "Phụ kiện": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
};

const HomePage = () => {
  // Banner slide
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Flash sale slider (3 cards per slide)
  const FLASH_PER_SLIDE = 3;
  const flashProducts = products.slice(0, 12); // pick first 12 for flash (demo)
  const flashSlides = [];
  for (let i = 0; i < flashProducts.length; i += FLASH_PER_SLIDE) {
    flashSlides.push(flashProducts.slice(i, i + FLASH_PER_SLIDE));
  }
  const [flashIndex, setFlashIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFlashIndex((i) => (i + 1) % flashSlides.length), 4500);
    return () => clearInterval(t);
  }, [flashSlides.length]);

  // Top tuần auto-scroll (small cards)
  const topRef = useRef(null);
  const [topPaused, setTopPaused] = useState(false);
  useEffect(() => {
    const el = topRef.current;
    if (!el) return;
    let rafId;
    let speed = 0.6; // px per frame approx
    const step = () => {
      if (!topPaused) {
        el.scrollLeft += speed;
        // loop when near end
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [topPaused]);

  // Category list with images
  const categories = origCategories.map((c) => ({
    ...c,
    image: CATEGORY_IMAGES[c.name] || CATEGORY_IMAGES["Phụ kiện"],
  }));

  // helper format price (if number)
  const fmt = (v) =>
    typeof v === "number" ? v.toLocaleString("vi-VN") + " ₫" : v;

  return (
    <div className="overflow-x-hidden bg-white text-gray-900">

      {/* HERO (kept simple but premium blue overlay) */}
      <section className="relative h-[480px] md:h-[640px] rounded-b-[28px] overflow-hidden shadow-2xl">
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === slide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${b.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-700/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/25" />
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
              <div className="max-w-2xl text-white animate-slideUp">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow">
                  {b.title}
                </h1>
                <p className="text-lg md:text-xl opacity-95 mb-6">{b.subtitle}</p>
                <Link to="/products" className="inline-block px-8 py-3 bg-white text-blue-700 rounded-full font-semibold shadow hover:scale-[1.02] transition">
                  {b.buttonText || "Khám phá"}
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === slide ? "bg-white scale-150 shadow-2xl" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES — style B (medium image cards) */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Danh mục nổi bật</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${encodeURIComponent(c.name)}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="h-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <p className="text-sm opacity-80">{c.count} sản phẩm</p>
                </div>
                {/* subtle glow border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-300/40 group-hover:shadow-[0_10px_40px_rgba(37,99,235,0.12)] transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE — slider full-width style B (3 per slide) */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-3xl p-8 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-extrabold">⚡ FLASH SALE</h3>
              <div className="text-sm bg-white/20 px-3 py-1 rounded">{/* status */}Đang diễn ra</div>
            </div>

            {/* Slider container */}
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  width: `${flashSlides.length * 100}%`,
                  transform: `translateX(-${flashIndex * (100 / flashSlides.length)}%)`,
                }}
              >
                {flashSlides.map((slideChunk, si) => (
                  <div key={si} className="w-[100%] flex gap-6 px-2" style={{ paddingLeft: "4px", paddingRight: "4px" }}>
                    {/* center inner row: show 3 items equally spaced */}
                    <div className="flex w-full justify-center gap-6">
                      {slideChunk.map((p) => (
                        <div key={p.id} className="w-[320px] min-w-[320px] max-w-[320px]">
                          {/* product card shell to keep flash style */}
                          <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
                            <div className="relative">
                              <img src={p.image} alt={p.name} className="w-full h-52 object-cover" />
                              {/* badges */}
                              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">FLASH</div>
                              {p.originalPrice > p.price && (
                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 line-clamp-2">{p.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">{p.category}</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div>
                                  <div className="text-lg font-bold text-blue-700">{fmt(p.price)}</div>
                                  {p.originalPrice > p.price && <div className="text-sm text-gray-400 line-through">{fmt(p.originalPrice)}</div>}
                                </div>
                                <Link to={`/products/${p.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                                  Xem
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* fill blanks if chunk < FLASH_PER_SLIDE */}
                      {slideChunk.length < FLASH_PER_SLIDE &&
                        Array.from({ length: FLASH_PER_SLIDE - slideChunk.length }).map((_, k) => (
                          <div key={`empty-${k}`} className="w-[320px] min-w-[320px]" />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* controls (optional) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {flashSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFlashIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${i === flashIndex ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP TUẦN — small horizontal auto-scroll */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-extrabold">Top tuần</h3>
            <Link to="/products" className="text-sm text-blue-600 font-medium">Xem tất cả</Link>
          </div>

          <div
            ref={topRef}
            onMouseEnter={() => setTopPaused(true)}
            onMouseLeave={() => setTopPaused(false)}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-1"
          >
            {products.slice(0, 12).map((p) => (
              <div key={p.id} className="min-w-[220px] bg-white rounded-2xl shadow hover:shadow-lg transition p-3">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">HOT</div>
                </div>
                <div className="mt-3">
                  <div className="font-medium text-gray-900 line-clamp-2">{p.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{fmt(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL — High-end highlight */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img src="/images/editorial/fashion1.jpg" alt="editorial" className="rounded-3xl shadow-2xl object-cover w-full h-[420px]" />
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">High-end Fashion</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">Bộ sưu tập thời trang cao cấp dành riêng cho bạn. Thiết kế sang trọng, chất liệu thượng hạng.</p>
            <Link to="/products" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">Khám phá ngay</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS — grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-extrabold text-center mb-10">Sản phẩm nổi bật</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((p) => (
              <div key={p.id} className="reveal">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: keep using your Footer component (we updated earlier). */}
      {/* Global animations & helper CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform:translateY(0);} }
        .animate-slideUp { animation: slideUp .8s ease-out both; }
        /* reveal animation */
        .reveal { opacity: 0; transform: translateY(20px); transition: all .9s ease; }
        .reveal.active { opacity:1; transform: translateY(0); }
        /* utility: clamp lines if needed (requires -webkit-line-clamp support) */
        .line-clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
      `}</style>

      <ScriptRevealObserver />
    </div>
  );
};

// Small component to observe .reveal elements and add .active
const ScriptRevealObserver = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("active")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
};

export default HomePage;
