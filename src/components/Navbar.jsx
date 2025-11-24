"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);         // Mobile menu toggle
  const [loggedIn, setLoggedIn] = useState(false); // Simulate login state
  const [dropdown, setDropdown] = useState(false); // Dropdown toggle

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">EventPro</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <Link href="/services" className="hover:text-pink-600">Services</Link>
          <Link href="/events" className="hover:text-pink-600">Events</Link>
          <Link href="/booking" onClick={() => setOpen(false)}>Booking</Link>
        

          {!loggedIn ? (
            <>
              <Link href="/login" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-1 hover:text-pink-600"
              >
                <User size={18} /> John Doe
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link href="/add-product" className="block px-4 py-2 hover:bg-pink-50">Add Product</Link>
                  <Link href="/manage-products" className="block px-4 py-2 hover:bg-pink-50">Manage Products</Link>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-pink-50">Profile Settings</Link>
                  <button
                    onClick={() => setLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-pink-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col py-4 px-4 gap-4 text-lg font-medium">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/events" onClick={() => setOpen(false)}>Events</Link>
          <Link href="/booking" onClick={() => setOpen(false)}>Booking</Link>

          {!loggedIn ? (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-center">
                Login
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg text-center">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/add-product" onClick={() => setOpen(false)}>Add Product</Link>
              <Link href="/manage-products" onClick={() => setOpen(false)}>Manage Products</Link>
              <Link href="/profile" onClick={() => setOpen(false)}>Profile Settings</Link>
              <button onClick={() => setLoggedIn(false)} className="text-left px-4 py-2 hover:bg-pink-50 w-full">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
