import React, { useRef, useState } from "react";
import "./wallpaper.scss";

const PRESETS = [
  {
    id: "default",
    name: "Aurora",
    url: "/ian-dooley-DuBNA1QMpPA-unsplash.jpg",
    thumb: "/ian-dooley-DuBNA1QMpPA-unsplash.jpg",
  },
  {
    id: "mountains",
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "forest",
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "ocean",
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "night",
    name: "Night City",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "desert",
    name: "Desert",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "abstract",
    name: "Abstract",
    url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=300&q=60",
  },
];

const WallpaperPicker = ({ current, onSelect, onClose }) => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(current);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onSelect(url);
  };

  return (
    <div className="wallpaper-overlay" onClick={onClose}>
      <div className="wallpaper-picker" onClick={(e) => e.stopPropagation()}>
        <div className="wp-header">
          <h2>Wallpaper</h2>
          <button className="wp-close" onClick={onClose}>✕</button>
        </div>

        <div className="wp-preview">
          <img src={preview} alt="Current wallpaper" />
        </div>

        <div className="wp-section-label">Presets</div>
        <div className="wp-grid">
          {PRESETS.map((p) => (
            <div
              key={p.id}
              className={`wp-thumb ${preview === p.url || current === p.url ? "active" : ""}`}
              onClick={() => {
                setPreview(p.url);
                onSelect(p.url);
              }}
            >
              <img src={p.thumb} alt={p.name} loading="lazy" />
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        <div className="wp-section-label">Custom</div>
        <button className="wp-upload-btn" onClick={() => fileRef.current.click()}>
          <span>📂</span> Upload from Computer
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </div>
    </div>
  );
};

export default WallpaperPicker;