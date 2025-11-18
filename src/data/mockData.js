// =====================================================
// 🖼 BANNER MOCK DATA
// =====================================================
export const banners = [
  {
    id: 1,
    title: "Bộ sưu tập Thu Đông 2024",
    subtitle: "Khuyến mãi lên đến 50% cho tất cả sản phẩm",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    buttonText: "Mua ngay"
  },
  {
    id: 2,
    title: "Tìm kiếm thông minh với AI",
    subtitle: "Upload hình ảnh để tìm sản phẩm tương tự",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=400&fit=crop",
    buttonText: "Khám phá AI"
  }
];


// =====================================================
// 👕 PRODUCT MOCK DATA
// (rating & reviews chỉ là fallback – sẽ bị override bởi review thật)
// =====================================================
export const products = [
  {
    id: 1,
    name: "Áo Thun Nam Basic",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    category: "Áo thun",
    rating: 4.5,   
    reviews: 128  
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    price: 599000,
    originalPrice: 799000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    category: "Quần jeans",
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: "Áo Sơ Mi Công Sở",
    price: 450000,
    originalPrice: 550000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
    category: "Áo sơ mi",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Váy Maxi Hoa Nhí",
    price: 380000,
    originalPrice: 480000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    category: "Váy",
    rating: 4.6,
    reviews: 203
  }
];


// =====================================================
// 📂 CATEGORY MOCK DATA
// =====================================================
export const categories = [
  { id: 1, name: "Áo thun", icon: "👕", count: 45 },
  { id: 2, name: "Quần jeans", icon: "👖", count: 32 },
  { id: 3, name: "Áo sơ mi", icon: "👔", count: 28 },
  { id: 4, name: "Váy", icon: "👗", count: 38 }
];


// =====================================================
// ⭐ REVIEW MOCK DATA (GỘP CHUNG TRONG mockData.js)
// =====================================================
export let mockReviews = [
  {
    id: "r1",
    productId: 1,
    userId: 2,
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Áo đẹp, chất vải mịn, đóng gói cẩn thận!",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    createdAt: "2024-11-20T10:00:00"
  },
  {
    id: "r2",
    productId: 1,
    userId: 3,
    userName: "Trần Thị B",
    rating: 4,
    comment: "Mặc ổn, nhưng màu hơi lệch nhẹ so với ảnh",
    images: [],
    createdAt: "2024-11-19T09:00:00"
  }
];
