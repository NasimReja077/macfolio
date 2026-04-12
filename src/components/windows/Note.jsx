import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MacWindow from "./MacWindow";
import "./note.scss";

const FALLBACK = `# 👋 Hello, I'm Nasim Reja

A full-stack web developer from Kolkata, India.

## Skills

\`\`\`typescript
const skills = {
  frontend: ["React", "Vue.js", "TypeScript", "Sass"],
  backend:  ["Node.js", "Express", "Python", "Django"],
  database: ["MongoDB", "MySQL", "PostgreSQL"],
  tools:    ["Git", "Docker", "Vite", "Webpack"],
};
\`\`\`

## About

I love building clean, fast, and modern web applications.
Currently open to new opportunities and collaborations.

> "First, solve the problem. Then, write the code."

## Contact

- **Email:** rejanasim611@gmail.com
- **GitHub:** [NasimReja077](https://github.com/NasimReja077/)
- **LinkedIn:** [nasim-reja-mondal](https://www.linkedin.com/in/nasim-reja-mondal-404141225/)
`;

const Note = ({ windowName, setWindowsState }) => {
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    fetch("/note.txt")
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown(FALLBACK));
  }, []);

  return (
    <MacWindow
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="note.md"
      width="48vw"
      height="60vh"
    >
      <div className="note-window">
        {markdown === null ? (
          <div className="note-loading">Loading…</div>
        ) : (
          <Markdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "0.6rem",
                      fontSize: "0.82rem",
                      margin: "0.75rem 0",
                      background: "#1e1e2e",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </Markdown>
        )}
      </div>
    </MacWindow>
  );
};

export default Note;