import { Link } from "react-router-dom";

export default function AuthBar() {
  return (
    <div className="bg-variant">
      <div className="hidden w-3/5 mx-auto h-6 text-onVariant text-xs lg:flex justify-end items-center gap-1">
        <Link to="">Daftar</Link>|<Link to="">Login</Link>
      </div>
    </div>
  );
}
