"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Authlayout from "../components/Authlayout/Authlayout";
import "./loginPage.css";
import Link from "next/link";

export default function loginpage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
         document.cookie = `authToken=${data.token}; path=/`;
         localStorage.setItem("userName", data.user.name);

         router.replace("/homepage"); // redirect
      } else {
        setError(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <Authlayout>
      <div className="login-container">
        {/* Header */}
        <div className="header">
          <img
            src="/images/deltalogo.png"
            alt="Delta Cooling Systems Logo"
            className="logo"
          />
          <div>
            <h1 className="company-title">DELTA COOLING SYSTEMS LTD</h1>
            <div className="divider"></div>
            <p className="portal-title">INTERNAL INVENTORY PORTAL</p>
          </div>
        </div>

        {/* Card */}
        <div className="card">
          <form className="form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="example@deltacooling.com"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="actions">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="auth-links">
                <Link href="/forgot-password" className="link">
                  Forgot password?
                </Link>
                <span className="separator">|</span>
                <Link href="/register" className="link create-account">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="footer">
          © 2026 Delta Cooling Systems Limited. All rights reserved.
        </div>
      </div>
    </Authlayout>
  );
}