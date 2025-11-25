
"use client";
import { useEffect } from "react";
import { useState } from "react";

const LatestServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latest-services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div>
  <h2 className="text-3xl font-bold mb-5">Latest Services</h2>

  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {services.map((service) => (
      <div
        key={service._id}
        className="shadow-lg rounded-xl bg-white overflow-hidden border hover:shadow-xl transition"
      >
        {/* Image */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"
        />

        {/* Info */}
        <div className="p-4">
          {/* Title + Type */}
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-sm text-blue-600 mt-1 font-medium">
            {service.type}
          </p>

          {/* Date */}
          <p className="text-gray-500 text-sm mt-1">
            Date: {new Date(service.date).toLocaleDateString()}
          </p>

          {/* Location */}
          <p className="text-gray-700 mt-2">
            📍 <span className="font-medium">{service.location}</span>
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {service.description}
          </p>

          {/* Price */}
          <p className="text-lg font-bold text-green-600 mt-3">
            ৳ {service.price}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default LatestServices;
