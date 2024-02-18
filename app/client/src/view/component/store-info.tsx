import { useContext, useEffect, useState } from "react";
import { StoreModel } from "../../../../lib/model/store-model";
import { DataState } from "../../lib/config/type";
import StoreRepository from "../../lib/repository/store-repository";
import { AuthContext } from "../context/auth-context";

const storeRepository = new StoreRepository();

export default function StoreInfo() {
  const authContext = useContext(AuthContext);
  const [store, setStore] = useState<DataState<StoreModel>>();

  useEffect(() => {
    if (authContext?.auth) {
      getStore();
    }
  }, [authContext?.auth]);

  async function getStore() {
    try {
      setStore({ ...store, status: "loading" });

      const result = await storeRepository.show({
        token: authContext?.auth?.token,
      });

      setStore({
        ...store,
        status: "loaded",
        data: result.data,
        error: null,
      });
    } catch (error: any) {
      setStore({ ...store, status: "error", error: error });
    }
  }

  return (
    <>
      {(() => {
        if (store?.status == "loaded") {
          return (
            <div className="bg-surface text-onSurface w-full py-2 px-4">
              {(() => {
                if (store?.data) {
                  return (
                    <div className="flex gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                        />
                      </svg>
                      <div className="text-green-500 font-semibold">
                        {store.data.name}
                      </div>
                    </div>
                  );
                }

                // return (
                //   <button className="bg-primary text-onPrimary p-2 rounded flex gap-1 items-center shrink-0 float-end">
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       fill="none"
                //       viewBox="0 0 24 24"
                //       strokeWidth={1.5}
                //       stroke="currentColor"
                //       className="w-6 h-6"
                //     >
                //       <path
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                //       />
                //     </svg>
                //     Buka Toko
                //   </button>
                // );
              })()}
            </div>
          );
        }

        return <div className="bg-gray-200 h-10 animate-pulse"></div>;
      })()}
    </>
  );
}
