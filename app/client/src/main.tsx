import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./view/component/layout";
import { AuthProvider } from "./view/context/auth-context";
import DebugPage from "./view/debug-page";
import ErrorPage from "./view/error-page";
import HomePage from "./view/home-page";
import ProductDetailPage from "./view/product-detail-page";
import ProductPage from "./view/product-page";
import { store } from "./view/redux/store";

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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
