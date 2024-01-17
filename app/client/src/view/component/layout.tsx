import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthController from "../../lib/controller/auth-controller";
import { Failure } from "../../lib/helper/failure";
import { authComplete, authError } from "../redux/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import AuthBar from "./auth-bar";
import Footer from "./footer";
import NavBar from "./nav-bar";
import RefreshButton from "./refresh-button";

const authController = new AuthController();

export default function Layout() {
  const auth = useAppSelector((state: RootState) => state.auth.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      const token = await authController.access();
      dispatch(authComplete(token));
    } catch (error) {
      dispatch(authError(Failure.handle(error)));
    }
  }

  return (
    <>
      <div className="bg-background">
        {(() => {
          if (auth.error) {
            return (
              <>
                <div className="min-h-screen flex flex-col gap-4 justify-center items-center text-onBackground mx-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-32 h-32 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-center text-lg">{auth.error.message}</p>
                  <RefreshButton onClick={init} />
                </div>
              </>
            );
          }

          return (
            <>
              <AuthBar />
              <NavBar />
              <Outlet />
              <Footer />
            </>
          );
        })()}
      </div>
    </>
  );
}
