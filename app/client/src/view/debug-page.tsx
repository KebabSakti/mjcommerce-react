import { useContext, useState } from "react";
import { CartContext } from "./context/cart-context";

export default function DebugPage() {
  const cartContext = useContext(CartContext);
  const [form, setForm] = useState({ item: 0 });

  function formOnChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <div>ID : {cartContext?.cart?.id}</div>
        <div>QTY : {cartContext?.cart?.qty}</div>
        <div>TOTAL : {cartContext?.cart?.total}</div>
      </div>
      <div className="flex">
        <button className="bg-primary text-onPrimary p-2">KURANG</button>
        <input
          type="text"
          className="w-24 text-center"
          name="item"
          value={form.item}
          onChange={formOnChange}
        />
        <button className="bg-primary text-onPrimary p-2">TAMBAH</button>
      </div>
    </div>
  );
}
