import BannerComponent from "./component/banner-component";
import CategoryComponent from "./component/category-component";
import ProductLatestComponent from "./component/product-latest-component";
import ProductPopularComponent from "./component/product-popular-component";
import ProductRecommendedComponent from "./component/product-recommended-component";

export default function HomePage() {
  return (
    <>
      {/* BANNER */}
      <BannerComponent />
      {/* BANNER */}

      {/* KATEGORI */}
      <CategoryComponent />
      {/* KATEGORI */}

      {/* PRODUK TERLARIS */}
      <ProductPopularComponent />
      {/* PRODUK TERLARIS */}

      {/* PRODUK TERBARU */}
      <ProductLatestComponent />
      {/* PRODUK TERBARU */}

      {/* PRODUK REKOMENDASI */}
      <ProductRecommendedComponent />
      {/* PRODUK REKOMENDASI */}
    </>
  );
}
