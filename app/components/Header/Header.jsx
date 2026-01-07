"use client";

export default function Header({ userName, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <img
            src="/images/deltalogo.png"
            alt="Delta Cooling Systems Logo"
            className="logo"
          />
        <span className="company-name">DELTA COOLING SYSTEMS LTD INTERNAL INVENTORY PORTAL</span>
        </div>

      <div className="header-right">
        <button className="header-btn logout" onClick={onLogout}>
          {userName} (Logout)
        </button>
      </div>
    </header>
  );
}