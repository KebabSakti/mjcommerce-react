import { Badge } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="bg-background">
      {/* AUTH BAR */}
      <div className="bg-variant">
        <div className="hidden w-3/5 mx-auto h-6 text-onVariant text-xs lg:flex justify-end items-center">
          <Link to="">Daftar</Link>
          <span className="mx-1">|</span>
          <Link to="">Login</Link>
        </div>
      </div>
      {/* AUTH BAR */}

      {/* SEARCH BAR */}
      <div className="bg-primary">
        <div className="mx-4 h-16 flex justify-between items-center lg:mx-auto lg:w-3/5">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-onPrimary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
            <span className="text-onPrimary font-bold text-2xl hidden lg:block">
              MAJU JAYA
            </span>
          </div>
          <input
            type="text"
            placeholder="Cari di sini"
            className="bg-background rounded-lg h-10 px-4 mx-4 text-sm grow lg:mx-10"
          />
          <Badge content="0">
            <Link to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-onPrimary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
          </Badge>
        </div>
      </div>
      {/* SEARCH BAR */}

      {/* CONTENT */}
      <Outlet />
      {/* CONTENT */}

      {/* FOOTER */}
      <div className="bg-primary h-20 flex justify-center items-center text-onPrimary text-sm">
        Copyright Maju Jaya 2023. Hak Cipta Dilindungi
      </div>
      {/* FOOTER */}
    </div>
  );
}
