import { faker } from "@faker-js/faker";
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Currency from "../../../lib/helper/currency";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* BANNER */}
      <div className="bg-surface p-4 flex items-center lg:py-4 lg:px-0">
        <div className="flex flex-col gap-1 lg:flex-row lg:w-3/5 lg:mx-auto">
          <Carousel autoplay loop className="h-44 lg:h-52 lg:flex-auto lg:w-64">
            {[...Array(5)].map((_, i) => {
              return (
                <img
                  key={i}
                  src={`https://picsum.photos/800/500.webp?random=${i + 250}`}
                  alt=""
                  width={800}
                  height={500}
                  className="w-full h-full object-cover grow"
                />
              );
            })}
          </Carousel>
          <div className="flex h-24 gap-1 lg:h-52 lg:flex-1 lg:flex-col">
            <Link to="" className="flex-1 overflow-hidden">
              <img
                src={`https://picsum.photos/800/500.webp?random=99`}
                alt=""
                width={1000}
                height={602}
                className="w-full h-full object-cover"
              />
            </Link>
            <Link to="" className="flex-1 overflow-hidden">
              <img
                src={`https://picsum.photos/800/500.webp?random=100`}
                alt=""
                width={1000}
                height={667}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
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

        <Carousel
          navigation={() => null}
          nextArrow={({ handleNext }) => {
            return (
              <button
                onClick={handleNext}
                className="bg-primary text-onPrimary font-bold border-4 border-background pl-1 h-12 w-12 rounded-full flex justify-start items-center !absolute top-2/4 !-right-5 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            );
          }}
          prevArrow={({ handlePrev }) => {
            return (
              <button
                onClick={handlePrev}
                className="bg-primary text-onPrimary font-bold border-4 border-background pl-4 h-12 w-12 rounded-full flex justify-start items-center !absolute top-2/4 !-left-5 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            );
          }}
        >
          {[...Array(Math.floor(50 / 6))].map((_, i) => {
            return (
              <div
                key={i}
                className="w-full grid grid-rows-2 grid-flow-col gap-1"
              >
                {[...Array(6)].map((_, n) => {
                  return (
                    <Link
                      key={n}
                      to=""
                      className="bg-surface p-2 snap-start flex flex-col justify-center items-center"
                    >
                      <img
                        src={`https://picsum.photos/50.webp?random=${n + i}`}
                        alt=""
                        width={50}
                        height={50}
                      />
                      <div className="mt-2 text-onSurface text-xs text-center px-4 line-clamp-2 lg:text-sm">
                        {faker.commerce.productName()}
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
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
              <Link key={i} to="" className="w-40 snap-start flex flex-col">
                <img
                  src={`https://picsum.photos/200.webp?random=${i}`}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full object-cover grow"
                />
                <div className="text-onSurface h-28 p-2 flex flex-col justify-between">
                  <div className="text-sm line-clamp-2">
                    {faker.commerce.productName()}
                  </div>
                  <div>
                    <div className="text-xs">
                      per {faker.science.unit().name}
                    </div>
                    <div className="text-sm font-bold">
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
              <Link key={i} to="" className="w-40 snap-start flex flex-col">
                <img
                  src={`https://picsum.photos/200.webp?random=${i + 10}`}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full object-cover grow"
                />
                <div className="text-onSurface h-28 p-2 flex flex-col justify-between">
                  <div className="text-sm line-clamp-2">
                    {faker.commerce.productName()}
                  </div>
                  <div>
                    <div className="text-xs">
                      per {faker.science.unit().name}
                    </div>
                    <div className="text-sm font-bold">
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
            <Link key={i} to="" className="bg-surface flex flex-col">
              <img
                src={`https://picsum.photos/200.webp?random=${i + 20}`}
                alt=""
                width={200}
                height={200}
                className="w-full object-cover grow"
              />
              <div className="text-onSurface h-28 p-2 flex flex-col justify-between">
                <div className="text-sm line-clamp-2">
                  {faker.commerce.productName()}
                </div>
                <div>
                  <div className="text-xs">per {faker.science.unit().name}</div>
                  <div className="text-sm font-bold">
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
