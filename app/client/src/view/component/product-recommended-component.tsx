import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { SortingDirection } from "../../lib/config/type";
import ProductController from "../../lib/controller/product-controller";
import Currency from "../../lib/helper/currency";
import { Failure } from "../../lib/helper/failure";
import {
  ProductReadParameter,
  ProductSortingField,
} from "../../lib/model/product-model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadError } from "../redux/layout-slice";
import { productComplete } from "../redux/product-slice";
import { RootState } from "../redux/store";

const productController = new ProductController();

export default function ProductRecommendedComponent() {
  const state = useAppSelector((state: RootState) => state.product.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      dispatch(productComplete(null));

      const param: ProductReadParameter = {
        sort: {
          field: ProductSortingField.PRIORITY,
          direction: SortingDirection.ASC,
        },
        paginate: {
          skip: 0,
          take: 100,
        },
      };

      const data = await productController.getFilteredProduct(param);
      dispatch(productComplete(data));
    } catch (error) {
      dispatch(loadError(Failure.handle(error)));
    }
  }

  return (
    <>
      <div className="bg-surface h-12 mt-4 mx-4 text-onSurface font-semibold flex justify-center items-center border-b-2 border-primary lg:w-3/5 lg:mx-auto">
        REKOMENDASI
      </div>
      <div className="mt-2 mx-4 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6 lg:w-3/5 lg:mx-auto">
        {(() => {
          if (state.data?.length! > 0) {
            return (
              <>
                {state.data!.map((e, i) => {
                  return (
                    <Link key={i} to="" className="bg-surface">
                      <div className="h-36 w-full overflow-hidden">
                        <LazyLoadImage
                          src={e.picture}
                          alt=""
                          height={200}
                          width={200}
                          className="bg-gray-100 object-cover h-full w-full"
                        />
                      </div>
                      <div className="p-2 h-28 text-onSurface flex flex-col justify-between">
                        <div className="text-sm line-clamp-2">{e.name}</div>
                        <div>
                          <div className="text-xs">
                            per {faker.science.unit().name}
                          </div>
                          <div className="font-semibold">
                            {Currency.format(e.productVariant![0].price!)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            );
          }

          return (
            <>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-64"></div>
              ))}
            </>
          );
        })()}
      </div>
      <Link
        to=""
        className="bg-surface h-10 mt-2 mx-4 text-onSurface flex justify-center items-center border border-primary mb-2 lg:w-1/3 lg:mx-auto"
      >
        Lihat Lainnya
      </Link>
    </>
  );
}
