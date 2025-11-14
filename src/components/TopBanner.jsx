import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const offersDefault = [
  "Freeship 0đ toàn quốc",
  "Voucher 10k cho đơn từ 199k",
  "Săn sale cuối tuần — up to 50% OFF",
];

const TopBanner = ({ offers = offersDefault }) => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % offers.length), 3500);
    return () => clearInterval(t);
  }, [offers.length]);

  if (!visible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">

          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="inline-block bg-white/12 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Ưu đãi
            </span>

            {/* Rotating text */}
            <div className="overflow-hidden h-6">
              <div
                className="transition-transform duration-500"
                style={{ transform: `translateY(-${index * 24}px)` }}
              >
                {offers.map((o, i) => (
                  <div key={i} className="h-6 leading-6 text-sm">
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA + Close */}
          <div className="flex items-center gap-3">
            <a
              href="/products"
              className="text-sm font-medium bg-white text-blue-700 px-3 py-1 rounded-md shadow-sm hover:opacity-95 transition"
            >
              Khám phá ngay
            </a>

            <button
              onClick={() => setVisible(false)}
              className="p-1 rounded-full hover:bg-white/10 transition"
            >
              <FiX className="text-white text-lg" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBanner;
