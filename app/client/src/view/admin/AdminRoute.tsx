import { RouteObject } from "react-router-dom";
import AdminPageMiddleware from "./AdminPageMiddleware";

const adminRoute: RouteObject = {
  path: "/admin",
  children: [
    {
      index: true,
      element: <div>LOGIN</div>,
    },
    {
      path: "authenticated",
      element: (
        <AdminPageMiddleware>
          <div>LAYOUT</div>
        </AdminPageMiddleware>
      ),
      children: [
        {
          path: "dashboard",
          element: <div>DASHBOARD</div>,
        },
      ],
    },
  ],
};

export default adminRoute;
