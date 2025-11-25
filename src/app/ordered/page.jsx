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
    return <p className="p-10 text-center">No orders yet.</p>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
            <ul className="mb-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold mb-2">Total: ${order.total}</p>
            <button
              onClick={() => cancelOrder(order.id)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Cancel Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
