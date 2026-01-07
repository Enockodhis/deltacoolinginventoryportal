"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Authlayout from "../components/Authlayout/Authlayout";
import "./forgotPasswordPage.css";
import Link from "next/link";

export default function forgotpasswordpage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Call your backend forgot password endpoint
      const response = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim()
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        setMessage("Password reset instructions have been sent to your email.");
        setEmailSent(true);
      } else {
        setError(data.message || "Failed to send reset email. Please try again.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setLoading(false);
      setError("Unable to connect to server. Please check your connection and try again.");
    }
  };

  const handleBackToLogin = () => {
    router.push("/");
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
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h2 className="page-title">Reset Your Password</h2>
            <p className="page-subtitle">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <div className="form-group">
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="example@deltacooling.com"
                className={`input ${error ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading || emailSent}
                required
                autoComplete="email"
              />
              {error && <p className="error-message field-error">{error}</p>}
            </div>

            {message && (
              <div className="success-container">
                <p className="success-message">
                  {message}
                </p>
              </div>
            )}

            <div className="actions">
              <button 
                type="submit" 
                className="login-btn" 
                disabled={loading || emailSent}
                aria-label={loading ? "Sending instructions..." : "Send Reset Instructions"}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : emailSent ? "Instructions Sent" : "Send Reset Instructions"}
              </button>

              <div className="auth-links">
                <button 
                  type="button" 
                  className="link-button" 
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  ← Back to Login
                </button>
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
          © {new Date().getFullYear()} Delta Cooling Systems Limited. All rights reserved.
        </div>
      </div>
    </Authlayout>
  );
}