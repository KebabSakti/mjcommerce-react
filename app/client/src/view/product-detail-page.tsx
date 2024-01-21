import { faker } from "@faker-js/faker";
import { Carousel, Rating } from "flowbite-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Currency from "../lib/helper/currency";

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
                {Currency.format(faker.commerce.price({ min: 1000 }))}
              </span>
              <span className="text-xs font-bold underline">
                Beli 5++ harga{" "}
                <span className="text-red-500">
                  {Currency.format(faker.commerce.price({ min: 500 }))}
                </span>
              </span>
            </div>
            <div className="flex mt-6">
              <span className="w-20 shrink-0">Variant</span>
              <div className="flex gap-2 flex-wrap text-xs">
                {[...Array(3)].map((_, i) => {
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
              <button className="flex gap-2 bg-secondary py-2 px-4">
                <span className="text-onSecondary">Beli Langsung</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-surface p-4 flex items-center gap-4 text-onSurface md:flex-row md:gap-4">
          <div className="w-20 h-20 rounded-full border border-primary overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=740&t=st=1705831617~exp=1705832217~hmac=5489184651f534582403eb81870f9afaeebb7b0c7c75a1ffad70c154dd5233fb"
              alt=""
              className="w-20 h-20"
            />
          </div>
          <span className="text-xl font-semibold">{faker.company.name()}</span>
        </div>
        <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface md:flex-row md:gap-4"></div>
      </div>
    </>
  );
}
