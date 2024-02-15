import { Link } from "react-router-dom";
import { currency } from "../../lib/helper/common";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function OrderPage() {
  return (
    <div className="bg-surface text-onSurface p-4">
      <div className="flex justify-end items-center">
        {/* <div className="font-semibold">Filter Pesanan</div> */}
        <div className="flex gap-2">
          <select
            name="status"
            value="all"
            className="border-gray-400 py-2 px-4 rounded text-sm"
            onChange={() => {}}
          >
            <option value="all">SEMUA</option>
            <option value="pending">PENDING</option>
            <option value="completed">SELESAI</option>
            <option value="failed">GAGAL</option>
            <option value="canceled">BATAL</option>
          </select>
          <button className="border border-gray-400 p-2 rounded">
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
      </div>
      <div className="flex flex-col gap-4 py-4">
        {[...Array(10)].map((_, i) => {
          return (
            <Link
              key={i}
              to=""
              className="p-4 border border-gray-400 rounded-lg font-semibold flex gap-2 text-sm"
            >
              <div className="size-16">
                <LazyLoadImage src="https://res.cloudinary.com/vjtechsolution/image/upload/v1707823397/cod.png" />
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="text-green-500">Maju Jaya Shop</div>
                  <div className="flex gap-2 text-xs">
                    <div>16 Feb 2024</div>
                    <div>INV123092719</div>
                  </div>
                  <div className="mt-1">
                    <div>23 Produk</div>
                    <div className="text-red-500 font-bold">
                      {currency(200000)}
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-300 text-white text-xs py-1 px-2 rounded-full h-fit">
                  PENDING
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
