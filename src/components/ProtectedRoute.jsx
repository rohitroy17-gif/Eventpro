// src/components/ProtectedRoute.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect non-logged-in users
    }
  }, [user, loading, router]);

  if (loading || !user) return <p className="p-10">Checking authentication...</p>;

  return children;
}





