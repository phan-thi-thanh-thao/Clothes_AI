import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopBanner from "../components/TopBanner";

const UserLayout = () => {
  const location = useLocation();

  // 👇 Các trang cần layout tối giản (không banner + header + footer)
  const minimalPages = [
    "/payment-success",
    "/payment-failed",
    "/payment-pending"
  ];

  const isMinimal = minimalPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* ===========================
          🔵 TOP BANNER HERO (ẩn ở các trang tối giản)
      ============================ */}
      {!isMinimal && (
        <div className="mb-8"> 
          {/* 👉 margin-bottom để TopBanner tách rõ khỏi Header */}
          <TopBanner />
        </div>
      )}

      {/* ===========================
          🔵 HEADER
      ============================ */}
      {!isMinimal && (
        <div className="mb-6">
          {/* 👉 tạo khoảng cách nhỏ để nội dung thoáng hơn */}
          <Header />
        </div>
      )}

      {/* ===========================
          🔵 MAIN CONTENT
      ============================ */}
      <main
        className={`flex-1 ${
          isMinimal ? "py-8" : "py-10"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Outlet />
        </div>
      </main>

      {/* ===========================
          🔵 FOOTER
      ============================ */}
      {!isMinimal && <Footer />}
    </div>
  );
};

export default UserLayout;
