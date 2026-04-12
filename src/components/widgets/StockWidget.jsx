import React, { useState, useEffect, useRef } from "react";
import "./widgets.scss";

const INITIAL = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.5, change: 2.34, isCrypto: true },
  { symbol: "AAPL", name: "Apple", price: 189.45, change: -0.87, isCrypto: false },
  { symbol: "TSLA", name: "Tesla", price: 248.9, change: 1.56, isCrypto: false },
  { symbol: "GOOGL", name: "Google", price: 172.3, change: 0.43, isCrypto: false },
  { symbol: "MSFT", name: "Microsoft", price: 415.8, change: -0.21, isCrypto: false },
];

const StockWidget = () => {
  const [stocks, setStocks] = useState(INITIAL);
  const [flash, setFlash] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) => {
        const newFlash = {};
        const updated = prev.map((s) => {
          const fluct = (Math.random() - 0.49) * (s.isCrypto ? 0.8 : 0.3);
          const newPrice = Math.max(0.01, s.price * (1 + fluct / 100));
          const priceDiff = newPrice - s.price;
          newFlash[s.symbol] = priceDiff >= 0 ? "up" : "down";
          return {
            ...s,
            price: newPrice,
            change: parseFloat((s.change + fluct * 0.08).toFixed(2)),
          };
        });
        setFlash(newFlash);
        setTimeout(() => setFlash({}), 600);
        return updated;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s) =>
    s.isCrypto
      ? `$${s.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : `$${s.price.toFixed(2)}`;

  return (
    <div className="widget stock-widget">
      <div className="widget-header">
        <span className="widget-title">📈 Markets</span>
        <span className="live-badge">LIVE</span>
      </div>
      <div className="stock-list">
        {stocks.map((s) => (
          <div
            key={s.symbol}
            className={`stock-row ${flash[s.symbol] || ""}`}
          >
            <div className="stock-left">
              <span className="stock-symbol">{s.symbol}</span>
              <span className="stock-name">{s.name}</span>
            </div>
            <div className="stock-right">
              <span className="stock-price">{fmt(s)}</span>
              <span className={`stock-change ${s.change >= 0 ? "pos" : "neg"}`}>
                {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockWidget;