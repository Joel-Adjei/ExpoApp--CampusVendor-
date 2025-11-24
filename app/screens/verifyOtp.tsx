import useAuthStore from "@/store/authStore";
import useOtpStore from "@/store/useOtp";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const VerifyOtp = () => {
  const { updateLogin } = useAuthStore();
  const router = useRouter();
  const { email = "", role, password, clearOtpDetails, otpToken } = useOtpStore();
  const [otp, setOtp] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStep, setVerificationStep] = useState<
    "input" | "verifying" | "success" | "error"
  >("input");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3") : "";

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      updateLogin({ email, password });
      clearOtpDetails();
      router.replace("/");
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Login failed", "Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  const handleVerifyOtp = async () => {
    const otpString = otp;
    if (otpString.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter all 6 digits");
      return;
    }

    setVerificationStep("verifying");

    try {
      // Simulate verification delay (replace with real API call)
      setTimeout(() => {
        setVerificationStep("success");
        setTimeout(() => {
          handleLogin();
        }, 1200);
      }, 1000);
    } catch (error) {
      setVerificationStep("error");
      setTimeout(() => setVerificationStep("input"), 2000);
      Alert.alert("Verification failed", "The OTP you entered is incorrect");
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    // Simulate resend
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300);
      setCanResend(false);
      setOtp("");
      inputRefs.current[0]?.focus();
      Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
    }, 1500);
  };

  const renderVerificationStep = () => {
    switch (verificationStep) {
      case "verifying":
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#1D4ED8" style={{ marginBottom: 12 }} />
            <Text style={styles.title}>Verifying OTP...</Text>
            <Text style={styles.sub}>Please wait while we verify your code</Text>
          </View>
        );

      case "success":
        return (
          <View style={styles.centered}>
            <Text style={styles.emoji}>✅</Text>
            <Text style={[styles.title, { color: "#15803D" }]}>Verification Successful!</Text>
            <Text style={styles.sub}>Redirecting you to your dashboard...</Text>
          </View>
        );

      case "error":
        return (
          <View style={styles.centered}>
            <Text style={styles.emoji}>❌</Text>
            <Text style={[styles.title, { color: "#DC2626" }]}>Verification Failed</Text>
            <Text style={styles.sub}>The OTP you entered is incorrect</Text>
          </View>
        );

      default:
        return (
          <View style={styles.container}>
            <View style={styles.otpRow}>
                <TextInput
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={6} // allow paste; logic handles splitting
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  returnKeyType="done"
                  textContentType="oneTimeCode"
                  autoFocus={true}
                />
            </View>

            <View style={styles.timerRow}>
              <Text style={styles.timerText}>Code expires in {formatTime(timeLeft)}</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, otp.length !== 6 && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={otp.length !== 6}
            >
              {verificationStep === "verifying" ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>

            <View style={styles.resendRow}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOtp} disabled={isResending}>
                  <Text style={styles.resendText}>
                    {isResending ? "Sending..." : "Resend OTP"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.resendHint}>
                  Didn't receive the code? You can resend in {formatTime(timeLeft)}
                </Text>
              )}
            </View>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verify OTP</Text>
        <Text style={styles.headerSubtitle}>We've sent a 6-digit code to</Text>
        <Text style={styles.emailText}>{maskedEmail}</Text>
      </View>

      <View style={styles.content}>{renderVerificationStep()}</View>

      {isLoggingIn && (
        <View style={styles.overlay}>
          <View style={styles.overlayCard}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.overlayTitle}>Logging In...</Text>
            <Text style={styles.overlaySubtitle}>Please wait while we log you in</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E6F0FF",
    padding: 20,
  },
  header: {
    marginTop: 12,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    marginTop: 6,
    color: "#475569",
  },
  emailText: {
    marginTop: 6,
    color: "#1D4ED8",
    fontWeight: "600",
  },
  content: {
    marginTop: 28,
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
    marginHorizontal: 6,
  },
  timerRow: {
    marginTop: 16,
  },
  timerText: {
    color: "#475569",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1D4ED8",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#93C5FD",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resendRow: {
    marginTop: 16,
  },
  resendText: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  resendHint: {
    color: "#64748B",
  },
  centered: {
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#0F172A",
  },
  sub: {
    color: "#64748B",
    textAlign: "center",
  },
  emoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCard: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  overlayTitle: {
    marginTop: 10,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  overlaySubtitle: {
    marginTop: 6,
    color: "#64748B",
    textAlign: "center",
  },
});