import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopBanner from "../components/TopBanner"; // ⬅️ Thêm dòng này

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/20">
      
      {/* 🔵 TOP BANNER */}
      <TopBanner />

      {/* 🔵 HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-4 pb-10">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default UserLayout;
