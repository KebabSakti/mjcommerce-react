import { LazyLoadImage } from "react-lazy-load-image-component";
import { currency } from "../lib/helper/common";
import { faker } from "@faker-js/faker";

export default function DebugPage() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-10 p-4 lg:w-3/5 lg:mx-auto">
        <div className="flex gap-2 overflow-scroll">
          {[...Array(20)].map((_, i) => {
            return (
              <div key={i} className="h-60 w-40 shrink-0">
                <Item />
              </div>
            );
          })}
        </div>
        <div className="grid gap-2 grid-cols-2 grid-rows-1 overflow-scroll">
          {[...Array(20)].map((_, i) => {
            return (
              <div key={i} className="h-60">
                <Item />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Item() {
  return (
    <div className="bg-surface h-full w-full flex flex-col text-onSurface snap-start">
      <div className="bg-gray-100 grow">
        <LazyLoadImage
          src={faker.image.url()}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2 flex flex-col justify-between h-2/6">
        <div className="text-sm line-clamp-2">
          {faker.commerce.productName()}
        </div>
        <div className="font-semibold">
          {currency(faker.commerce.price({ min: 1000, max: 999999 }))}
        </div>
      </div>
    </div>
  );
}
