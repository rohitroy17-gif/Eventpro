"use client";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
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

  // Delete booking
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

  if (loading) {
    return <p className="p-10 text-center">Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className="p-10 text-center">No bookings found.</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Booked Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
              src={item.image || "/default-profile.png"}
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









