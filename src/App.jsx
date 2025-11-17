import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// User Pages
import HomePage from './pages/User/HomePage';
import ProductsPage from './pages/User/ProductsPage';
import ProductDetailPage from './pages/User/ProductDetailPage';
import LoginPage from './pages/User/LoginPage';
import RegisterPage from './pages/User/RegisterPage';
import CartPage from './pages/User/CartPage';
import SearchPage from './pages/User/SearchPage';
import ProfilePage from './pages/User/ProfilePage';
import OrdersPage from './pages/User/OrdersPage';
import CheckoutPage from './pages/User/CheckoutPage';
import DiscountPage from "./pages/User/DiscountPage";



// Payment Pages
import PaymentSuccess from './pages/User/Payment/PaymentSuccess';
import PaymentFailed from './pages/User/Payment/PaymentFailed';
import PaymentPending from './pages/User/Payment/PaymentPending';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <Routes>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* User Routes */}
              <Route path="/" element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="discounts" element={<DiscountPage />} />
                <Route
                  path="checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />

                {/* 🔥 PAYMENT ROUTES */}
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="payment-failed" element={<PaymentFailed />} />
                <Route path="payment-pending" element={<PaymentPending />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>

            </Routes>

            <Toaster position="top-right" />
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
