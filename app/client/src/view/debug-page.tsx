import { useContext } from "react";
import { useLocation } from "react-router-dom";
import parseQueryString from "../lib/helper/parse-querystring";
import { CounterContext } from "./provider";

export default function DebugPage() {
  const location = useLocation();
  const context: any = useContext(CounterContext);

  function increment() {
    context.setCounter(context.counter + 1);
  }

  function decrement() {
    context.setCounter(context.counter - 1);
  }

  console.log(parseQueryString(location.search));

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center gap-6">
        <button className="bg-red-500 p-2 text-white" onClick={decrement}>
          KURANG
        </button>
        <div className="text-lg font-bold">{context["counter"]}</div>
        <button className="bg-green-500 p-2 text-white" onClick={increment}>
          TAMBAH
        </button>
      </div>
    </>
  );
}
