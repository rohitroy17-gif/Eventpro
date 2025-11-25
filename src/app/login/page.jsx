"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "@/firebase.config";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/"); // navigate to home
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful!");
      router.push("/"); // navigate to home
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Forgot Password
  // const handleResetPassword = async () => {
  //   if (!email) {
  //     toast.error("Please enter your email");
  //     return;
  //   }
  //   setResetLoading(true);
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     toast.success("Password reset email sent!");
  //   } catch (error) {
  //     console.error("Reset failed:", error);
  //     if (error.code === "auth/user-not-found") {
  //       toast.error("No user found with this email");
  //     } else if (error.code === "auth/invalid-email") {
  //       toast.error("Invalid email address");
  //     } else {
  //       toast.error("Failed to send reset email");
  //     }
  //   } finally {
  //     setResetLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg focus:outline-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <p
            onClick={handleResetPassword}
            className={`text-sm text-blue-600 cursor-pointer text-right hover:underline ${resetLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {resetLoading ? "Sending..." : "Forgot Password?"}
          </p> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

