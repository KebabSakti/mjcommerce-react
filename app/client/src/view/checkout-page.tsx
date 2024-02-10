import { useContext, useEffect, useState } from "react";
import StatusBar from "./component/status-bar";
import { CartContext } from "./context/cart-context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { currency } from "../lib/helper/common";
import QuantityItem from "./component/quantity-item";

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    cartContext?.init();
  }, []);

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleForm() {}

  return (
    <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
      <StatusBar title="Ringkasan Orderan" />
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
        <div className="font-semibold py-4">DATA PENERIMA</div>
        <form onSubmit={handleForm} className="flex flex-col gap-2 py-4">
          <input
            type="text"
            placeholder="Nama"
            name="name"
            required
            className="border-gray-200 rounded w-full"
            value={input.name}
            onChange={inputOnChange}
          />
          <input
            type="text"
            placeholder="No WA"
            name="phone"
            required
            className="border-gray-200 rounded w-full"
            value={input.phone}
            onChange={inputOnChange}
          />
          <textarea
            placeholder="Alamat"
            name="address"
            required
            className="border-gray-200 rounded w-full h-32"
          />
        </form>
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
                      <div key={i} className="flex gap-4 py-6">
                        <div className="bg-gray-100 w-16 h-16">
                          <LazyLoadImage
                            src={e.product?.picture}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div>{e.product?.name}</div>
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
          <div className="flex justify-between items-center">
            <div>Ongkir</div>
            <div className="font-semibold">{currency(0)}</div>
          </div>
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
    </div>
  );
}
