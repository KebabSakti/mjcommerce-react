import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import BannerController from "../../lib/controller/banner-controller";
import { Failure } from "../../lib/helper/failure";
import { bannerComplete } from "../redux/banner-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadError } from "../redux/layout-slice";
import { RootState } from "../redux/store";

const bannerController = new BannerController();

export default function BannerComponent() {
  const state = useAppSelector((state: RootState) => state.banner.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      dispatch(bannerComplete(null));
      const data = await bannerController.getBanner();
      dispatch(bannerComplete(data));
    } catch (error) {
      dispatch(loadError(Failure.handle(error)));
    }
  }

  return (
    <div className="bg-surface p-4 lg:py-4 lg:px-0">
      {(() => {
        if (state.data?.length! > 0) {
          return (
            <>
              <Carousel className="h-44 lg:h-52 lg:w-3/5 lg:mx-auto">
                {state.data?.map((e, i) => {
                  return (
                    <img
                      key={i}
                      src={e.picture}
                      alt={e.name}
                      width={500}
                      height={500}
                      className="bg-gray-100 object-cover h-full w-full"
                    />
                  );
                })}
              </Carousel>
            </>
          );
        }

        return (
          <>
            <div className="bg-gray-200 animate-pulse h-44 lg:h-52 lg:w-3/5 lg:mx-auto" />
          </>
        );
      })()}
    </div>
  );
}
