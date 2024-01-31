import { useEffect, useReducer } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../../lib/model/product-model";
import { ReducerAction } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import Currency from "../../lib/helper/currency";
import { Failure } from "../../lib/helper/failure";
import ProductRepository from "../../lib/repository/product-repository";

const productRepository = new ProductRepository();

export default function ProductLatestComponent() {
  const [state, dispatch] = useReducer(createReducer<ProductModel[]>, {
    type: null,
    payload: [],
    error: null,
  });

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      dispatch({ type: ReducerAction.LOAD, payload: null });

      const data = await productRepository.read({
        page: 1,
        limit: 10,
        sort: "created",
        direction: "desc",
      });

      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
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
            if (state.payload?.length! > 0) {
              return (
                <>
                  {state.payload!.map((e, i) => {
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
