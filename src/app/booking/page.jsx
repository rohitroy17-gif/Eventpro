"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

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

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/bookedservices");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/bookedservices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-10 text-center text-gray-600">Loading your bookings...</p>;
  if (bookings.length === 0) return <p className="p-10 text-center text-gray-600">No bookings found.</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Booked Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div
            key={item._id}
            className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={item.image || "/default-profile.png"}
                alt={item.title}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.location}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition shadow"
                >
                  ✅ DONE
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition shadow"
                >
                  ❌ CANCEL
                </button>
              </div>
            </div>

            {/* Optional overlay effect */}
            <div className="absolute inset-0 bg-blue-50 opacity-0 hover:opacity-20 transition-opacity rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}










