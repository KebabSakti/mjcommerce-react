import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ControllerData, SortingDirection } from "../../lib/config/type";
import CategoryController from "../../lib/controller/category-controller";
import { Failure } from "../../lib/helper/failure";
import { categoryComplete, categoryError } from "../redux/category-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import RefreshButton from "./refresh-button";

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
          const gridCount =
            category.data?.length! <= 14 ? "grid-rows-2" : "grid-rows-1";

          return (
            <>
              <div className={`grid ${gridCount} grid-flow-col gap-1 overflow-x-scroll justify-start snap-x`}>
                {category.data?.map((e, i) => {
                  return (
                    <Link
                      key={i}
                      to=""
                      className="bg-surface w-24 h-24 snap-start flex flex-col justify-center items-center md:w-28 md:h-28 lg:w-32 lg:h-32"
                    >
                      <LazyLoadImage
                        src={e.picture}
                        width={40}
                        height={40}
                        className="bg-gray-100"
                      />
                      <div className="text-onSurface text-xs font-semibold mt-2 line-clamp-2 text-center">
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
                    className="bg-gray-200 animate-pulse w-24 h-24 snap-start flex flex-col justify-center items-center md:w-28 md:h-28 lg:w-32 lg:h-32"
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
