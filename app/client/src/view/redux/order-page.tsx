import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useSearchParams } from "react-router-dom";
import { DataState } from "../../lib/config/type";
import { currency, debounce } from "../../lib/helper/common";
import OrderRepository from "../../lib/repository/order-repository";
import { AuthContext } from "../context/auth-context";
import { Modal, Spinner } from "flowbite-react";
import { OrderModel } from "../../../../lib/model/order-model";

const orderRepository = new OrderRepository();

export default function OrderPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const authContext = useContext(AuthContext);
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = page * (limit * 2);
  const [debounceSearch] = debounce(search, 500);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
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

  function search(e: any) {
    const keyword = e.target.value;

    if (keyword.length == 0) {
      delete query.invoice;
      setSearchParams({ ...query });
    } else {
      setSearchParams({ ...query, invoice: e.target.value });
    }
  }

  function sortOrder() {
    const direction = query.direction == "desc" ? "asc" : "desc";
    setSearchParams({ ...query, sort: "updated", direction: direction });
  }

  function filterStatus(e: any) {
    const status = e.target.value;

    if (status == "ALL") {
      delete query.orderStatus;
      setSearchParams({ ...query });
    } else {
      setSearchParams({ ...query, orderStatus: status });
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

  function selectOrder(order: OrderModel) {
    setSelectedOrder(order);
  }

  function unselectOrder() {
    setSelectedOrder(null);
  }

  return (
    <div className="bg-surface text-onSurface p-4">
      <div className="flex gap-2 items-center md:justify-end">
        <div>
          <input
            type="text"
            placeholder="Ketik Invoice"
            className="border border-gray-400 rounded w-full placeholder:text-gray-300"
            onChange={debounceSearch}
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            value={query.orderStatus ?? "ALL"}
            className="border-gray-400 py-2 px-4 rounded text-sm"
            onChange={filterStatus}
          >
            <option value="ALL">SEMUA</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">SELESAI</option>
            <option value="FAILED">GAGAL</option>
            <option value="CANCELED">BATAL</option>
          </select>
          <button
            className="border border-gray-400 p-2 rounded"
            onClick={sortOrder}
          >
            {query.direction === "desc" ? (
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
            ) : (
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
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {(() => {
        if (orders?.status == "loading") {
          return (
            <div className="flex justify-center items-center min-h-56">
              <Spinner />
            </div>
          );
        }

        if (orders?.status == "loaded" && orders?.data?.data.length) {
          return (
            <>
              <div className="flex flex-col py-4 divide-y">
                {orders.data.data.map((e: OrderModel, i: number) => {
                  return (
                    <button
                      key={i}
                      className="font-semibold flex flex-col gap-3 py-4"
                      onClick={() => {
                        selectOrder(e);
                      }}
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
                        <div className="font-semibold text-green-500 line-clamp-1">
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
                        <div className="flex flex-col items-start">
                          <div className="text-sm line-clamp-1">
                            {e.orderItem![0].productName}
                          </div>
                          <div className="text-xs">x{e.orderItem![0].qty}</div>
                          {(() => {
                            if (e.orderItem?.length! > 1) {
                              return (
                                <div className="text-gray-400 text-xs">
                                  dan {Number(e.orderItem!.length) - 1} produk
                                  lainnya
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">Tanggal</div>
                          <div>
                            {new Date(e.created!).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
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
                          <div className="px-2 py-1 bg-yellow-300 rounded-full text-white text-xs">
                            {e.statusOrder}
                          </div>
                        </div>
                      </div>
                    </button>
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
              <Modal
                show={selectedOrder != null}
                size="lg"
                onClose={unselectOrder}
              >
                {(() => {
                  const order: OrderModel | null = selectedOrder;

                  if (order) {
                    return (
                      <>
                        <Modal.Header>
                          <div className="px-3 py-1 bg-yellow-300 rounded-full text-white text-sm font-semibold">
                            {order.statusOrder}
                          </div>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="w-full text-onBackground flex flex-col gap-6 overflow-y-auto h-[500px]">
                            <div className="flex flex-col gap-4">
                              <div className="font-semibold">DATA PENERIMA</div>
                              <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded">
                                <div>
                                  <div className="text-xs text-gray-400">
                                    Nama
                                  </div>
                                  <div>{order.receiverName}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">
                                    No Hp
                                  </div>
                                  <div>{order.receiverPhone}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">
                                    Alamat
                                  </div>
                                  <div>{order.receiverAddress}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                PRODUK DIPESAN
                              </div>
                              <div className="flex flex-col divide-y">
                                {(() => {
                                  return (
                                    <>
                                      {order?.orderItem?.map(
                                        (e: any, i: any) => {
                                          return (
                                            <div key={i} className="py-4">
                                              <div className="flex gap-4">
                                                <div className="bg-gray-100 w-16 h-16 mt-2">
                                                  <LazyLoadImage
                                                    src={e.productPicture}
                                                    alt=""
                                                    className="h-full w-full object-cover rounded"
                                                  />
                                                </div>
                                                <div className="flex flex-col">
                                                  <div>{e.productName}</div>
                                                  <div className="text-xs text-gray-400">
                                                    Varian :{" "}
                                                    {e.productVariantName}
                                                  </div>
                                                  <div>Jumlah : {e.qty}</div>
                                                  <div className="font-semibold flex gap-1 items-center">
                                                    <div>
                                                      {currency(e.total!)}
                                                    </div>
                                                    {(() => {
                                                      if (
                                                        e.wholesaleMin !=
                                                          null &&
                                                        e.wholesalePrice != null
                                                      ) {
                                                        if (
                                                          e.qty! >=
                                                          e.wholesaleMin
                                                        ) {
                                                          return (
                                                            <div className="text-red-500 text-xs">
                                                              (Grosir)
                                                            </div>
                                                          );
                                                        }
                                                      }
                                                    })()}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                              <div className="py-2 font-semibold flex justify-between items-center">
                                <div>Total ({order.productQty}) Produk</div>
                                <div>{currency(order.productTotal!)}</div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="font-semibold">DETAIL BIAYA</div>
                              <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-12 shrink-0">
                                    <LazyLoadImage src={order.paymentPicture} />
                                  </div>
                                  <div className="font-semibold">
                                    {order.paymentName}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                    Subtotal ({order.productQty}) Produk
                                  </div>
                                  <div className="font-semibold">
                                    {currency(order.productTotal!)}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>Biaya Admin</div>
                                  <div className="font-semibold">
                                    {currency(order.adminFee!)}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>Total</div>
                                  <div className="text-lg text-red-500 font-bold">
                                    {currency(order.productTotal!)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="flex justify-end gap-2 items-center w-full">
                            <Link
                              to=""
                              target="_blank"
                              className="bg-green-500 p-2 rounded text-white flex gap-1 items-center"
                            >
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
                                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                />
                              </svg>
                              <div>Hubungi Penjual</div>
                            </Link>
                            <button className="bg-red-500 text-white p-2 rounded flex gap-1 items-center">
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
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <div>Batalkan</div>
                            </button>
                          </div>
                        </Modal.Footer>
                      </>
                    );
                  }
                })()}
              </Modal>
            </>
          );
        }

        return (
          <div className="flex justify-center items-center min-h-56">
            Tidak ada data
          </div>
        );
      })()}
    </div>
  );
}
