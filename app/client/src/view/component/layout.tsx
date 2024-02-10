import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AuthBar from "./auth-bar";
import ErrorBoundary from "./error-boundary";
import Footer from "./footer";
import NavBar from "./nav-bar";

const customTheme: CustomFlowbiteTheme = {
  carousel: {
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
      snap: "snap-x",
    },
  },
  modal: {
    root: {
      base: "fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto flex flex-col justify-center",
      inner:
        "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col",
    },
  },
};

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Flowbite theme={{ theme: customTheme }}>
        <ErrorBoundary>
          <div className="bg-background min-h-screen">
            <AuthBar />
            <NavBar />
            <Outlet />
            <Footer />
          </div>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="bg-secondary h-12 w-12 rounded-full flex justify-center items-center drop-shadow-lg fixed right-2 bottom-4 lg:right-[20.4%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-onSecondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </ErrorBoundary>
      </Flowbite>
    </>
  );
}
