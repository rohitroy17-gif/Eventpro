"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react"; // Using lucide-react icon

export default function AddProductPage() {
  return (
    <ProtectedRoute>
      <AddProductContent />
    </ProtectedRoute>
  );
}

function AddProductContent() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const router = useRouter();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("https://event-pro-server.vercel.app/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const addToCart = (service) => {
    setCart((prev) => [...prev, service]);
    setTotalPrice((prev) => prev + service.price);
    toast.success(`${service.title} added to cart`);
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (method) => {
    toast.success(
      `Services ordered successfully via ${method}!\n` +
        cart.map((item) => item.title).join(", ")
    );

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { id: Date.now(), items: cart, total: totalPrice };
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    setCart([]);
    setTotalPrice(0);
    setShowPayment(false);
    setShowCartOverlay(false);

    router.push("/ordered");
  };

  if (loading) return <p className="p-10 text-center">Loading services...</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto relative">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Add Product</h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer relative"
          >
            <div className="relative">
              <img
  src={service.image || service.img || "/default-profile.png"}
  alt={service.title}
  className="w-full h-48 object-cover rounded"
/>

              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                ${service.price}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
                {service.title}
              </h2>
              <p className="text-gray-500 text-sm">{service.type}</p>
              <p className="text-gray-700 text-sm line-clamp-3">{service.description}</p>

              <button
                onClick={() => addToCart(service)}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Icon */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCartOverlay(!showCartOverlay)}
          className="fixed bottom-8 right-8 bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 transition flex items-center justify-center z-50"
        >
          <ShoppingCart size={24} />
          <span className="ml-2 text-white font-semibold">{cart.length}</span>
        </button>
      )}

      {/* Cart Overlay */}
      {showCartOverlay && (
        <div className="fixed bottom-24 right-8 w-80 max-h-[70vh] bg-white border shadow-lg rounded-xl p-4 overflow-y-auto z-50">
          <h2 className="text-xl font-bold mb-3">Your Cart</h2>
          <ul className="mb-4 space-y-2">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded shadow-sm border"
              >
                <span>{item.title}</span>
                <span className="font-semibold">${item.price}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold mb-3">Total: ${totalPrice}</p>
          {!showPayment ? (
            <button
              onClick={handleOrderNow}
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Order Now
            </button>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Payment Method:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Bkash", "Nagad", "Rocket", "Bank A", "Bank B", "Bank C"].map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() => handlePayment(method)}
                      className="py-2 px-3 border rounded-lg hover:bg-blue-100 transition text-gray-700 font-medium"
                    >
                      {method}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}




