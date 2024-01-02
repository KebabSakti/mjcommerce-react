import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import UserLayout from "./view/user/UserLayout";
import HomePage from "./view/user/home/HomePage";
import UserProtectedPage from "./view/user/UserProtectedPage";

interface DataProps<T> {
  data: { [key: string]: T };
  children?: ReactElement;
}

const data: DataProps<string> = {
  data: { name: "udin" },
  children: <HomePage />,
};

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    errorElement: <div>ERROR CUY</div>,
    children: [
      {
        path: "/",
        element: (
          <UserProtectedPage data={{ name: "udin" }}>
            <HomePage />
          </UserProtectedPage>
        ),
      },
      {
        path: "/admin",
        element: <div>ADMIN PAGE</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export type { DataProps };
