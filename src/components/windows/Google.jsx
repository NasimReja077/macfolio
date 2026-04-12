import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./google.scss";

const SUGGESTIONS = [
  "React best practices 2024",
  "Tailwind CSS tricks",
  "JavaScript interview questions",
  "Open source projects to contribute",
  "Web performance optimization",
];

const Google = ({ windowName, setWindowsState }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (q) => {
    const term = q || query;
    if (term.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(term)}`, "_blank");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <MacWindow
      width="52vw"
      height="55vh"
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="Google"
    >
      <div className="google-window">
        <div className="google-content">
          {/* Google Logo */}
          <div className="google-logo">
            <span style={{ color: "#4285f4" }}>G</span>
            <span style={{ color: "#ea4335" }}>o</span>
            <span style={{ color: "#fbbc05" }}>o</span>
            <span style={{ color: "#4285f4" }}>g</span>
            <span style={{ color: "#34a853" }}>l</span>
            <span style={{ color: "#ea4335" }}>e</span>
          </div>

          {/* Search bar */}
          <div className={`google-search-bar ${focused ? "focused" : ""}`}>
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search Google or type a URL"
              autoFocus
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery("")}>✕</button>
            )}
          </div>

          {/* Suggestions */}
          {focused && !query && (
            <div className="google-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="suggestion-item" onClick={() => handleSearch(s)}>
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path d="M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                  {s}
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="google-btns">
            <button onClick={() => handleSearch()}>Google Search</button>
            <button onClick={() => window.open("https://www.google.com", "_blank")}>
              Open Google
            </button>
          </div>

          {/* Quick links */}
          <div className="google-quick-links">
            {[
              { label: "Gmail", url: "https://mail.google.com", emoji: "📧" },
              { label: "Drive", url: "https://drive.google.com", emoji: "📁" },
              { label: "Maps", url: "https://maps.google.com", emoji: "🗺️" },
              { label: "News", url: "https://news.google.com", emoji: "📰" },
              { label: "Images", url: "https://images.google.com", emoji: "🖼️" },
              { label: "Translate", url: "https://translate.google.com", emoji: "🌐" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="quick-link"
              >
                <span className="quick-link-icon">{link.emoji}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

export default Google;