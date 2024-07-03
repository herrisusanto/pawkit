import { useEffect, useState } from "react";

type CountdownProps = {
  value?: number;
  onTimeout?: () => void;
};

const Countdown: React.FC<CountdownProps> = ({
  value = 60 * 2,
  onTimeout,
}: any) => {
  const [secondsRemaining, setSecondsRemaining] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else if (secondsRemaining === 0) {
        onTimeout && onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} : ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return formatTime(secondsRemaining);
};

export default Countdown;
