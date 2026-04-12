import React, { useState, useRef, useEffect } from "react";
import MacWindow from "./MacWindow";
import "./cli.scss";

const COMMANDS = {
  help: {
    desc: "Show all available commands",
    fn: () => `
╔══════════════════════════════════╗
║        Available Commands        ║
╚══════════════════════════════════╝

  about       About me
  skills      Technical skill set
  projects    My projects
  experience  Work history
  contact     Get in touch
  github      Open GitHub profile
  social      Social media links
  clear       Clear terminal
  echo        Echo a string
`,
  },
  about: {
    desc: "About me",
    fn: () =>
      "I'm Nasim Reja — a full-stack web developer passionate about building\nmodern web applications with React, Node.js, and cloud technologies.",
  },
  skills: {
    desc: "List technical skills",
    fn: () => `
  Frontend  →  React, Vue.js, Vanilla JS, Sass, HTML/CSS
  Backend   →  Node.js, Express, Python, Django
  Database  →  MongoDB, MySQL, PostgreSQL
  Tools     →  Git, Docker, Webpack, Vite
  Cloud     →  AWS, Azure, Heroku
`,
  },
  projects: {
    desc: "View projects",
    fn: () => `
  1. Portfolio Website      React + Vite
  2. E-commerce Platform    MERN Stack
  3. Task Management App    Next.js
  4. Real-time Chat App     Socket.io
  5. Data Dashboard         React + Chart.js
`,
  },
  experience: {
    desc: "Work experience",
    fn: () => `
  Senior Developer @ Tech Corp  (2022 – Present)
    · Led development of 5+ React applications
    · Mentored junior developers

  Full Stack Developer @ Web Solutions  (2020 – 2022)
    · Built scalable APIs with Node.js
    · Designed responsive UIs with React
`,
  },
  contact: {
    desc: "Contact information",
    fn: () => `
  Email     rejanasim611@gmail.com
  Phone     +9875453509
  Location  Kolkata, India
`,
  },
  github: {
    desc: "Open GitHub profile",
    fn: () => {
      window.open("https://github.com/NasimReja077/", "_blank");
      return "Opening GitHub profile...";
    },
  },
  social: {
    desc: "Social media links",
    fn: () => `
  LinkedIn  https://www.linkedin.com/in/nasim-reja-mondal-404141225
  Email     rejanasim611@gmail.com
  GitHub    https://github.com/NasimReja077/
`,
  },
  echo: {
    desc: "Echo a string",
    fn: (args) => args.join(" ") || "(empty)",
  },
  clear: {
    desc: "Clear terminal",
    fn: () => "__CLEAR__",
  },
};

const WELCOME = `
╔════════════════════════════════════════╗
║     Welcome to Nasim Reja's CLI!       ║
╚════════════════════════════════════════╝

  Type 'help' to see all available commands.

  Try:  about · skills · projects · github
`;

const Cli = ({ windowName, setWindowsState }) => {
  const [lines, setLines] = useState([{ type: "output", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const commandLine = { type: "input", text: `nasimreja:~$ ${trimmed}` };

    if (cmd in COMMANDS) {
      const result = COMMANDS[cmd].fn(args);
      if (result === "__CLEAR__") {
        setLines([]);
      } else {
        setLines((prev) => [
          ...prev,
          commandLine,
          { type: "output", text: result },
        ]);
      }
    } else {
      setLines((prev) => [
        ...prev,
        commandLine,
        {
          type: "error",
          text: `  command not found: ${cmd}\n  Type 'help' to see available commands.`,
        },
      ]);
    }

    setHistory((prev) => [trimmed, ...prev]);
    setHistIdx(-1);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((k) =>
        k.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <MacWindow
      width="60vw"
      height="65vh"
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="Terminal — zsh"
    >
      <div className="cli-window" onClick={() => inputRef.current?.focus()}>
        <div className="cli-output">
          {lines.map((line, i) => (
            <pre key={i} className={`cli-line ${line.type}`}>
              {line.text}
            </pre>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="cli-input-row">
          <span className="cli-prompt">nasimreja:~$</span>
          <input
            ref={inputRef}
            className="cli-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </MacWindow>
  );
};

export default Cli;