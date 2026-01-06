"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./homePage.css";

export default function Homepage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "User");
  }, []);

  const handleLogout = () => {
    document.cookie = "authToken=; Max-Age=0; path=/";
    localStorage.removeItem("userName");
    window.location.href = "/loginpage";
  };

  return (
    <div className="app-shell">
       <Header userName={userName} onLogout={handleLogout} />

      <div className="dashboard-container">
        {/* Sidebar */}
         <aside className="sidebar">
          <div className="logo">Dashboard</div>
          <nav className="menu">
            <ul>
              <li className="active">Dashboard</li>
              <li>Scan QR Code</li>
              <li>Products</li>
              <li>Activity Logs</li>
              <li>User Management</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Topbar */}
          <div className="topbar">
            <button className="topbar-btn firebase">Firebase</button>
            <button className="topbar-btn user" onClick={handleLogout}>
              {userName} (Logout)
            </button>
          </div>

          {/* Overview */}
          <section className="overview">
            <h2>Overview</h2>
            <ul>
              <li>Scan QR Code or Enter Product Code to Search items</li>
              <li>View Product Details, Stock, and Specifications</li>
              <li>Internal Database Access</li>
            </ul>
          </section>

          {/* Action Cards */}
          <section className="actions-cards">
            <div className="card manage-products">
              <h3>Manage Products</h3>
              <p>Add, Edit & Remove Items</p>
            </div>
            <div className="card scan-qr">
              <h3>Scan QR Code</h3>
              <p>Quick Scan & Lookup</p>
            </div>
            <div className="card search-inventory">
              <h3>Search Inventory</h3>
              <p>Fast Lookup</p>
            </div>
          </section>

          {/* Scan/Search Section */}
          <section className="search-section">
            <div className="scan-btn">Scan QR Code &gt;</div>
            <input type="text" placeholder="Enter Product Code..." />
            <button className="search-btn">Search</button>
          </section>

           {/* Footer */}
          <Footer />

        </main>

      </div>
    </div>
  );
}