"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  clearError: () => void;
  pendingOTP: string | null;
  verifyOTP: (otp: string) => Promise<{ success: boolean; error?: string }>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_STORAGE_KEY = 'auth_user';
const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour

// Helper function to safely access localStorage
const safeLocalStorage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
      // Set session expiration
      localStorage.setItem(`${key}_expires`, (Date.now() + SESSION_TIMEOUT).toString());
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expires`);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  isValid: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    const expires = localStorage.getItem(`${key}_expires`);
    return expires ? Date.now() < parseInt(expires, 10) : false;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingOTP, setPendingOTP] = useState<string | null>(null);
  const router = useRouter();

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate password strength
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = safeLocalStorage.get(USER_STORAGE_KEY);
        if (storedUser && safeLocalStorage.isValid(USER_STORAGE_KEY)) {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        } else {
          safeLocalStorage.remove(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        safeLocalStorage.remove(USER_STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    
    // Input validation
    if (!email || !password) {
      const errorMsg = 'Email and password are required';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!isValidEmail(email)) {
      const errorMsg = 'Please enter a valid email address';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      // Simulate API call - replace with actual API call in production
      const response = await new Promise<{ success: boolean; user?: User; error?: string }>((resolve) => {
        setTimeout(() => {
          // Mock authentication
          if (email === 'admin@example.com' && password === 'password') {
            const userData: User = { 
              id: '1', 
              email, 
              name: 'Admin User',
              role: 'admin',
              token: `mock-jwt-token-${Date.now()}`
            };
            resolve({ success: true, user: userData });
          } else {
            resolve({ 
              success: false, 
              error: 'Invalid email or password' 
            });
          }
        }, 500);
      });

      if (response.success && response.user) {
        setUser(response.user);
        safeLocalStorage.set(USER_STORAGE_KEY, JSON.stringify(response.user));
        toast.success('Login successful');
        return { success: true };
      } else {
        const errorMsg = response.error || 'Login failed';
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An error occurred during login';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    safeLocalStorage.remove(USER_STORAGE_KEY);
    toast.success('Logged out successfully');
    router.push('/login');
  }, [router]);

  const clearError = useCallback(() => setError(null), []);

  const verifyOTP = useCallback(async (otp: string): Promise<{ success: boolean; error?: string }> => {
    if (!otp || otp.length !== 6) {
      const errorMsg = 'Please enter a valid 6-digit OTP';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Implement actual OTP verification logic here
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        if (otp === '123456') { // Mock verification
          setPendingOTP(null);
          toast.success('OTP verified successfully');
          resolve({ success: true, error: undefined });
        } else {
          const errorMsg = 'Invalid OTP';
          setError(errorMsg);
          toast.error(errorMsg);
          resolve({ success: false, error: errorMsg });
        }
      }, 500);
    });
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    clearError,
    pendingOTP,
    verifyOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
