import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { currency } from "../lib/helper/common";
import StatusBar from "./component/status-bar";
import { AuthContext } from "./context/auth-context";
import { CartContext } from "./context/cart-context";
import { CartModel } from "../../../lib/model/cart-model";
import { Empty } from "../lib/config/type";

interface CheckoutPayload {
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  cart: CartModel | Empty;
}

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState<CheckoutPayload>({
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    cart: null,
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setUserData();
  }, [authContext?.auth]);

  useEffect(() => {
    setCartData();
  }, [cartContext?.cart]);

  function init() {
    //
  }

  function setUserData() {
    setOrder({
      ...order,
      receiverName: authContext?.auth?.user?.name ?? "",
      receiverPhone: authContext?.auth?.user?.phone ?? "",
      receiverAddress: authContext?.auth?.user?.address ?? "",
    });
  }

  function setCartData() {
    setOrder({
      ...order,
      cart: cartContext?.cart,
    });
  }

  function inputOnChange(e: any) {
    setOrder({ ...order, [e.target.name]: e.target.value });
  }

  function handleForm(e: any) {
    e.preventDefault();

    console.log(order);
  }

  return (
    <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
      <StatusBar title="Ringkasan Orderan" />
      <form onSubmit={handleForm} className="flex flex-col gap-2">
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
          <div className="font-semibold py-4">DATA PENERIMA</div>
          <div className="flex flex-col gap-2 py-4">
            <input
              type="text"
              placeholder="Nama"
              name="receiverName"
              required
              className="border-gray-200 rounded w-full"
              value={order.receiverName}
              onChange={inputOnChange}
            />
            <input
              type="text"
              placeholder="No WA"
              name="receiverPhone"
              required
              className="border-gray-200 rounded w-full"
              value={order.receiverPhone}
              onChange={inputOnChange}
            />
            <textarea
              placeholder="Alamat"
              name="receiverAddress"
              required
              className="border-gray-200 rounded w-full h-32"
              value={order.receiverAddress}
              onChange={inputOnChange}
            />
          </div>
        </div>
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
          <div className="font-semibold py-4">PRODUK DIPESAN</div>
          <div className="max-h-[500px] overflow-y-scroll flex flex-col divide-y">
            {(() => {
              if (cartContext?.cart?.cartItem?.length) {
                return (
                  <>
                    {cartContext.cart.cartItem.map((e, i) => {
                      return (
                        <div key={i} className="py-6">
                          <div className="flex gap-1 items-center">
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
                              {e.productVariant?.product?.store?.name}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="bg-gray-100 w-16 h-16 mt-2">
                              <LazyLoadImage
                                src={e.productVariant?.product?.picture}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <div>{e.productVariant?.product?.name}</div>
                              <div className="text-xs text-gray-400">
                                Varian : {e.productVariant?.name}
                              </div>
                              <div>Jumlah : {e.qty}</div>
                              <div className="font-semibold flex gap-1 items-center">
                                <div>{currency(e.total!)}</div>
                                {(() => {
                                  if (
                                    e.productVariant?.wholesaleMin != null &&
                                    e.productVariant?.wholesalePrice != null
                                  ) {
                                    if (
                                      e.qty! >= e.productVariant.wholesaleMin
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
                    })}
                  </>
                );
              }
            })()}
          </div>
        </div>
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
          <div className="font-semibold py-4">METODE PEMBAYARAN</div>
          <div className="py-4 flex gap-2">
            <div className="p-2 border w-max rounded cursor-pointer hover:bg-primary hover:text-onPrimary">
              COD - Cash On Delivery
            </div>
          </div>
        </div>
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
          <div className="font-semibold py-4">DETAIL BIAYA</div>
          <div className="py-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div>Subtotal Produk</div>
              <div className="font-semibold">
                {currency(cartContext?.cart?.total ?? 0)}
              </div>
            </div>
            {/* <div className="flex justify-between items-center">
            <div>Ongkir</div>
            <div className="font-semibold">{currency(0)}</div>
          </div> */}
            <div className="flex justify-between items-center">
              <div>Biaya Admin</div>
              <div className="font-semibold">{currency(0)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Total Bayar</div>
              <div className="font-bold text-2xl text-red-500">
                {currency(cartContext?.cart?.total ?? 0)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button className="bg-primary text-onPrimary font-semibold p-2 w-full">
            Buat Pesanan
          </button>
        </div>
      </form>
    </div>
  );
}
