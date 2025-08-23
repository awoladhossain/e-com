import { useEffect, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2025-08-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, mins, secs });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className="deals__countdown flex-wrap">
      <div className="deals__countdown__card">
        <h4>{timeLeft.days}</h4>
        <p>Days</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{timeLeft.hours}</h4>
        <p>Hours</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{timeLeft.mins}</h4>
        <p>Mins</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{timeLeft.secs}</h4>
        <p>Secs</p>
      </div>
    </div>
  );
};

export default Countdown;
