import { RouteObject } from "react-router-dom";
import AdminPageMiddleware from "./AdminPageMiddleware";
import AdminLayout from "./AdminLayout";

const adminRoute: RouteObject = {
  path: "/admin",
  children: [
    {
      index: true,
      element: <div>LOGIN</div>,
    },
    {
      path: "app",
      element: (
        <AdminPageMiddleware>
          <AdminLayout />
        </AdminPageMiddleware>
      ),
      children: [
        {
          index: true,
          element: <div>DASHBOARD</div>,
        },
        {
          path: "dashboard",
          element: <div>DASHBOARD</div>,
        },
        {
          path: "product",
          element: <div>PRODUCT</div>,
        },
      ],
    },
  ],
};

export default adminRoute;
