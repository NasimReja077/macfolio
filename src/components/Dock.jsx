import React from "react";
import "./dock.scss";

import githubIcon from "../assets/doc-icons/github.svg";
import noteIcon from "../assets/doc-icons/note.svg";
import pdfIcon from "../assets/doc-icons/pdf.svg";
import calenderIcon from "../assets/doc-icons/calender.svg";
import spotifyIcon from "../assets/doc-icons/spotify.svg";
import mailIcon from "../assets/doc-icons/mail.svg";
import linkIcon from "../assets/doc-icons/link.svg";
import cliIcon from "../assets/doc-icons/cli.svg";
import googleIcon from "../assets/doc-icons/google.svg";
import youtubeIcon from "../assets/doc-icons/youtube.svg";

const Dock = ({ windowsState, setWindowsState }) => {
  return (
    <footer className="dock">
      <div
        onClick={() => setWindowsState((state) => ({ ...state, github: true }))}
        className="icon github"
      >
        <img src={githubIcon} alt="GitHub" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, note: true }))}
        className="icon note"
      >
        <img src={noteIcon} alt="Note" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, resume: true }))}
        className="icon pdf"
      >
        <img src={pdfIcon} alt="Resume PDF" />
      </div>

      <div
        onClick={() => window.open("https://calendar.google.com/", "_blank")}
        className="icon calender"
      >
        <img src={calenderIcon} alt="Calendar" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, spotify: true }))}
        className="icon spotify"
      >
        <img src={spotifyIcon} alt="Spotify" />
      </div>

      <div
        onClick={() => window.open("mailto:rejanasim611@gmail.com", "_blank")}
        className="icon mail"
      >
        <img src={mailIcon} alt="Email" />
      </div>

      <div
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/nasim-reja-mondal-404141225/",
            "_blank"
          )
        }
        className="icon link"
      >
        <img src={linkIcon} alt="LinkedIn" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, cli: true }))}
        className="icon cli"
      >
        <img src={cliIcon} alt="CLI" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, google: true }))}
        className="icon google"
      >
        <img src={googleIcon} alt="google" />
      </div>

      <div
        onClick={() => setWindowsState((state) => ({ ...state, youtube: true }))}
        className="icon youtube"
      >
        <img src={youtubeIcon} alt="youtube" />
      </div>
    </footer>
  );
};

export default Dock;