import React from "react";
import { Rnd } from "react-rnd";
import "./window.scss";

const MacWindow = ({
  children,
  width = "42vw",
  height = "45vh",
  windowName,
  setWindowsState,
  title,
}) => {
  return (
    <Rnd
      default={{
        width: width,
        height: height,
        x: Math.random() * 80 + 80,
        y: Math.random() * 60 + 50,
      }}
      minWidth={280}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-nav"
      style={{ zIndex: 100 }}
    >
      <div className="window">
        <div className="nav window-nav">
          <div className="dots">
            <div
              onClick={() =>
                setWindowsState((state) => ({
                  ...state,
                  [windowName]: false,
                }))
              }
              className="dot red"
              title="Close"
            />
            <div className="dot yellow" title="Minimize" />
            <div className="dot green" title="Maximize" />
          </div>
          <div className="title">
            <p>{title || "nasimreja — zsh"}</p>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;