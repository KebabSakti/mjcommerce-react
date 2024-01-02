import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./view/ErrorPage";
import userRoute from "./view/user/UserRoute";
import adminRoute from "./view/admin/AdminRoute";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [userRoute, adminRoute],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
