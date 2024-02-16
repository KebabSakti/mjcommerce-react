import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useSearchParams } from "react-router-dom";
import { DataState } from "../../lib/config/type";
import { currency } from "../../lib/helper/common";
import OrderRepository from "../../lib/repository/order-repository";
import { AuthContext } from "../context/auth-context";
import { Spinner } from "flowbite-react";
import { OrderModel } from "../../../../lib/model/order-model";

const orderRepository = new OrderRepository();

export default function OrderPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const authContext = useContext(AuthContext);
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = page * (limit * 2);
  const [orders, setOrders] = useState<DataState<Record<string, any>>>();

  useEffect(() => {
    if (authContext?.auth) {
      getOrders();
    }
  }, [authContext?.auth, searchParams]);

  async function getOrders() {
    try {
      setOrders({ ...orders, status: "loading" });

      const result = await orderRepository.read({
        ...query,
        token: authContext?.auth?.token,
      });

      console.log(result);

      setOrders({
        ...orders,
        status: "loaded",
        data: result,
        error: null,
      });
    } catch (error: any) {
      setOrders({ ...orders, status: "error", error: error });
    }
  }

  function next() {
    if (max < orders?.data?.paginate?.total!) {
      setSearchParams({ ...query, page: (page + 1) as any });
    }
  }

  function prev() {
    if (page > 1) {
      setSearchParams({ ...query, page: (page - 1) as any });
    }
  }

  return (
    <div className="bg-surface text-onSurface p-4">
      {(() => {
        if (orders?.status == "loading") {
          return (
            <div className="flex justify-center items-center min-h-56">
              <Spinner />
            </div>
          );
        }

        if (orders?.status == "loaded" && orders?.data?.data) {
          return (
            <>
              <div className="flex gap-2 items-center md:justify-end">
                <div>
                  <input
                    type="text"
                    placeholder="Cari Invoice"
                    className="border border-gray-400 rounded w-full placeholder:text-gray-300"
                  />
                </div>
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
              <div className="flex flex-col py-4 divide-y">
                {orders.data.data.map((e: OrderModel, i: number) => {
                  return (
                    <Link
                      key={i}
                      to=""
                      className="font-semibold flex flex-col gap-3 py-4"
                    >
                      <div className="flex gap-2 items-center">
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
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>
                        <div className="font-semibold text-green-500">
                          {e.storeName}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="size-14">
                          <LazyLoadImage
                            src={e.orderItem![0].productPicture}
                            className="w-full h-full object-cover rounded bg-gray-200"
                          />
                        </div>
                        <div>
                          <div className="line-clamp-1">
                            {e.orderItem![0].productName}
                          </div>
                          <div className="text-xs">x{e.orderItem![0].qty}</div>
                          <div className="text-gray-400 text-xs">
                            dan {Number(e.orderItem!.length) - 1} barang lainnya
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">Tanggal Pesan</div>
                          <div>16 Feb 24</div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">No Invoice</div>
                          <div>{e.invoice}</div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">Total Produk</div>
                          <div className="text-red-500 font-bold">
                            {currency(e.productTotal!)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">Status</div>
                          <div className="px-2 py-1 bg-orange-500 rounded-full text-white text-xs">
                            {e.statusOrder}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {(() => {
                if (max < orders?.data?.paginate?.total!) {
                  return (
                    <div className="flex justify-center gap-1 mt-2">
                      <button
                        className="p-2 rounded bg-secondary text-onSecondary"
                        onClick={prev}
                      >
                        PREV
                      </button>
                      <button
                        className="p-2 rounded bg-primary text-onPrimary"
                        onClick={next}
                      >
                        NEXT
                      </button>
                    </div>
                  );
                }
              })()}
            </>
          );
        }

        return (
          <div className="flex justify-center items-center min-h-56">
            Tidak ada pesanan
          </div>
        );
      })()}
    </div>
  );
}
