import { Provider } from "react-redux";
import { RouteObject } from "react-router-dom";
import UserLayout from "./UserLayout";
import HomePage from "./home/HomePage";
import { userStore } from "./userStoreRedux";

const userRoute: RouteObject = {
  element: (
    <Provider store={userStore}>
      <UserLayout />
    </Provider>
  ),
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};

export default userRoute;
