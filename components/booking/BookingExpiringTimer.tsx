"use client";

import { useEffect, useState } from "react";

interface IProps {
  expireAt: Date;
}

export default function BookingExpiringTimer({ expireAt }: IProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = expireAt.getTime() - now.getTime();
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  return (
    <p className="mb-2 rounded-sm bg-blue-100 p-2 text-sm font-medium">
      This booking order with Expire at {timeLeft}
    </p>
  );
}
