"use client";

const featuresData = [
  { title: "Expert Vendors", desc: "Only verified and trusted service providers." },
  { title: "Seamless Booking", desc: "Book services with just a few clicks." },
  { title: "Secure Payments", desc: "Pay safely with multiple options." },
  { title: "24/7 Support", desc: "Our team is always here to assist you." },
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {featuresData.map((feature, idx) => (
          <div key={idx} className="p-6 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

