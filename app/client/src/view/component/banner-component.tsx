import { Carousel } from "@material-tailwind/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ControllerData, SortingDirection } from "../../lib/config/type";
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
      const param: ControllerData = {
        sorting: { field: "created", direction: SortingDirection.DESC },
      };

      const datas = await bannerController.read(param);
      dispatch(bannerComplete(datas));
    } catch (error) {
      dispatch(bannerError(Failure.handle(error)));
    }
  }

  return (
    <div className="bg-surface p-4 flex items-center lg:py-4 lg:px-0">
      <div className="flex flex-col gap-1 overflow-hidden lg:flex-row lg:w-3/5 lg:mx-auto">
        {(() => {
          const bigBanners = banner.data?.filter((e) => e.big == true);
          const smallBanners = banner.data?.filter((e) => e.big == false);

          if (banner.error) {
            return (
              <>
                <div className="bg-gray-200 h-44 flex items-center justify-center w-screen overflow-hidden lg:h-52 lg:flex-auto lg:w-64">
                  <RefreshButton onClick={init} />
                </div>
              </>
            );
          }

          if (banner.data?.length! > 0) {
            return (
              <>
                <Carousel
                  autoplay
                  loop
                  className="h-44 lg:h-52 lg:flex-auto lg:w-64"
                >
                  {bigBanners?.map((e, i) => {
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
                {smallBanners?.length != 2 ? (
                  <></>
                ) : (
                  <div className="flex h-24 gap-1 lg:h-52 lg:flex-1 lg:flex-col">
                    <Link to="" className="flex-1 overflow-hidden">
                      <img
                        src={smallBanners?.[0].picture}
                        alt={smallBanners?.[0].name}
                        width={500}
                        height={500}
                        className="bg-gray-100 w-full h-full object-cover"
                      />
                    </Link>
                    <Link to="" className="flex-1 overflow-hidden">
                      <img
                        src={smallBanners?.[1].picture}
                        alt={smallBanners?.[1].name}
                        width={500}
                        height={500}
                        className="bg-gray-100 w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                )}
              </>
            );
          }

          return (
            <>
              <div className="bg-gray-200 animate-pulse h-44 w-screen lg:h-52 lg:flex-auto lg:w-64" />
              <div className="flex h-24 gap-1 lg:h-52 lg:flex-1 lg:flex-col">
                <div className="bg-gray-200 animate-pulse w-full h-full flex-1" />
                <div className="bg-gray-200 animate-pulse w-full h-full flex-1" />
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
