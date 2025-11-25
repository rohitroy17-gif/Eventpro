"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute"; // Ensure this is client component

export default function BookingPage() {
  return (
    <ProtectedRoute>
      <BookingContent />
    </ProtectedRoute>
  );
}

function BookingContent() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://event-pro-server.vercel.app/bookedservices")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://event-pro-server.vercel.app/bookedservices/${id}`, {
        method: "DELETE",
      });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Booked Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow">
            <img
              src={item.image || item.img || "/default-profile.png"}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{item.title}</h2>
            <p className="text-gray-600">{item.location}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                ✅ DONE
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                ❌ CANCEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}












