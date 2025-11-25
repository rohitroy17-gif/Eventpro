"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function UpdateInformation() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(name, photoURL);
      toast.success("Profile updated successfully!");
      router.push("/myprofile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-10 space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold">Update Information</h1>

      <form onSubmit={handleUpdate} className="space-y-4 flex flex-col">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}
