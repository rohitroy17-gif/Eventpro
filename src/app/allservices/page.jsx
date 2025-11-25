"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold mb-6">All Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service._id}
            className="shadow-lg rounded-xl bg-white overflow-hidden border hover:shadow-xl transition"
          >
            <img
              src={service.img || "/default-profile.png"}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-blue-600 mt-1 font-medium">{service.type}</p>
              <p className="text-gray-500 text-sm mt-1">
                Date: {new Date(service.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{service.description}</p>
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




