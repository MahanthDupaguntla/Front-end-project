"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { OTPVerificationDialog } from "@/components/auth/otp-verification-dialog";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [demoOTP, setDemoOTP] = useState(null);
  const { login, verifyOTP } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      if (result.requiresOTP) {
        // Admin user - show OTP dialog
        toast.success(result.message || "OTP sent to your email", {
          description: "Please check your email and enter the OTP",
          duration: 5000,
        });
        setDemoOTP(result.otp); // Demo only - remove in production
        setShowOTPDialog(true);
      } else {
        // Non-admin user - login directly
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } else {
      toast.error(result.error || "Invalid credentials");
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async (otpCode) => {
    const result = await verifyOTP(otpCode);
    
    if (result.success) {
      setShowOTPDialog(false);
      setDemoOTP(null);
      router.push("/admin");
      return { success: true };
    }
    
    return result;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              CP
            </div>
            <span className="text-2xl font-bold">CampusPulse</span>
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-lg">
                <div>
                  <strong>Admin:</strong> admin@campus.edu / admin123
                </div>
                <div>
                  <strong>Student:</strong> student@campus.edu / student123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>

      {/* OTP Verification Dialog */}
      <OTPVerificationDialog
        open={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        onVerify={handleVerifyOTP}
        demoOTP={demoOTP}
      />
    </div>
  );
}
