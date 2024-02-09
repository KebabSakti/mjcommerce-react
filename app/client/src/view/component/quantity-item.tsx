import { useContext, useEffect } from "react";
import { ProductVariant } from "../../../../lib/model/product-variant";
import { Empty } from "../../lib/config/type";
import { CartContext } from "../context/cart-context";

export default function QuantityItem({
  productVariant,
}: {
  productVariant: ProductVariant | Empty;
}) {
  const cartContext = useContext(CartContext);

  useEffect(() => {
    //
  }, []);

  function increment() {
    cartContext?.addItem(productVariant!);
  }

  function decrement() {
    cartContext?.removeItem(productVariant!);
  }

  function inputOnChange(_: any) {
    // setCounter(e.target.value);
  }

  return (
    <>
      <div className="flex outline outline-1 outline-primary">
        <button className="bg-secondary p-2" onClick={decrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-4 stroke-onSecondary stroke-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        {(() => {
          let qty = 0;
          const cartItem = cartContext?.getCartItem(productVariant!);

          if (cartItem) {
            qty = cartItem!.qty!;
          }

          return (
            <input
              className="p-1 w-14 text-center"
              name="item"
              required
              value={qty}
              onChange={inputOnChange}
            />
          );
        })()}

        <button className="bg-primary p-2" onClick={increment}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-4 stroke-onPrimary stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
