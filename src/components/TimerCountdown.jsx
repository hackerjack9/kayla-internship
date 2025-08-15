import { useEffect, useState } from "react";

const TimerCountdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const targetTime = new Date(expiryDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // initial call
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default TimerCountdown;
