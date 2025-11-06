"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

// Mock users - in production, this would be from a database
const MOCK_USERS = [
  { id: "1", email: "admin@campus.edu", password: "admin123", role: "admin", name: "Dr. Sarah Johnson" },
  { id: "2", email: "student@campus.edu", password: "student123", role: "student", name: "Alex Morgan" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingOTP, setPendingOTP] = useState(null); // Store OTP verification state
  const router = useRouter();

  useEffect(() => {
    // Check for stored user on mount
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Request OTP for admin users
  const requestOTP = async (email, password) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    
    if (!found) {
      return { success: false, error: "Invalid credentials" };
    }

    // Only require OTP for admin users
    if (found.role === "admin") {
      const otp = generateOTP();
      const otpData = {
        otp,
        user: found,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
      };
      setPendingOTP(otpData);
      
      // In production, send OTP via email/SMS
      // For demo, we'll return it in the response
      return { 
        success: true, 
        requiresOTP: true, 
        otp, // Demo only - remove in production
        message: `OTP sent to ${email}` 
      };
    }

    // For non-admin users, login directly
    const userData = { id: found.id, email: found.email, role: found.role, name: found.name };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return { success: true, requiresOTP: false };
  };

  // Verify OTP and complete login
  const verifyOTP = async (otp) => {
    if (!pendingOTP) {
      return { success: false, error: "No pending OTP verification" };
    }

    if (Date.now() > pendingOTP.expiresAt) {
      setPendingOTP(null);
      return { success: false, error: "OTP expired. Please request a new one." };
    }

    if (otp !== pendingOTP.otp) {
      return { success: false, error: "Invalid OTP. Please try again." };
    }

    // OTP verified, complete login
    const userData = { 
      id: pendingOTP.user.id, 
      email: pendingOTP.user.email, 
      role: pendingOTP.user.role, 
      name: pendingOTP.user.name 
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setPendingOTP(null);
    return { success: true };
  };

  const login = async (email, password) => {
    return requestOTP(email, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, verifyOTP, pendingOTP }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
