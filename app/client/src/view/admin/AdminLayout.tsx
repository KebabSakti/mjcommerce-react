import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col">
      <div>ADMIN LAYOUT</div>
      <Outlet />
    </div>
  );
}
