"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Authlayout from "../components/Authlayout/Authlayout";
import "./loginPage.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });
  const [loading, setLoading] = useState(false);

  // Helper function to map backend error fields to frontend fields
  const mapBackendErrorToField = (backendField) => {
    const fieldMap = {
      'email': 'email',
      'password': 'password',
      'account': 'email', // Map 'account' errors to email field
      'credentials': 'general', // Map 'credentials' errors to general
      'general': 'general'
    };
    
    return fieldMap[backendField] || 'general';
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({ email: "", password: "", general: "" });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password 
        }),
      });

      const data = await response.json();
      setLoading(false);

      // Check if the response indicates success (using the new AuthResponse format)
      if (data.success === true) {
        // Success - handle token and redirect
        const tokenExpiry = 24 * 60 * 60; // 24 hours in seconds
        
        // Store token in cookie with secure settings
        const cookieSettings = `authToken=${data.jwt}; path=/; max-age=${tokenExpiry}; SameSite=Lax`;
        document.cookie = cookieSettings;
        
        // Store user info in localStorage
        if (data.user) {
          localStorage.setItem("userName", data.user.fullName || data.user.email);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userId", data.user.id);
          if (data.user.role) {
            localStorage.setItem("userRole", data.user.role);
          }
        }
        
        // Redirect to homepage
        router.replace("/homepage");
      } else {
        // Handle error responses from backend
        
        // First, check for specific message patterns from backend
        if (data.message) {
          // Handle "account not found" or "email doesn't exist" type errors
          const lowerMessage = data.message.toLowerCase();
          if (lowerMessage.includes("account") && 
              (lowerMessage.includes("found") || 
               lowerMessage.includes("does not exist") ||
               lowerMessage.includes("no account"))) {
            setErrors(prev => ({
              ...prev,
              email: data.message
            }));
            return;
          }
          
          // Handle "incorrect password" type errors
          if (lowerMessage.includes("password") || 
              lowerMessage.includes("incorrect") ||
              lowerMessage.includes("wrong")) {
            setErrors(prev => ({
              ...prev,
              password: data.message
            }));
            return;
          }
          
          // Handle "email required" or "password required" type errors
          if (lowerMessage.includes("email") && lowerMessage.includes("required")) {
            setErrors(prev => ({
              ...prev,
              email: data.message
            }));
            return;
          }
          
          if (lowerMessage.includes("password") && lowerMessage.includes("required")) {
            setErrors(prev => ({
              ...prev,
              password: data.message
            }));
            return;
          }
        }
        
        // Then check for field-specific errors from backend response
        if (data.field) {
          const targetField = mapBackendErrorToField(data.field);
          setErrors(prev => ({
            ...prev,
            [targetField]: data.message || "Login failed. Please try again."
          }));
        } else {
          // No field specified - treat as general error
          setErrors(prev => ({
            ...prev,
            general: data.message || "Login failed. Please try again."
          }));
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      
      // Handle different types of network errors
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setErrors(prev => ({
          ...prev,
          general: "Unable to connect to server. Please check your internet connection."
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: "An unexpected error occurred. Please try again later."
        }));
      }
    }
  };

  // Handle input change and clear errors for that field
  const handleInputChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    } else if (field === "password") {
      setPassword(value);
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: "" }));
      }
    }
    
    // Also clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
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
          <form className="form" onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="example@deltacooling.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
              />
              {errors.email && <p className="error-message field-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`password-input ${errors.password ? 'input-error' : ''}`}
                  value={password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={loading}
                  required
                  minLength="6"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="error-message field-error">{errors.password}</p>}
            </div>

            {errors.general && (
              <div className="error-container">
                <p className="error-message general-error">
                  {errors.general}
                </p>
              </div>
            )}

            <div className="actions">
              <button 
                type="submit" 
                className="login-btn" 
                disabled={loading}
                aria-label={loading ? "Logging in..." : "Login"}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : "Login"}
              </button>

              <div className="auth-links">
                <Link href="/forgotpasswordpage" className="link">
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
          © {new Date().getFullYear()} Delta Cooling Systems Limited. All rights reserved.
        </div>
      </div>
    </Authlayout>
  );
}