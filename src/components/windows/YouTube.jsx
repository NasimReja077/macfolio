import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./youtube.scss";

const FEATURED = [
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley" },
  { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", channel: "officialpsy" },
  { id: "hT_nvWreIhg", title: "Counting Stars - OneRepublic", channel: "OneRepublic" },
  { id: "JGwWNGJdvx8", title: "Shape of You - Ed Sheeran", channel: "Ed Sheeran" },
  { id: "kXYiU_JCYtU", title: "Numb - Linkin Park", channel: "Linkin Park" },
  { id: "450p7goxZqg", title: "Believer - Imagine Dragons", channel: "Imagine Dragons" },
];

const YouTube = ({ windowName, setWindowsState }) => {
  const [activeVideo, setActiveVideo] = useState(FEATURED[0]);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
    }
  };

  return (
    <MacWindow
      width="62vw"
      height="70vh"
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="YouTube"
    >
      <div className="youtube-window">
        {/* Sidebar */}
        <div className="yt-sidebar">
          <div className="yt-logo">
            <svg height="18" viewBox="0 0 90 20" fill="none">
              <path
                d="M27.9727 3.12324C27.6435 1.89289 26.6768 0.926151 25.4464 0.597034C23.2043 0 14.2646 0 14.2646 0C14.2646 0 5.32494 0 3.08283 0.597034C1.85248 0.926151 0.885742 1.89289 0.556625 3.12324C0 5.36535 0 10.0476 0 10.0476C0 10.0476 0 14.7299 0.556625 16.9721C0.885742 18.2024 1.85248 19.1691 3.08283 19.4983C5.32494 20.0953 14.2646 20.0953 14.2646 20.0953C14.2646 20.0953 23.2043 20.0953 25.4464 19.4983C26.6768 19.1691 27.6435 18.2024 27.9727 16.9721C28.5293 14.7299 28.5293 10.0476 28.5293 10.0476C28.5293 10.0476 28.5293 5.36535 27.9727 3.12324Z"
                fill="#ff0000"
              />
              <path d="M11.4219 14.3338L18.8462 10.0477L11.4219 5.76153V14.3338Z" fill="white" />
              <path d="M34.6024 13.0036L31.3945 1.41846H33.7012L35.3664 8.0877C35.3664 8.0877 35.6381 9.40932 35.7093 9.95453C35.7807 9.41039 36.0524 8.0877 36.0524 8.0877L37.7178 1.41846H40.0245L36.8164 13.0036V18.6762H34.6024V13.0036Z" fill="white"/>
              <path d="M40.8953 18.6762V5.76288H42.8477V7.30685C43.1191 6.82208 43.5069 6.43524 44.0111 6.14634C44.5153 5.85736 45.0764 5.71289 45.6948 5.71289C46.8306 5.71289 47.6498 6.12399 48.1524 6.94613C48.655 7.76832 48.9063 8.97852 48.9063 10.5767V18.6762H46.9539V10.7827C46.9539 9.85869 46.8147 9.16985 46.5363 8.71619C46.258 8.26253 45.8063 8.03567 45.1813 8.03567C44.6199 8.03567 44.155 8.2279 43.7867 8.61237C43.4183 8.99683 43.2341 9.51286 43.2341 10.1605V18.6762H40.8953Z" fill="white"/>
            </svg>
          </div>

          {/* Search */}
          <form className="yt-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search YouTube..."
            />
            <button type="submit">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </form>

          {/* Featured list */}
          <div className="yt-list">
            <div className="yt-list-label">Featured</div>
            {FEATURED.map((v) => (
              <div
                key={v.id}
                className={`yt-item ${activeVideo.id === v.id ? "active" : ""}`}
                onClick={() => setActiveVideo(v)}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title}
                />
                <div className="yt-item-info">
                  <span className="yt-item-title">{v.title}</span>
                  <span className="yt-item-channel">{v.channel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player */}
        <div className="yt-player">
          <div className="yt-embed">
            <iframe
              key={activeVideo.id}
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="yt-video-info">
            <p className="yt-video-title">{activeVideo.title}</p>
            <p className="yt-video-channel">{activeVideo.channel}</p>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

export default YouTube;