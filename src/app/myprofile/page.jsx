"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/AuthProvider";

export default function MyProfile() {
  const { user } = useAuth();

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-10 space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="flex items-center gap-4">
        <img
          src={user.photoURL || "/default-user.png"}
          alt={user.displayName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.displayName || "No Name"}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <Link
        href="/updateinformation"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Update Information
      </Link>
    </div>
  );
}
