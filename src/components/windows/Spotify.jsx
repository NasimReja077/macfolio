import React from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss";

const Spotify = ({ windowName, setWindowsState }) => {
  return (
    <MacWindow
      width="55vw"
      windowName={windowName}
      setWindowsState={setWindowsState}
    >
      <div className="spotify-window">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/1YA5cPIfDy3L03bGnNiDM7?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </MacWindow>
  );
};

export default Spotify;
