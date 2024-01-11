import { Spinner } from "@material-tailwind/react";
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

const authController = new AuthController();

export default function Layout() {
  const auth = useAppSelector((state: RootState) => state.auth.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initAuth();
  }, []);

  async function initAuth(): Promise<void> {
    try {
      const token = await authController.getToken();
      dispatch(authComplete(token));
    } catch (error) {
      dispatch(authError(Failure.handle(error)));
    }
  }

  return (
    <div className="bg-background">
      {(() => {
        if (auth.error) {
          return (
            <>
              <div className="min-h-screen flex justify-center items-center">
                <div className="bg-surface p-4 rounded-lg shadow text-onSurface">
                  {auth.error.message}
                </div>
              </div>
            </>
          );
        }

        if (auth.data) {
          return (
            <>
              <AuthBar />
              <NavBar />
              <Outlet />
              <Footer />
            </>
          );
        }

        return (
          <>
            <div className="min-h-screen flex justify-center items-center">
              <Spinner className="h-10 w-10" color="teal" />
            </div>
          </>
        );
      })()}
    </div>
  );
}
