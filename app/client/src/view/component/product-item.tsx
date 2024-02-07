import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../../lib/model/product-model";
import { currency } from "../../lib/helper/common";

export default function ProductItem({ product }: { product: ProductModel }) {
  return (
    <>
      <Link to={`/product/${product.id}`}>
        <div className="bg-surface h-full w-full flex flex-col text-onSurface snap-start">
          <div className="bg-gray-100 grow">
            <LazyLoadImage
              src={product.picture}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-2 flex flex-col justify-between h-2/6">
            <div className="text-sm line-clamp-2">{product.name}</div>
            <div className="font-semibold">{currency(product.price!)}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
