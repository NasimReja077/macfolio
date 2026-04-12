import React, { useState } from "react";
import "./app.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";
import Cli from "./components/windows/Cli";
import Google from "./components/windows/Google";
import YouTube from "./components/windows/YouTube";
import WallpaperPicker from "./components/WallpaperPicker";
import ClockWidget from "./components/widgets/ClockWidget";
import WeatherWidget from "./components/widgets/WeatherWidget";
import StockWidget from "./components/widgets/StockWidget";

const DEFAULT_WALLPAPER = "/ian-dooley-DuBNA1QMpPA-unsplash.jpg";

function App() {
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    google: false,
    youtube: false,
  });

  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPER);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    // Don't show context menu if clicking on a window or dock
    if (e.target.closest(".window") || e.target.closest(".dock") || e.target.closest("nav")) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    setContextMenu(null);
  };

  return (
    <main
      style={{ backgroundImage: `url(${wallpaper})` }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <Nav />

      <div className="desktop-widgets">
        <ClockWidget />
        <WeatherWidget />
        <StockWidget />
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="context-item"
            onClick={() => {
              setShowWallpaperPicker(true);
              setContextMenu(null);
            }}
          >
            <span>🖼️</span> Change Wallpaper
          </div>
          <div className="context-divider" />
          <div
            className="context-item"
            onClick={() => {
              setWindowsState((s) => ({ ...s, github: true }));
              setContextMenu(null);
            }}
          >
            <span>📁</span> New Window
          </div>
        </div>
      )}

      {showWallpaperPicker && (
        <WallpaperPicker
          current={wallpaper}
          onSelect={(w) => {
            setWallpaper(w);
            setShowWallpaperPicker(false);
          }}
          onClose={() => setShowWallpaperPicker(false)}
        />
      )}

      <Dock windowsState={windowsState} setWindowsState={setWindowsState} />

      {windowsState.github && (
        <Github windowName="github" setWindowsState={setWindowsState} />
      )}
      {windowsState.note && (
        <Note windowName="note" setWindowsState={setWindowsState} />
      )}
      {windowsState.resume && (
        <Resume windowName="resume" setWindowsState={setWindowsState} />
      )}
      {windowsState.spotify && (
        <Spotify windowName="spotify" setWindowsState={setWindowsState} />
      )}
      {windowsState.cli && (
        <Cli windowName="cli" setWindowsState={setWindowsState} />
      )}
      {windowsState.google && (
        <Google windowName="google" setWindowsState={setWindowsState} />
      )}
      {windowsState.youtube && (
        <YouTube windowName="youtube" setWindowsState={setWindowsState} />
      )}
    </main>
  );
}

export default App;