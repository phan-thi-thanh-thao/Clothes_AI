import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopBanner from "../components/TopBanner";

const UserLayout = () => {
  const location = useLocation();

  // Những trang thanh toán nên ít noise UI hơn (đẹp hơn)
  const hideTopBannerOn = ["/payment-success", "/payment-failed"];
  const hideHeaderOn = ["/payment-success", "/payment-failed"];
  const hideFooterOn = ["/payment-success", "/payment-failed"];

  const isMinimalPage = hideTopBannerOn.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/20">
      
      {/* 🔵 TOP BANNER */}
      {!hideTopBannerOn.includes(location.pathname) && <TopBanner />}

      {/* 🔵 HEADER */}
      {!hideHeaderOn.includes(location.pathname) && <Header />}

      {/* MAIN CONTENT */}
      <main className={`flex-1 pt-6 pb-10 ${isMinimalPage ? "mt-10" : ""}`}>
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default UserLayout;
