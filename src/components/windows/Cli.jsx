import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";   // ← This must be default import (NO curly braces)
import "./cli.scss";

const Cli = ({ windowName, setWindowsState }) => {
  const commands = {
    about: {
      description: "About me",
      usage: "about",
      fn: () =>
        "I am a full-stack web developer passionate about building modern web applications with React, Node.js, and cloud technologies.",
    },
    skills: {
      description: "List technical skills",
      usage: "skills",
      fn: () => `Frontend: React, Vue.js, Vanilla JS, Sass, HTML/CSS
Backend: Node.js, Express, Python, Django
Databases: MongoDB, MySQL
Tools: Git, Docker, Webpack, Vite
Cloud: AWS, Azure, Heroku`,
    },
    projects: {
      description: "View my projects",
      usage: "projects",
      fn: () => `1. Portfolio Website - React + Vite
2. E-commerce Platform - MERN Stack
3. Task Management App - Next.js
4. Real-time Chat App - Socket.io
5. Data Dashboard - React + Chart.js`,
    },
    experience: {
      description: "Display work experience",
      usage: "experience",
      fn: () => `Senior Developer @ Tech Corp (2022 - Present)
  - Led development of 5+ React applications
  - Mentored junior developers

Full Stack Developer @ Web Solutions (2020 - 2022)
  - Built scalable APIs with Node.js
  - Designed responsive UIs with React`,
    },
    contact: {
      description: "Get contact information",
      usage: "contact",
      fn: () => `Email: rejanasim611@gmail.com
Phone: +9875453509
Location: Kolkata, India`,
    },
    github: {
      description: "Open GitHub profile",
      usage: "github",
      fn: () => {
        window.open("https://github.com/NasimReja077/", "_blank");
        return "Opening GitHub profile...";
      },
    },
    resume: {
      description: "Download resume",
      usage: "resume",
      fn: () => "Resume download started... (Add actual download logic later)",
    },
    social: {
      description: "View social media links",
      usage: "social",
      fn: () => `LinkedIn: https://www.linkedin.com/in/nasim-reja-mondal-404141225
Email: rejanasim611@gmail.com`,
    },
    echo: {
      description: "Echo a passed string",
      usage: "echo <string>",
      fn: (...args) => args.join(" ") || "Nothing to echo",
    },
    clear: {
      description: "Clear the terminal",
      usage: "clear",
      fn: () => "", 
    },
  };

  const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to Nasim Reja's CLI!       ║
╚════════════════════════════════════════╝

Type 'help' to see all available commands.

Try these commands:
  • about       - Learn about me
  • skills      - My technical skills
  • projects    - View my projects
  • experience  - Work history
  • contact     - Get in touch
  • github      - Open my GitHub

Happy hacking! 🚀
`;

  return (
    <MacWindow 
      width="60vw" 
      height="65vh"
      windowName={windowName} 
      setWindowsState={setWindowsState}
    >
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel="nasimreja:~$ "
          promptLabelStyle={{ color: "#00ff00", fontWeight: "bold" }}
          style={{ 
            minHeight: "100%", 
            backgroundColor: "transparent",
            fontSize: "15px",
            lineHeight: "1.5"
          }}
          contentStyle={{ padding: "10px" }}
          inputTextStyle={{ color: "#ffffff" }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;