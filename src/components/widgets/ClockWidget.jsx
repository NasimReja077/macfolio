import React, { useState, useEffect } from "react";
import "./widgets.scss";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hourDeg = (h % 12) * 30 + m * 0.5;
  const minuteDeg = m * 6;
  const secondDeg = s * 6;

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const sinH = Math.sin((hourDeg * Math.PI) / 180);
  const cosH = Math.cos((hourDeg * Math.PI) / 180);
  const sinM = Math.sin((minuteDeg * Math.PI) / 180);
  const cosM = Math.cos((minuteDeg * Math.PI) / 180);
  const sinS = Math.sin((secondDeg * Math.PI) / 180);
  const cosS = Math.cos((secondDeg * Math.PI) / 180);

  return (
    <div className="widget clock-widget">
      <div className="clock-body">
        <svg className="analog-clock" viewBox="0 0 100 100">
          {/* Outer ring */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r1 = i % 3 === 0 ? 38 : 40;
            const r2 = 44;
            return (
              <line
                key={i}
                x1={50 + r1 * Math.sin(angle)}
                y1={50 - r1 * Math.cos(angle)}
                x2={50 + r2 * Math.sin(angle)}
                y2={50 - r2 * Math.cos(angle)}
                stroke={i % 3 === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)"}
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1={50 - 6 * sinH}
            y1={50 + 6 * cosH}
            x2={50 + 27 * sinH}
            y2={50 - 27 * cosH}
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1={50 - 7 * sinM}
            y1={50 + 7 * cosM}
            x2={50 + 36 * sinM}
            y2={50 - 36 * cosM}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1={50 - 8 * sinS}
            y1={50 + 8 * cosS}
            x2={50 + 40 * sinS}
            y2={50 - 40 * cosS}
            stroke="#ff6b35"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="white" />
          <circle cx="50" cy="50" r="1.5" fill="#ff6b35" />
        </svg>

        <div className="clock-info">
          <div className="clock-digital">{timeStr}</div>
          <div className="clock-date">{dateStr}</div>
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;