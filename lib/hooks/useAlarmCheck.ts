"use client";
import { useEffect } from "react";

export function useAlarmCheck() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/alarm");
      const alarms = await res.json();
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

      alarms.forEach((alarm: any) => {
        if (alarm.isOn && alarm.time === currentTime) {
          // Fire browser notification
          if (Notification.permission === "granted") {
            new Notification("⏰ Alarm", { body: alarm.name });
          }

          // Play sound
          const audio = new Audio("/alarm.mp3");
          audio.play();
        }
      });
    }, 60 * 1000); // check every minute

    return () => clearInterval(interval);
  }, []);
}
