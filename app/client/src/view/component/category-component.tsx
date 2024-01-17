import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ControllerData, SortingDirection } from "../../lib/config/type";
import CategoryController from "../../lib/controller/category-controller";
import { Failure } from "../../lib/helper/failure";
import { categoryComplete, categoryError } from "../redux/category-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const categoryController = new CategoryController();

export default function CategoryComponent() {
  const category = useAppSelector((state: RootState) => state.category.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      const param: ControllerData = {
        sorting: { field: "name", direction: SortingDirection.ASC },
      };

      const datas = await categoryController.read(param);
      dispatch(categoryComplete(datas));
    } catch (error) {
      dispatch(categoryError(Failure.handle(error)));
    }
  }

  return (
    <>
      {(() => {
        // if (category.error) {
        //   return (
        //     <>
        //       <RefreshButton onClick={init} />
        //     </>
        //   );
        // }

        if (category.data?.length! > 0) {
          return (
            <>
              <div
                className={`grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x`}
              >
                {category.data?.map((e, i) => {
                  return (
                    <Link
                      key={i}
                      to=""
                      className="bg-surface snap-start flex flex-col justify-center items-center w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44"
                    >
                      <LazyLoadImage
                        src={e.picture}
                        width={40}
                        height={40}
                        className="bg-gray-100 w-10 h-10 object-cover md:w-14 md:h-14"
                      />
                      <div className="text-onSurface text-xs font-semibold mt-2 line-clamp-2 text-center md:text-sm">
                        {e.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          );
        }

        return (
          <>
            <div className="grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x">
              {[...Array(10)].map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-gray-200 animate-pulse snap-start flex flex-col justify-center items-center w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44"
                  />
                );
              })}
            </div>
          </>
        );
      })()}
    </>
  );
}
