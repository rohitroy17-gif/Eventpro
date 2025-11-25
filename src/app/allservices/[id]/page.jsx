"use client"; // Must be the first line

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ServiceDetailsPage() {
  const { id } = useParams(); // dynamic route param
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const res = await fetch(`https://event-pro-server.vercel.app/services/${id}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading service...</p>;
  if (!service) return <p className="p-10 text-center text-red-500">Service not found!</p>;

  const handleBooking = async () => {
    try {
      const res = await fetch(
        `https://event-pro-server.vercel.app/services/${id}/book`,
        { method: "PATCH", headers: { "Content-Type": "application/json" } }
      );

      if (res.ok) {
        // toast.success("Service booked successfully!");
        setTimeout(() => router.push("/booking"), 1500); // redirect after booking
      } else {
        toast.error("Booking failed. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <Toaster position="top-right" />
      <div className="md:col-span-2 space-y-6">
        <img
          src={service.image || service.img || "/default-profile.png"}
          alt={service.title}
          className="w-full h-72 object-cover rounded-xl shadow-lg"
        />
        <h1 className="text-3xl font-bold">{service.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {service.type}
          </span>
          <span className="text-sm">
            📅 {new Date(service.date).toLocaleDateString()}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <p className="text-gray-700">{service.location}</p>
        </div>
      </div>

      <div>
        <div className="shadow-lg border rounded-xl p-6 sticky top-10 bg-white">
          <h2 className="text-xl font-bold mb-4">Service Info</h2>
          <p className="text-3xl font-bold text-green-600 mb-4">৳ {service.price}</p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Type:</strong> {service.type}</p>
            <p><strong>Date:</strong> {new Date(service.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {service.location}</p>
          </div>
          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Book This Service
          </button>
        </div>
      </div>
    </div>
  );
}














