import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import StatusBar from "./component/status-bar";
import { AuthContext } from "./context/auth-context";

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    authContext?.logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
      <StatusBar title="Halaman Anda" />
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex justify-between items-center">
        <div className="font-semibold">
          <div className="line-clamp-1">{authContext?.auth?.user?.name}</div>
          <div className="line-clamp-1">{authContext?.auth?.user?.email}</div>
          <Link to="" className="text-primary flex items-center">
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
            Edit Akun
          </Link>
        </div>
        <div className="flex flex-col gap-1 shrink-0 md:flex-row md:gap-2">
          <button className="bg-primary text-onPrimary font-semibold p-2 rounded flex gap-1 items-center">
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
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
            Buka Toko
          </button>
          <button
            className="bg-red-500 text-white font-semibold p-2 rounded flex gap-1 items-center"
            onClick={logout}
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
            Logout
          </button>
        </div>
      </div>
      <div className="bg-primary text-onPrimary w-full">
        <div className="flex divide-x divide-onPrimary overflow-x-scroll no-scrollbar">
          <div className="bg-surface text-onSurface font-semibold py-2 px-4 shrink-0 flex gap-2 items-center">
            <div>Pesanan Saya</div>
            <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
              1
            </div>
          </div>
          <div className="py-2 px-4 shrink-0 flex gap-2 items-center">
            <div>Orderan Masuk</div>
            <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
              2
            </div>
          </div>
          <div className="py-2 px-4 shrink-0">Produk Saya</div>
          <div className="py-2 px-4 shrink-0">Edit Profil</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
