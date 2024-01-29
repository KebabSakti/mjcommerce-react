import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ProductReadParameter, ProductSortingField } from "../../../../lib/model/product-model";
import { SortingDirection } from "../../lib/config/type";
import ProductController from "../../lib/controller/product-controller";
import Currency from "../../lib/helper/currency";
import { Failure } from "../../lib/helper/failure";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadError } from "../redux/layout-slice";
import { productLatestComplete } from "../redux/product-latest-slice";
import { RootState } from "../redux/store";

const productController = new ProductController();

export default function ProductLatestComponent() {
  const state = useAppSelector((state: RootState) => state.productLatest.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      dispatch(productLatestComplete(null));

      const param: ProductReadParameter = {
        paginate: {
          skip: 0,
          take: 10,
        },
        sort: {
          field: ProductSortingField.CREATED,
          direction: SortingDirection.DESC,
        },
      };

      const data = await productController.getFilteredProduct(param);

      dispatch(productLatestComplete(data));
    } catch (error) {
      dispatch(loadError(Failure.handle(error)));
    }
  }

  return (
    <>
      <div className="mx-4 mt-4 lg:w-3/5 lg:mx-auto">
        <div className="bg-surface mb-1 p-4 flex justify-between">
          <div className="text-onSurface font-semibold">TERBARU</div>
          <Link to="" className="text-primary text-sm flex">
            <span>Lihat Semua</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x">
          {(() => {
            if (state.data?.length! > 0) {
              return (
                <>
                  {state.data!.map((e, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/product/${e.id}`}
                        className="bg-surface h-64 w-40 flex flex-col text-onSurface snap-start"
                      >
                        <div className="bg-gray-100 grow">
                          <LazyLoadImage
                            src={e.picture}
                            alt={e.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-2 flex flex-col justify-between h-2/6">
                          <div className="text-sm line-clamp-2">{e.name}</div>
                          <div className="font-semibold">
                            {Currency.format(e.productVariant![0].price!)}
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
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 h-64 w-40 animate-pulse snap-start"
                  ></div>
                ))}
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}
