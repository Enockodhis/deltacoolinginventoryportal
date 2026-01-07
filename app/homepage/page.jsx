"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./homePage.css";

export default function Homepage() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "User");
  }, []);

  const handleLogout = () => {
    document.cookie = "authToken=; Max-Age=0; path=/";
    localStorage.removeItem("userName");
    window.location.href = "/loginpage";
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="app-shell">
      <Header userName={userName} onLogout={handleLogout} />

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="menu">
            <ul>
              <li
                className={isActive("/homepage") ? "active" : ""}
                onClick={() => router.push("/homepage")}
              >
                Dashboard
              </li>

              <li
                className={isActive("/scanqrpage") ? "active" : ""}
                onClick={() => router.push("/scanqrpage")}
              >
                Scan QR Code
              </li>

              <li
                className={isActive("/manageproductspage") ? "active" : ""}
                onClick={() => router.push("/manageproductspage")}
              >
                Products
              </li>

              <li
                className={isActive("/activitylogspage") ? "active" : ""}
                onClick={() => router.push("/activitylogspage")}
              >
                Activity Logs
              </li>

              <li
                className={isActive("/usermanagementpage") ? "active" : ""}
                onClick={() => router.push("/usermanagementpage")}
              >
                User Management
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
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
            <div
              className="card manage-products"
              onClick={() => router.push("/manageproductspage")}
            >
              <h3>Manage Products</h3>
              <p>Add, Edit & Remove Items</p>
            </div>

            <div
              className="card scan-qr"
              onClick={() => router.push("/scanqrpage")}
            >
              <h3>Scan QR Code</h3>
              <p>Quick Scan & Lookup</p>
            </div>

            <div
              className="card search-inventory"
              onClick={() => router.push("/manageproductspage")}
            >
              <h3>Search Inventory</h3>
              <p>Fast Lookup</p>
            </div>
          </section>

          {/* Scan/Search Section */}
          <section className="search-section">
            <div
              className="scan-btn"
              onClick={() => router.push("/scanqrpage")}
            >
              Scan QR Code &gt;
            </div>

            <input type="text" placeholder="Enter Product Code..." />
            <button className="search-btn">Search</button>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}