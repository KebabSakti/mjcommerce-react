import { RouteObject } from "react-router-dom";
import UserLayout from "./UserLayout";
import HomePage from "./home/HomePage";
import ErrorPage from "../ErrorPage";

const userRoute: RouteObject = {
  element: <UserLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};

export default userRoute;
