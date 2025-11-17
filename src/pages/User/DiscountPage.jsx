import ProductCard from "../../components/ProductCard";
import { products } from "../../data/mockData";

const DiscountPage = () => {
  // Lọc sản phẩm có discount
  const discountedProducts = products.filter(
    (p) => p.originalPrice > p.price
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8">
        Sản phẩm khuyến mãi
      </h1>

      {/* NO PRODUCTS */}
      {discountedProducts.length === 0 && (
        <p className="text-gray-500 text-lg">
          Hiện tại chưa có sản phẩm nào đang khuyến mãi.
        </p>
      )}

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {discountedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DiscountPage;
