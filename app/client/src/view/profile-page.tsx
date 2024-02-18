import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ModalPrompt from "./component/modal-prompt";
import StatusBar from "./component/status-bar";
import StoreInfo from "./component/store-info";
import { AuthContext } from "./context/auth-context";

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [prompt, setPrompt] = useState(false);

  function positivePrompt() {
    logout();
  }

  function negativePrompt() {
    setPrompt(false);
  }

  function logout() {
    authContext?.logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
        <StatusBar title="Halaman Anda" />
        <StoreInfo />
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex justify-between items-center">
          <div className="font-semibold">
            <div>{authContext?.auth?.user?.name}</div>
            <div>{authContext?.auth?.user?.email}</div>
            {/* <Link to="" className="text-primary flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Data
            </Link> */}
          </div>
          <button
            className="bg-red-500 text-white font-semibold p-1 rounded-full flex gap-1 items-center"
            onClick={() => {
              setPrompt(true);
            }}
          >
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
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>
        </div>
        <div className="bg-primary text-onPrimary w-full">
          <div className="flex divide-x divide-onPrimary overflow-x-scroll no-scrollbar">
            {(() => {
              const active =
                location.pathname == "/profile"
                  ? "bg-surface text-onSurface font-semibold"
                  : "bg-primary text-onPrimary";

              return (
                <Link
                  to="/profile?page=1&limit=5&sort=updated&direction=desc"
                  className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                >
                  <div>Pesanan Saya</div>
                  {/* <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
                    1
                  </div> */}
                </Link>
              );
            })()}
            {(() => {
              if (authContext?.auth?.user?.store) {
                const active =
                  location.pathname == "/profile/shop"
                    ? "bg-surface text-onSurface font-semibold"
                    : "bg-primary text-onPrimary";

                return (
                  <Link
                    to="/profile/shop?page=1&limit=5&sort=updated&direction=desc&filter=storeId&value=aaef7dc5-41f2-44cf-8748-06e28ab6f3f0"
                    className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                  >
                    <div>Orderan Masuk</div>
                    {/* <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
                    1
                  </div> */}
                  </Link>
                );
              }
            })()}
            {/* <Link to="" className="py-2 px-4 shrink-0">
              Produk Saya
            </Link> */}
          </div>
          <Outlet />
        </div>
      </div>
      <ModalPrompt
        show={prompt}
        positive={positivePrompt}
        negative={negativePrompt}
        text="Anda akan keluar dari akun, lanjutkan?"
      />
    </>
  );
}
