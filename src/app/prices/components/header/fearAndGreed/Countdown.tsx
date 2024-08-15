"use client";

import { useEffect, useState } from "react";
import { formatSeconds } from "@/src/utils/format";

interface CountdownProps {
  initialSeconds: number;
}

const Countdown = ({ initialSeconds }: CountdownProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{formatSeconds(seconds)}</div>;
};

export default Countdown;
