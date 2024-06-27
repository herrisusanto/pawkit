import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  value?: Moment;
  showHours?: boolean;
  onTimeout?: () => void;
};

const Countdown: React.FC<CountdownProps> = ({
  value = moment().add(2, "minute"),
  showHours,
  onTimeout,
}: any) => {
  const [timer, setTimer] = useState<Moment>(moment());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const newValue = value.add(3, "second");
    if (newValue.diff(moment(), "second") > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(moment(newValue).subtract(1, "second"));

        if (newValue.diff(moment(), "second") === 0) {
          clearInterval(intervalRef.current);
          onTimeout && onTimeout();
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const remainingTime = moment.duration(timer.diff(moment()), "milliseconds");

  const remainingHours =
    remainingTime.hours().toString().length === 1
      ? "0" + remainingTime.hours() + ":"
      : remainingTime.hours();
  const remainingMinutes =
    remainingTime.minutes().toString().length === 1
      ? "0" + remainingTime.minutes()
      : remainingTime.minutes();
  const remainingSeconds =
    remainingTime.seconds().toString().length === 1
      ? "0" + remainingTime.seconds()
      : remainingTime.seconds();

  return `${showHours ? remainingHours : ""}${remainingMinutes}:${remainingSeconds}`;
};

export default Countdown;
