import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./view/component/layout";
import ErrorPage from "./view/error-page";
import HomePage from "./view/home-page";
import ProductDetailPage from "./view/product-detail-page";
import ProductPage from "./view/product-page";
import { store } from "./view/redux/store";
import DebugPage from "./view/debug-page";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/debug", element: <DebugPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
