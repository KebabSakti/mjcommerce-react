import BannerComponent from "./component/banner-component";
import CategoryComponent from "./component/category-component";
import ProductLatestComponent from "./component/product-latest-component";
import ProductPopularComponent from "./component/product-popular-component";
import ProductRecommendedComponent from "./component/product-recommended-component";

export default function HomePage() {
  console.log("HOME PAGE REBUILD");
  return (
    <>
      <BannerComponent />
      <CategoryComponent />
      <ProductPopularComponent />
      <ProductLatestComponent />
      <ProductRecommendedComponent />
    </>
  );
}
