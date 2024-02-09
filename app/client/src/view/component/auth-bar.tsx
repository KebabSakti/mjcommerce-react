import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function AuthBar() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // 
  }, [authContext?.auth]);

  async function init() {
    authContext?.load();
  }

  return (
    <div className="bg-variant">
      <div className="hidden w-3/5 mx-auto h-6 text-onVariant text-xs lg:flex justify-end items-center gap-1">
        <Link to="">Daftar</Link>|<Link to="">Login</Link>
      </div>
    </div>
  );
}
