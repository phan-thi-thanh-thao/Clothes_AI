// ============================
// IMPORT MOCK DATA (gộp chung 1 file)
// ============================
import { products, mockReviews } from "../data/mockData";

class ApiService {

  // ============================
  // 🔍 AI SEARCH (Mock)
  // ============================
  async searchByImage(imageFile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.slice(0, 3));
      }, 2000);
    });
  }

  // ============================
  // 🛒 PRODUCT APIs (Mock)
  // ============================
  async getProducts(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...products];

        if (filters.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters.search) {
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        resolve(filtered);
      }, 400);
    });
  }

  async getProduct(id) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const product = products.find(p => p.id === Number(id));

        const { avg, total } = await this.getAverageRating(id);

        resolve({
          ...product,
          rating: avg > 0 ? avg : product?.rating,
          reviews: total > 0 ? total : product?.reviews
        });
      }, 300);
    });
  }

  async createProduct(productData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: Date.now(),
          ...productData,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop"
        };
        products.push(newProduct);
        resolve(newProduct);
      }, 800);
    });
  }

  async updateProduct(id, productData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === Number(id));
        if (index !== -1) {
          products[index] = { ...products[index], ...productData };
          resolve(products[index]);
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  async deleteProduct(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === Number(id));
        if (index !== -1) products.splice(index, 1);
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
        resolve([
          { id: 1, name: "Admin", email: "admin@admin.com", role: "admin", status: "active" },
          { id: 2, name: "Nguyễn Văn A", email: "user@user.com", role: "user", status: "active" },
          { id: 3, name: "Trần Thị B", email: "user2@user2.com", role: "user", status: "active" }
        ]);
      }, 400);
    });
  }

  async updateUserStatus(userId, status) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 400);
    });
  }

  // ============================
  // ⭐ REVIEW APIs (Mock)
  // ============================
  async getReviews(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = mockReviews.filter(r => r.productId === Number(productId));
        resolve(list);
      }, 250);
    });
  }

  async addReview(reviewData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          id: "r" + Date.now(),
          createdAt: new Date().toISOString(),
          ...reviewData
        };
        mockReviews.push(newReview);
        resolve(newReview);
      }, 250);
    });
  }

  async getAverageRating(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = mockReviews.filter(r => r.productId === Number(productId));

        if (list.length === 0)
          return resolve({ avg: 0, total: 0 });

        const sum = list.reduce((acc, r) => acc + r.rating, 0);
        const avg = Number((sum / list.length).toFixed(1));

        resolve({ avg, total: list.length });
      }, 250);
    });
  }

  // ============================
  // 📸 UPLOAD MOCK
  // ============================
  async uploadImages(files) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const urls = files.map(f => URL.createObjectURL(f));
        resolve(urls);
      }, 400);
    });
  }

  // ==================================================
  // 💳 MOCK PAYMENT (MOMO + VNPAY)
  // ==================================================
  async momoPaymentMock(payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          payUrl: `/payment-success?orderId=${payload.orderId}&method=momo`
        });
      }, 700);
    });
  }

  async vnpayPaymentMock(payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          payUrl: `/payment-success?orderId=${payload.orderId}&method=vnpay`
        });
      }, 700);
    });
  }
}

export default new ApiService();
