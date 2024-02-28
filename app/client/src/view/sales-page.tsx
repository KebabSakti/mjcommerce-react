import { Datepicker } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataState } from "../lib/config/type";
import { AuthContext } from "./context/auth-context";

export default function SalesPage() {
  const authContext = useContext(AuthContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = (page - 1) * (limit * 2);
  const [data, setData] = useState<DataState<Record<string, any>>>();

  console.log(new Date().toLocaleTimeString("id-ID"));

  useEffect(() => {
    getData();
  }, [authContext?.auth]);

  useEffect(() => {
    getData();
    console.log(query);
  }, [searchParams]);

  async function getData() {
    try {
      // setData({ ...data, status: "loading" });
      // const categories = await categoryRepository.read();
      // const products = await productRepository.read(query);
      // const result = {
      //   category: categories,
      //   product: products,
      // };
      // setData({
      //   ...data,
      //   status: "loaded",
      //   data: result,
      //   error: null,
      // });
    } catch (error: any) {
      setData({ ...data, status: "error", error: error });
    }
  }

  return (
    <>
      <div className="bg-surface text-onSurface p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-4">
          <div>Periode</div>
          <Datepicker
            className="grow md:grow-0"
            language="id-ID"
            name="startDate"
            onSelectedDateChanged={(date) => {
              const formattedDate = new Date(date).toISOString().split("T")[0];

              setSearchParams({ ...query, startDate: formattedDate });
            }}
          />
          <Datepicker
            className="grow md:grow-0"
            language="id-ID"
            name="endDate"
            onSelectedDateChanged={(date) => {
              const formattedDate = new Date(date).toISOString().split("T")[0];

              setSearchParams({ ...query, endDate: formattedDate });
            }}
          />
        </div>
      </div>
    </>
  );
}
