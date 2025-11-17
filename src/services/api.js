import { products } from '../data/mockData';

class ApiService {
  // ============================
  // 🔍 AI SEARCH (Mock)
  // ============================
  async searchByImage(imageFile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = products.slice(0, 3); // mock
        resolve(results);
      }, 2000);
    });
  }

  // ============================
  // 🛒 PRODUCT APIs (Mock)
  // ============================
  async getProducts(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...products];

        if (filters.category) {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }

        if (filters.search) {
          filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        resolve(filteredProducts);
      }, 500);
    });
  }

  async getProduct(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id));
        resolve(product);
      }, 300);
    });
  }

  async createProduct(productData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: Date.now(),
          ...productData,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop'
        };
        products.push(newProduct);
        resolve(newProduct);
      }, 1000);
    });
  }

  async updateProduct(id, productData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          products[index] = { ...products[index], ...productData };
          resolve(products[index]);
        }
      }, 1000);
    });
  }

  async deleteProduct(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          products.splice(index, 1);
        }
        resolve(true);
      }, 500);
    });
  }

  // ============================
  // 👤 USER MANAGEMENT (Mock)
  // ============================
  async getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = [
          { id: 1, name: 'Admin', email: 'admin@admin.com', role: 'admin', status: 'active' },
          { id: 2, name: 'Nguyễn Văn A', email: 'user@user.com', role: 'user', status: 'active' },
          { id: 3, name: 'Trần Thị B', email: 'user2@user2.com', role: 'user', status: 'active' }
        ];
        resolve(users);
      }, 500);
    });
  }

  async updateUserStatus(userId, status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }

  // ==================================================
  // 💳 THANH TOÁN MOMO / VNPAY (MOCK + BE READY)
  // ==================================================

  /**
   * FE MOCK THANH TOÁN MoMo
   * ---------------------------------------------------------
   * Khi backend chưa làm, FE redirect bên trong dự án luôn.
   * Sau này có BE thật → đổi thành this.momoPaymentReal()
   */
  async momoPaymentMock(payload) {
    console.log("MOCK MOMO PAYLOAD:", payload);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          payUrl: `/payment-success?orderId=${payload.orderId}&method=momo`
        });
      }, 800);
    });
  }

  /**
   * FE MOCK THANH TOÁN VNPay
   */
  async vnpayPaymentMock(payload) {
    console.log("MOCK VNPAY PAYLOAD:", payload);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          payUrl: `/payment-success?orderId=${payload.orderId}&method=vnpay`
        });
      }, 800);
    });
  }

  /**
   * THANH TOÁN MOMO REAL (Backend thật)
   */
  async momoPaymentReal(payload) {
    const res = await fetch("http://localhost:3000/api/payment/momo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }

  /**
   * THANH TOÁN VNPay REAL (Backend thật)
   */
  async vnpayPaymentReal(payload) {
    const res = await fetch("http://localhost:3000/api/payment/vnpay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}

export default new ApiService();
