import { useContext } from "react";
import { CounterContext } from "./provider";
import { useSearchParams } from "react-router-dom";

export default function DebugPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const context: any = useContext(CounterContext);

  function increment() {
    context.setCounter(context.counter + 1);
  }

  function decrement() {
    context.setCounter(context.counter - 1);
  }

  console.log(searchParams.get('page'));

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
