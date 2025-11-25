"use client"; // Must be the first line

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://event-pro-server.vercel.app/services") // Your API URL
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">All Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={service.image || service.img || "/default-profile.png"}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{service.type}</p>
              <p className="text-gray-500 text-sm mt-1">
                Date: {new Date(service.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {service.description}
              </p>

              <Link
                href={`/allservices/${service._id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




