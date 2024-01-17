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
    <div className="bg-background">
      {(() => {
        if (auth.error) {
          return (
            <>
              <div className="min-h-screen flex flex-col justify-center items-center text-onBackground">
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
  );
}
