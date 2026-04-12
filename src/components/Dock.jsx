import React, { useState } from "react";
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

const DockIcon = ({ icon, alt, label, bg, onClick, active }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`dock-icon ${active ? "active" : ""}`}
      style={{ background: bg }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
    >
      {hovered && <div className="dock-tooltip">{label}</div>}
      <img src={icon} alt={alt} />
      {active && <div className="dock-dot" />}
    </div>
  );
};

const Dock = ({ windowsState, setWindowsState }) => {
  const icons = [
    {
      icon: githubIcon,
      alt: "GitHub",
      label: "GitHub",
      bg: "linear-gradient(145deg, #2d2d2d, #111)",
      action: () => setWindowsState((s) => ({ ...s, github: true })),
      key: "github",
    },
    {
      icon: noteIcon,
      alt: "Notes",
      label: "Notes",
      bg: "linear-gradient(145deg, #ffd060, #ff9f0a)",
      action: () => setWindowsState((s) => ({ ...s, note: true })),
      key: "note",
    },
    {
      icon: pdfIcon,
      alt: "Resume",
      label: "Resume",
      bg: "linear-gradient(145deg, #ff6b6b, #c0392b)",
      action: () => setWindowsState((s) => ({ ...s, resume: true })),
      key: "resume",
    },
    {
      icon: calenderIcon,
      alt: "Calendar",
      label: "Calendar",
      bg: "linear-gradient(145deg, #ffffff, #f0f0f0)",
      action: () => window.open("https://calendar.google.com/", "_blank"),
      key: null,
    },
    {
      icon: spotifyIcon,
      alt: "Spotify",
      label: "Spotify",
      bg: "linear-gradient(145deg, #1ed760, #0f9b3e)",
      action: () => setWindowsState((s) => ({ ...s, spotify: true })),
      key: "spotify",
    },
    {
      icon: googleIcon,
      alt: "Google",
      label: "Google",
      bg: "linear-gradient(145deg, #ffffff, #f0f0f0)",
      action: () => setWindowsState((s) => ({ ...s, google: true })),
      key: "google",
    },
    {
      icon: youtubeIcon,
      alt: "YouTube",
      label: "YouTube",
      bg: "linear-gradient(145deg, #ff4444, #cc0000)",
      action: () => setWindowsState((s) => ({ ...s, youtube: true })),
      key: "youtube",
    },
    {
      icon: mailIcon,
      alt: "Mail",
      label: "Mail",
      bg: "linear-gradient(145deg, #3498db, #1a5fa8)",
      action: () => window.open("mailto:rejanasim611@gmail.com", "_blank"),
      key: null,
    },
    {
      icon: linkIcon,
      alt: "LinkedIn",
      label: "LinkedIn",
      bg: "linear-gradient(145deg, #7b4fa6, #5a189a)",
      action: () => window.open("https://www.linkedin.com/in/nasim-reja-mondal-404141225/", "_blank"),
      key: null,
    },
    {
      icon: cliIcon,
      alt: "Terminal",
      label: "Terminal",
      bg: "linear-gradient(145deg, #1a1a1a, #000)",
      action: () => setWindowsState((s) => ({ ...s, cli: true })),
      key: "cli",
    },
  ];

  return (
    <footer className="dock">
      <div className="dock-inner">
        {icons.map((item, i) => (
          <DockIcon
            key={i}
            icon={item.icon}
            alt={item.alt}
            label={item.label}
            bg={item.bg}
            onClick={item.action}
            active={item.key ? windowsState[item.key] : false}
          />
        ))}
      </div>
    </footer>
  );
};

export default Dock;