import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import BannerController from "../../lib/controller/banner-controller";
import { Failure } from "../../lib/helper/failure";
import { bannerComplete, bannerError } from "../redux/banner-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import RefreshButton from "./refresh-button";

const bannerController = new BannerController();

export default function BannerComponent() {
  const banner = useAppSelector((state: RootState) => state.banner.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      const data = await bannerController.getBanner();
      dispatch(bannerComplete(data));
    } catch (error) {
      dispatch(bannerError(Failure.handle(error)));
    }
  }

  return (
    <div className="bg-surface p-4 lg:py-4 lg:px-0">
      {(() => {
        if (banner.error) {
          return (
            <>
              <div className="h-44 w-full">
                <div className="bg-gray-100 h-full w-full flex flex-col gap-4 justify-center items-center text-onBackground">
                  <p className="text-center text-lg">{banner.error.message}</p>
                  <RefreshButton onClick={init} />
                </div>
              </div>
            </>
          );
        }

        if (banner.data?.length! > 0) {
          return (
            <>
              <Carousel className="h-44 lg:h-52 lg:w-3/5 lg:mx-auto">
                {banner.data?.map((e, i) => {
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
