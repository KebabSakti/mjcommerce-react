import { useState } from "react";

export default function CountdownButton({ onClick }: { onClick: () => void }) {
  const [timer, setTimer] = useState(0);

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

  return (
    <button
      type="button"
      className="bg-primary text-onPrimary font-semibold p-2 shrink-0 w-[30%] disabled:bg-gray-300"
      onClick={() => {
        if (timer == 0) {
          onClick();
          countdown();
        }
      }}
      disabled={timer > 0}
    >
      {timer > 0 ? timer : "Kode OTP"}
    </button>
  );
}
