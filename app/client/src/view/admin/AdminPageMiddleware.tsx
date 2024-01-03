import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export default function AdminPageMiddleware({
  children,
}: {
  children: ReactElement;
}) {
  //validation goes here
  if (true) {
    return children;
  }

  return <Navigate replace to="/admin" />;
}
