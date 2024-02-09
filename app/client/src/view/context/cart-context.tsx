import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItemModel } from "../../../../lib/model/cart-item-model";
import { CartModel } from "../../../../lib/model/cart-model";
import { ProductVariant } from "../../../../lib/model/product-variant";
import { Empty } from "../../lib/config/type";
import { debounce } from "../../lib/helper/common";
import CartRepository from "../../lib/repository/cart-repository";
import { AuthContext } from "./auth-context";

export interface CartContextType {
  cart: CartModel | Empty;
  getCartItem: (variant: ProductVariant) => CartItemModel | Empty;
  addItem: (variant: ProductVariant) => void;
  removeItem: (variant: ProductVariant) => void;
}

const cartRepository = new CartRepository();
export const CartContext = createContext<CartContextType | Empty>(null);

export function CartProvider({ children }: any) {
  const defaultValue = {
    id: nanoid(),
    qty: 0,
    total: 0,
    cartItem: [],
  };

  const authContext = useContext(AuthContext);
  const [cart, setCart] = useState<CartModel | Empty>(defaultValue);
  const [debounceUpdate, cancelDebounce] = debounce(updateCart, 500);

  useEffect(() => {
    init();
  }, [authContext?.auth]);

  useEffect(() => {
    debounceUpdate();

    return () => {
      cancelDebounce();
    };
  }, [cart]);

  async function init() {
    if (authContext?.auth == null) {
      setCart(defaultValue);
    } else {
      const result = await cartRepository.show({ token: authContext.auth });
      if (result.data) {
        setCart(result.data);
      }
    }
  }

  async function updateCart() {
    if (authContext?.auth) {
      const param = cart as any;
      cartRepository.update({ ...param, token: authContext?.auth });
    }
  }

  function getCartItem(variant: ProductVariant | Empty): CartItemModel | Empty {
    if (variant) {
      let cartItem: CartItemModel;
      const items = cart!.cartItem!;
      const index = items.findIndex((e) => e.productVariantId == variant.id);

      if (index >= 0) {
        cartItem = items[index];
        return cartItem;
      }
    }
  }

  function addItem(variant: ProductVariant) {
    const items = cart!.cartItem!;
    const index = items.findIndex((e) => e.productVariantId == variant.id);

    if (index >= 0) {
      const itemQty = items[index].qty! + 1;
      const itemTotal = itemQty * variant.price!;

      items[index] = { ...items[index], qty: itemQty, total: itemTotal };
    } else {
      items.push({
        id: nanoid(),
        cartId: cart!.id,
        productId: variant.productId,
        productVariantId: variant.id,
        qty: 1,
        total: variant.price,
      });
    }

    const cartTotal = items.reduce((a, b) => a + Number(b.total!), 0);
    const cartQtyTotal = items.reduce((a, b) => a + Number(b.qty!), 0);

    setCart({
      ...cart,
      cartItem: items,
      qty: cartQtyTotal,
      total: cartTotal,
    });
  }

  function removeItem(variant: ProductVariant) {
    const items = cart!.cartItem!;
    const index = items.findIndex((e) => e.productVariantId == variant.id);

    if (index >= 0) {
      if (items[index].qty! > 1) {
        const itemQty = items[index].qty! - 1;
        const itemTotal = itemQty * variant.price!;

        items[index] = { ...items[index], qty: itemQty, total: itemTotal };
      } else {
        items.splice(index, 1);
      }

      const cartTotal = items.reduce((a, b) => a + Number(b.total!), 0);
      const cartQtyTotal = items.reduce((a, b) => a + Number(b.qty!), 0);

      setCart({
        ...cart,
        cartItem: items,
        qty: cartQtyTotal,
        total: cartTotal,
      });
    }
  }

  return (
    <CartContext.Provider value={{ cart, getCartItem, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
