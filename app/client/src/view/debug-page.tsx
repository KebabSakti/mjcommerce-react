import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-context";

export default function DebugPage() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    init();
  }, []);

  function init() {
    authContext?.load();
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {(() => {
        if (authContext?.auth != null) {
          return (
            <button
              className="bg-secondary text-onSecondary p-2"
              onClick={() => {
                authContext?.logout();
              }}
            >
              LOGOUT
            </button>
          );
        }

        return (
          <button
            className="bg-primary text-onPrimary p-2"
            onClick={() => {
              authContext?.login({
                email: "kebab@gmail.com",
                password: "buyung",
              });
            }}
          >
            LOGIN
          </button>
        );
      })()}
    </div>
  );
}
