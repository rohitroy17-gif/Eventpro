"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://event-pro-server.vercel.app";

  useEffect(() => {
    fetch(`${apiUrl}/latest-services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to fetch latest services:", err));
  }, [apiUrl]);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Latest Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.image || service.img || "/default-profile.png"}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded"
                />
                {/* Type Badge */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {service.type}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 space-y-2">
                <Link href={`/allservices/${service._id}`}>
                  <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
                    {service.title}
                  </h3>
                </Link>

                <p className="text-gray-500 text-sm">
                  📅 {new Date(service.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  📍 <span className="font-medium">{service.location}</span>
                </p>

                <p className="text-gray-700 text-sm line-clamp-3">{service.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-bold text-green-600">৳ {service.price}</p>
                   <Link href={`/allservices/${service._id}`}
                                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                  View Details
                                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestServices;


