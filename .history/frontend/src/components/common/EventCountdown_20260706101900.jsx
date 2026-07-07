import { useEffect, useState } from "react";

function EventCountdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="event-ended">
        Event Started
      </div>
    );
  }

  return (
    <div className="countdown-container">

      <div className="countdown-box">
        <span>{timeLeft.days}</span>
        <small>Days</small>
      </div>

      <div className="countdown-box">
        <span>{timeLeft.hours}</span>
        <small>Hours</small>
      </div>

      <div className="countdown-box">
        <span>{timeLeft.minutes}</span>
        <small>Minutes</small>
      </div>

      <div className="countdown-box">
        <span>{timeLeft.seconds}</span>
        <small>Seconds</small>
      </div>

    </div>
  );
}

export default EventCountdown;