import { faker } from "@faker-js/faker";
import { Carousel, Pagination, Rating } from "flowbite-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Currency from "../lib/helper/currency";
import { Link } from "react-router-dom";

export default function ProductDetailPage() {
  return (
    <>
      <div className="flex flex-col gap-4 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
        <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface md:flex-row md:gap-4">
          <div className="h-60 w-full md:h-80 md:basis-1/2">
            <Carousel indicators={false}>
              {[...Array(5)].map((_, i) => {
                return (
                  <LazyLoadImage
                    key={i}
                    src={`https://picsum.photos/800/600?random=${i}`}
                    alt=""
                    width={800}
                    height={600}
                    className="bg-gray-100 object-cover h-full w-full"
                  />
                );
              })}
            </Carousel>
          </div>
          <div className="w-full md:basis-1/2 flex flex-col gap-1">
            <div className="font-semibold text-xl">
              {faker.commerce.productName()}
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex gap-1 justify-center items-center">
                <span className="font-bold">4.4</span>
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <span className="font-bold">120K</span>
                <span>Dilihat</span>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <span className="font-bold">11K</span>
                <span>Terjual</span>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-xs text-gray-400">
                per {faker.science.unit.name}
              </span>
              <span className="font-bold text-primary text-xl">
                {Currency.format(
                  faker.commerce.price({ min: 10000, max: 100000 })
                )}
              </span>
              <span className="text-xs font-bold underline">
                Beli 5++ harga{" "}
                <span className="text-red-500">
                  {Currency.format(
                    faker.commerce.price({ min: 500, max: 10000 })
                  )}
                </span>
              </span>
            </div>
            <div className="flex mt-6">
              <span className="w-20 shrink-0">Varian</span>
              <div className="flex gap-2 flex-wrap text-xs">
                {[...Array(10)].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="p-1 outline outline-1 outline-primary hover:cursor-pointer hover:bg-primary hover:text-onPrimary"
                    >
                      {faker.commerce.productName()}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex mt-6">
              <span className="w-20 shrink-0">Kuantitas</span>
              <div className="flex outline outline-1 outline-primary">
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-4 stroke-red-500 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <input
                  className="p-1 w-12 text-center"
                  value={1}
                  onChange={() => {}}
                />
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-4 stroke-green-500 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-6 text-sm">
              <button className="flex gap-2 bg-primary py-2 px-4 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-onPrimary stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="text-onPrimary">Masukkan Keranjang</span>
              </button>
              <button
                className="flex gap-2 bg-secondary py-2 px-4"
                onClick={() => {}}
              >
                <span className="text-onSecondary">Beli Sekarang</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-surface p-4 flex items-center gap-4 text-onSurface md:flex-row md:gap-4">
          <div className="w-20 h-20 rounded-full border border-gray-200 overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=740&t=st=1705831617~exp=1705832217~hmac=5489184651f534582403eb81870f9afaeebb7b0c7c75a1ffad70c154dd5233fb"
              alt=""
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold">
              {faker.company.name()}
            </span>
            <div className="flex gap-2">
              <Link
                to=""
                className="flex gap-1 items-center bg-primary px-2 py-1 w-max"
              >
                <span className="text-onPrimary text-sm">Kunjungi Toko</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Link>
              <Link
                to=""
                className="flex gap-1 items-center bg-secondary px-2 py-1 w-max"
              >
                <span className="text-onSecondary text-sm">Chat</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface">
          <div className="text-xl font-semibold">Deskripsi</div>
          <div>{faker.commerce.productDescription()}</div>
        </div>
        <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Penilaian</div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-0 divide-y">
            {[...Array(5)].map((_, i) => {
              return (
                <div key={i} className="flex gap-4 py-6">
                  <div className="w-14 shrink-0">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={`https://picsum.photos/500/500?random=${i}`}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">
                      {faker.person.fullName()}
                    </div>
                    <Rating size="xs">
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <div className="text-gray-400 text-xs">
                      Varian : {faker.commerce.productName()}
                    </div>
                    <div className="text-xs md:text-base">
                      {faker.lorem.paragraph()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Pagination
              layout="navigation"
              currentPage={1}
              totalPages={100}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
