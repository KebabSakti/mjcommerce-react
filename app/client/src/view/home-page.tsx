import { faker } from "@faker-js/faker";
import { Carousel } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Currency from "../lib/helper/currency";
import BannerComponent from "./component/banner-component";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* BANNER */}
      <BannerComponent />
      {/* BANNER */}

      {/* KATEGORI */}
      <div className="mx-4 mt-4 lg:w-3/5 lg:mx-auto">
        <div className="bg-surface mb-1 p-4 flex justify-between">
          <div className="text-onSurface font-semibold">KATEGORI</div>
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

        <div className="grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x">
          {[...Array(50)].map((_, i) => {
            return (
              <Link
                key={i}
                to=""
                className="bg-surface w-24 h-24 snap-start flex flex-col justify-center items-center md:w-28 md:h-28 lg:w-32 lg:h-32"
              >
                <LazyLoadImage
                  src={`https://picsum.photos/40/40.webp?random=${i + 90}`}
                  width={40}
                  height={40}
                  className="bg-gray-100"
                />
                <div className="text-onSurface text-xs font-semibold mt-2 line-clamp-2">
                  {faker.commerce.department()}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* KATEGORI */}

      {/* PRODUK TERLARIS */}
      <div className="bg-surface mx-4 mt-4 lg:w-3/5 lg:mx-auto">
        <div className="p-4 flex justify-between">
          <div className="text-onSurface font-semibold">TERLARIS</div>
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
        <div className="grid grid-rows-1 grid-flow-col gap-2 overflow-x-scroll justify-start snap-x">
          {[...Array(50)].map((_, i) => {
            return (
              <Link key={i} to="" className="w-36 snap-start">
                <div className="h-36">
                  <LazyLoadImage
                    src={`https://picsum.photos/200/200.webp?random=${i}`}
                    alt=""
                    height={200}
                    width={200}
                    className="bg-gray-100 object-cover h-full"
                  />
                </div>
                <div className="p-2 h-28 text-onSurface flex flex-col justify-between">
                  <div className="text-sm line-clamp-2">
                    {faker.commerce.productName()}
                  </div>
                  <div>
                    <div className="text-xs">
                      per {faker.science.unit().name}
                    </div>
                    <div className="font-semibold">
                      {Currency.format(
                        faker.commerce.price({
                          min: 1000,
                          max: 1000000,
                          dec: 0,
                        })
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* PRODUK TERLARIS */}

      {/* PRODUK TERBARU */}
      <div className="bg-surface mx-4 mt-4 lg:w-3/5 lg:mx-auto">
        <div className="p-4 flex justify-between">
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
        <div className="grid grid-rows-1 grid-flow-col gap-2 overflow-x-scroll justify-start snap-x">
          {[...Array(50)].map((_, i) => {
            return (
              <Link key={i} to="" className="w-36 snap-start">
                <div className="h-36">
                  <LazyLoadImage
                    src={`https://picsum.photos/200/200.webp?random=${i + 30}`}
                    alt=""
                    height={200}
                    width={200}
                    className="bg-gray-100 object-cover h-full"
                  />
                </div>
                <div className="p-2 h-28 text-onSurface flex flex-col justify-between">
                  <div className="text-sm line-clamp-2">
                    {faker.commerce.productName()}
                  </div>
                  <div>
                    <div className="text-xs">
                      per {faker.science.unit().name}
                    </div>
                    <div className="font-semibold">
                      {Currency.format(
                        faker.commerce.price({
                          min: 1000,
                          max: 1000000,
                          dec: 0,
                        })
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* PRODUK TERBARU */}

      {/* PRODUK REKOMENDASI */}
      <div className="bg-surface h-12 mt-4 mx-4 text-onSurface font-semibold flex justify-center items-center border-b-2 border-primary lg:w-3/5 lg:mx-auto">
        REKOMENDASI
      </div>
      <div className="mt-2 mx-4 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6 lg:w-3/5 lg:mx-auto">
        {[...Array(102)].map((_, i) => {
          return (
            <Link key={i} to="" className="bg-surface">
              <div className="h-36 w-full overflow-hidden">
                <LazyLoadImage
                  src={`https://picsum.photos/200/200.webp?random=${i + 50}`}
                  alt=""
                  height={200}
                  width={200}
                  className="bg-gray-100 object-cover h-full w-full"
                />
              </div>
              <div className="p-2 h-28 text-onSurface flex flex-col justify-between">
                <div className="text-sm line-clamp-2">
                  {faker.commerce.productName()}
                </div>
                <div>
                  <div className="text-xs">per {faker.science.unit().name}</div>
                  <div className="font-semibold">
                    {Currency.format(
                      faker.commerce.price({
                        min: 1000,
                        max: 1000000,
                        dec: 0,
                      })
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        to=""
        className="bg-surface h-10 mt-2 mx-4 text-onSurface flex justify-center items-center border border-primary mb-2 lg:w-1/3 lg:mx-auto"
      >
        Lihat Lainnya
      </Link>
      {/* PRODUK REKOMENDASI */}
    </div>
  );
}
