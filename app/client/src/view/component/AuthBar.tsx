import { useEffect } from "react";
import { Link } from "react-router-dom";
import { check } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

export default function AuthBar() {
  const auth = useAppSelector((state: RootState) => state.auth.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
  }, []);

  function init() {
    dispatch(check());
  }

  return (
    <div className="bg-variant">
      <div className="hidden w-3/5 mx-auto h-6 text-onVariant text-xs lg:flex justify-end items-center gap-1">
        {auth.data == null ? (
          <>
            <Link to="">Daftar</Link>|<Link to="">Login</Link>
          </>
        ) : (
          <>
            <Link to="">Hi, Udin</Link>|<Link to="">Logout</Link>
          </>
        )}
      </div>
    </div>
  );
}
