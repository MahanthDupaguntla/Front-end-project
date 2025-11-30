export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
} | null;

export type AuthContextType = {
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

export type AuthProviderProps = {
  children: React.ReactNode;
};
