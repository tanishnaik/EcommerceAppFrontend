import React, { useEffect, useState } from "react";

// Lightning Deal Timer (Demo)
const LightningDealTimer = ({ endTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire && onExpire();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          onExpire && onExpire();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);
  const format = s => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };
  return (
    <div style={{ background: "#fbbf24", color: "#18181b", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 16, display: "inline-block", marginBottom: 12 }}>
      ⚡ Lightning Deal ends in: {format(timeLeft)}
    </div>
  );
};

export default LightningDealTimer;
