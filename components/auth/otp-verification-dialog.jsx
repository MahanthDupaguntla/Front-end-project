"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function OTPVerificationDialog({ 
  open, 
  onClose, 
  onVerify, 
  demoOTP 
}) {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);

  useEffect(() => {
    if (open) {
      setTimeLeft(300);
      inputRefs.current[0]?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOTP = [...otp];
    newOTP[index] = value.slice(-1); // Only take last digit
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOTP = pastedData.split("");
    setOTP([...newOTP, ...Array(6 - newOTP.length).fill("")]);
    
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    const result = await onVerify(otpCode);
    setLoading(false);

    if (result.success) {
      toast.success("OTP verified successfully!");
      setOTP(["", "", "", "", "", ""]);
    } else {
      toast.error(result.error || "Invalid OTP");
      setOTP(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl">Admin Verification Required</DialogTitle>
          <DialogDescription className="text-center">
            Enter the 6-digit OTP sent to your registered email
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Demo OTP Display - Remove in production */}
          {demoOTP && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-800 mb-1">Demo Mode - Your OTP:</p>
              <p className="text-2xl font-bold text-yellow-900 tracking-wider">{demoOTP}</p>
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="h-14 w-12 text-center text-xl font-bold"
                disabled={loading || timeLeft <= 0}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {timeLeft > 0 ? (
                <>Time remaining: <span className="font-semibold text-blue-600">{formatTime(timeLeft)}</span></>
              ) : (
                <span className="text-red-600 font-semibold">OTP expired</span>
              )}
            </p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={loading || timeLeft <= 0 || otp.some(d => !d)}
            className="w-full"
            size="lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* Resend OTP */}
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-blue-600"
              onClick={() => {
                toast.info("OTP resent successfully!");
                setTimeLeft(300);
                setOTP(["", "", "", "", "", ""]);
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Resend OTP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
