"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

export default function BookingPage() {
  return (
    <ProtectedRoute>
      <BookingContent />
    </ProtectedRoute>
  );
}

function BookingContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/bookedservices");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        // Add status field for frontend state
        const dataWithStatus = data.map((b) => ({ ...b, status: "pending" }));
        setBookings(dataWithStatus);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDone = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id || b.id === id ? { ...b, status: "done" } : b
      )
    );
    toast.success("Booking marked as done");
  };

  const handleCancel = (id) => {
    // Remove booking from frontend state
    setBookings((prev) => prev.filter((b) => b._id !== id && b.id !== id));
    toast.success("Booking cancelled successfully");

    // Optional: DELETE request to backend
    fetch(`http://localhost:5000/bookedservices/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete booking", err));
  };

  if (loading)
    return <p className="p-10 text-center text-gray-600">Loading your bookings...</p>;
  if (bookings.length === 0)
    return <p className="p-10 text-center text-gray-600">No bookings found.</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Booked Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div
            key={item._id || item.id}
            className={`relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer ${
              item.status === "done" ? "opacity-70" : ""
            }`}
          >
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={item.image || item.img || "/default-profile.png"}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
                />

            </div>

            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.location}</p>
              <p
                className={`font-medium mt-1 ${
                  item.status === "done" ? "text-green-600" : "text-gray-500"
                }`}
              >
                Status: {item.status}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDone(item._id || item.id)}
                  disabled={item.status === "done"}
                  className={`flex-1 bg-green-500 text-white py-2 rounded-lg transition shadow ${
                    item.status === "done" ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                  }`}
                >
                  ✅ DONE
                </button>
                <button
                  onClick={() => handleCancel(item._id || item.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition shadow"
                >
                  ❌ CANCEL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}














