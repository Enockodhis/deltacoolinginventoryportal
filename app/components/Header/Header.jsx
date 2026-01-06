"use client";

export default function Header({ userName, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="company-name">DELTA COOLING SYSTEMS LTD</span>
      </div>

      <div className="header-right">
        <button className="header-btn firebase">Firebase</button>
        <button className="header-btn logout" onClick={onLogout}>
          {userName} (Logout)
        </button>
      </div>
    </header>
  );
}