import React, { useState, useEffect } from "react";
import "./widgets.scss";

const WMO = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Icy Fog", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy Drizzle", icon: "🌧️" },
  61: { label: "Light Rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  71: { label: "Light Snow", icon: "🌨️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy Snow", icon: "❄️" },
  80: { label: "Showers", icon: "🌦️" },
  81: { label: "Rain Showers", icon: "🌧️" },
  82: { label: "Heavy Showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Hail Storm", icon: "⛈️" },
  99: { label: "Thunderstorm", icon: "⛈️" },
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kolkata coordinates
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639" +
        "&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature" +
        "&timezone=Asia%2FKolkata"
    )
      .then((r) => r.json())
      .then((data) => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const info = weather
    ? WMO[weather.weathercode] || { label: "Unknown", icon: "🌡️" }
    : null;

  return (
    <div className="widget weather-widget">
      <div className="widget-header">
        <span className="widget-location">📍 Kolkata, IN</span>
      </div>

      {loading ? (
        <div className="widget-loading">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
      ) : weather ? (
        <>
          <div className="weather-main">
            <span className="weather-icon-big">{info.icon}</span>
            <div className="weather-temps">
              <span className="weather-temp">{Math.round(weather.temperature_2m)}°</span>
              <span className="weather-feels">
                Feels {Math.round(weather.apparent_temperature)}°C
              </span>
            </div>
          </div>
          <div className="weather-label">{info.label}</div>
          <div className="weather-details">
            <div className="weather-detail">
              <span className="detail-icon">💧</span>
              <span>{weather.relativehumidity_2m}%</span>
            </div>
            <div className="weather-detail">
              <span className="detail-icon">💨</span>
              <span>{Math.round(weather.windspeed_10m)} km/h</span>
            </div>
          </div>
        </>
      ) : (
        <div className="widget-error">Weather unavailable</div>
      )}
    </div>
  );
};

export default WeatherWidget;