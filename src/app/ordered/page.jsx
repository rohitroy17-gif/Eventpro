"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

export default function OrderedPage() {
  return (
    <ProtectedRoute>
      <OrderedContent />
    </ProtectedRoute>
  );
}

function OrderedContent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const cancelOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order cancelled successfully");
  };

  if (orders.length === 0)
    return <p className="p-10 text-center text-gray-600 text-lg">No orders yet.</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
          >
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Order ID: <span className="text-blue-600">{order.id}</span>
                </h2>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
                  Total: ${order.total}
                </span>
              </div>

              <ul className="space-y-1 border-t border-b py-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between py-1 text-gray-700">
                    <span>{item.title}</span>
                    <span className="font-semibold">${item.price}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => cancelOrder(order.id)}
                className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 shadow transition"
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

