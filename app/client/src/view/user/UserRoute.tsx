import { RouteObject } from "react-router-dom";
import UserLayout from "./UserLayout";
import HomePage from "./home/HomePage";

const userRoute: RouteObject = {
  element: <UserLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};

export default userRoute;
