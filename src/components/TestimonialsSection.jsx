"use client";

const testimonials = [
  { name: "Alice", review: "Amazing service! Booking was so easy.", role: "Event Planner" },
  { name: "Bob", review: "Highly recommend for event management.", role: "Organizer" },
  { name: "Carol", review: "Top-notch services with great support.", role: "Customer" },
];

export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">What People Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((test, idx) => (
          <div key={idx} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">"{test.review}"</p>
            <h4 className="font-bold">{test.name}</h4>
            <p className="text-sm text-gray-500">{test.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
