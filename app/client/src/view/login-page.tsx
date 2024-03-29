import { Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../asset/maju-jaya-alt.png";
import { AuthContext } from "./context/auth-context";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ phone: "", otp: "" });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (authContext?.auth) {
      navigate("/", { replace: true });
    }
  }, [authContext?.auth]);

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function countdown() {
    let seconds = 60;
    setTimer(seconds--);

    const timer = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timer);
        setTimer(0);
      }

      setTimer(seconds--);
    }, 1000);
  }

  async function otp() {
    try {
      if (input.phone.length < 10) {
        alert("No Whatsapp tidak valid");
      } else {
        await authContext?.otp({ phone: input.phone });
        countdown();
      }
    } catch (error) {
      toast("Terjadi kesalahan, harap coba beberapa saat lagi");
    }
  }

  async function loginForm(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      await authContext?.login(input);
    } catch (error) {
      toast("Login gagal, cek kembali input anda");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-background min-h-screen flex flex-col gap-4 justify-center items-center">
        <Link to="/" className="w-1/2 md:w-[10%]">
          <img src={logo} alt="Logo Maju Jaya" />
        </Link>
        <div className="text-onBackground font-semibold text-lg">
          LOGIN PENGGUNA
        </div>
        <form
          onSubmit={loginForm}
          className="bg-surface text-onSurface p-4 drop-shadow rounded flex flex-col gap-4 w-[80%] md:w-[20%]"
        >
          <div className="flex gap-x-2">
            <input
              type="number"
              placeholder="No Whatsapp"
              name="phone"
              required
              className="border-gray-200 rounded w-full"
              value={input.phone}
              onChange={inputOnChange}
            />
            <button
              type="button"
              className="bg-primary text-onPrimary font-semibold p-2 shrink-0 w-[30%] disabled:bg-gray-300"
              onClick={otp}
              disabled={timer > 0}
            >
              {timer > 0 ? timer : "Kode OTP"}
            </button>
          </div>
          <input
            type="number"
            placeholder="Kode OTP"
            name="otp"
            required
            className="border-gray-200 rounded w-full disabled:bg-gray-300"
            onChange={inputOnChange}
          />
          <button
            className="bg-primary text-onPrimary font-semibold p-2 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? <Spinner /> : "LOGIN"}
          </button>
          {/* <div>
            <div className="flex justify-center items-center gap-x-1">
              <div>Belum punya akun?</div>
              <Link to="/register" className="text-primary font-semibold">
                Daftar
              </Link>
            </div>
            <div className="flex justify-center items-center gap-x-1">
              <Link to="/forgot" className="text-primary font-semibold">
                Lupa Password
              </Link>
            </div>
          </div> */}
        </form>
      </div>
    </>
  );
}
