"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        All Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={service.img || "/default-profile.png"}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              {/* Type Badge */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {service.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm">
                📅 {new Date(service.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {service.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <Link
                  href={`/allservices/${service._id}`}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                <p className="text-lg font-bold text-green-600">৳ {service.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



