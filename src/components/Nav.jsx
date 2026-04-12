import React, { useState, useEffect } from "react";
import "./nav.scss";
import DateTime from "./DateTime";

const Nav = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <nav>
      <div className="nav-left">
        <div className="apple-logo">
          <svg width="14" height="17" viewBox="0 0 14 17" fill="white">
            <path d="M13.23 13.21c-.38.88-.83 1.69-1.36 2.44-.71 1.02-1.3 1.72-1.74 2.1-.7.64-1.44.97-2.24.99-.57 0-1.26-.16-2.05-.49-.8-.33-1.53-.49-2.2-.49-.71 0-1.46.16-2.26.49-.8.33-1.45.5-1.94.52-.76.03-1.52-.31-2.26-.99-.48-.42-1.09-1.14-1.83-2.17-.78-1.1-1.43-2.38-1.93-3.83-.54-1.56-.81-3.07-.81-4.53 0-1.67.36-3.11 1.09-4.31.57-.97 1.33-1.73 2.29-2.3.96-.57 2-.86 3.12-.88.61 0 1.41.19 2.4.56.99.37 1.62.56 1.89.56.21 0 .92-.22 2.12-.65 1.14-.4 2.1-.57 2.88-.51 2.13.17 3.73 1.01 4.78 2.54-1.9 1.15-2.84 2.77-2.82 4.83.02 1.61.6 2.95 1.74 4.01.52.49 1.1.87 1.74 1.14l-.41 1.07zM9.74 0c0 1.26-.46 2.44-1.37 3.52-.1.12-.2.22-.3.3-.27.23-.56.42-.87.56-.32.15-.62.22-.92.2-.04-.31-.06-.63-.06-.95 0-1.21.52-2.36 1.44-3.19.46-.41 1.04-.74 1.73-.99.07.18.1.37.1.55z"/>
          </svg>
        </div>

        <div className="nav-item bold">Nasim Reja</div>
        <div className="nav-separator" />
        <div className="nav-item">File</div>
        <div className="nav-item">Window</div>
        <div className="nav-item">Terminal</div>
      </div>

      <div className="nav-right">
        {/* Wifi signal */}
        <div className="nav-signal" title={online ? "Connected" : "Offline"}>
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
            <path
              d="M8 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
              fill={online ? "white" : "rgba(255,255,255,0.3)"}
            />
            <path
              d="M4.5 7.5A4.96 4.96 0 0 1 8 6c1.38 0 2.63.56 3.5 1.5"
              stroke={online ? "white" : "rgba(255,255,255,0.3)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1.5 4.5A8.96 8.96 0 0 1 8 2c2.49 0 4.74 1.01 6.5 2.5"
              stroke={online ? "white" : "rgba(255,255,255,0.3)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Battery mock */}
        <div className="nav-battery">
          <div className="battery-body">
            <div className="battery-fill" />
          </div>
          <div className="battery-tip" />
        </div>

        <div className="nav-divider" />
        <div className="nav-time">
          <DateTime />
        </div>
      </div>
    </nav>
  );
};

export default Nav;