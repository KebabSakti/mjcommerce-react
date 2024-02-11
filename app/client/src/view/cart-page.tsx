import { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { currency } from "../lib/helper/common";
import QuantityItem from "./component/quantity-item";
import StatusBar from "./component/status-bar";
import { CartContext } from "./context/cart-context";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  useEffect(() => {
    cartContext?.init();
  }, []);

  return (
    <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
      <StatusBar title="Keranjang Belanja" />
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
        {(() => {
          if (cartContext?.cart?.cartItem?.length) {
            return (
              <>
                {cartContext.cart.cartItem.map((e, i) => {
                  return (
                    <div key={i} className="flex gap-4 py-6">
                      <div className="bg-gray-100 w-24 h-24">
                        <LazyLoadImage
                          src={e.product?.picture}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <Link to={`/product-detail/${e.product?.id}`}>
                            {e.product?.name}
                          </Link>
                          <div className="text-xs text-gray-400">
                            Varian : {e.productVariant?.name}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="font-semibold flex gap-1 items-center">
                            <div>{currency(e.total!)}</div>
                            {(() => {
                              if (
                                e.productVariant?.wholesaleMin != null &&
                                e.productVariant?.wholesalePrice != null
                              ) {
                                if (e.qty! >= e.productVariant.wholesaleMin) {
                                  return (
                                    <div className="text-red-500 text-xs">
                                      (Grosir)
                                    </div>
                                  );
                                }
                              }
                            })()}
                          </div>
                          <QuantityItem productVariant={e.productVariant} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          }

          return (
            <div className="flex flex-col gap-4 items-center justify-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 stroke-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <div>Keranjang Belanja Kosong</div>
              <Link
                to="/product?page=1&limit=60&sort=priority&direction=desc"
                className="bg-primary text-onPrimary rounded py-2 px-4"
              >
                Cek produk Rekomendasi
              </Link>
            </div>
          );
        })()}
      </div>
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between md:items-center">
        <div className="font-bold">
          Total ({cartContext?.cart?.cartItem?.length ?? 0}) Produk :{" "}
          <span className="text-red-500 text-lg">
            {currency(cartContext?.cart?.total!)}
          </span>
        </div>
        {cartContext?.cart?.cartItem?.length == 0 ? (
          <></>
        ) : (
          <Link
            to="/checkout"
            className="bg-primary text-onPrimary p-2 w-full text-center md:w-max"
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
