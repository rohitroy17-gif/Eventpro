"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/AuthProvider"; // Make sure your AuthContext exists
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu toggle
  const [dropdown, setDropdown] = useState(false); // Profile dropdown toggle
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Firebase logout
      toast.success("Logged out successfully!");
      router.push("/login"); // redirect after logout
      setDropdown(false);
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          EventPro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-pink-600 text-blue-800">Home</Link>
          <Link href="/allservices" className="hover:text-pink-600 text-blue-800">Services</Link>
          <Link href="/booking" className="hover:text-pink-600 text-blue-800">Booking</Link>
          <Link href="/addproduct" className="hover:text-pink-600 text-blue-800">Add Event</Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 hover:text-pink-600"
              >
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-blue-800">{user.displayName || "User"}</span>
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link
                    href="/myprofile"
                    className="block px-4 py-2 hover:bg-pink-50 text-blue-800"
                  >
                    My Profile
                  </Link>
                  <Link href="/ordered" className="block px-4 py-2 hover:bg-pink-50 text-blue-800">Ordered Items</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-blue-800"
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
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-pink-600 text-blue-800">Home</Link>
          <Link href="/allservices" onClick={() => setOpen(false)} className="hover:text-pink-600 text-blue-800">Services</Link>
          <Link href="/booking" onClick={() => setOpen(false)} className="hover:text-pink-600 text-blue-800">Booking</Link>
          <Link href="/addproduct" className="hover:text-pink-600 text-blue-800">Add Event</Link>

          {!user ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/myprofile" onClick={() => setOpen(false)} className="hover:text-pink-600 text-blue-800">My Profile</Link>
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="text-left px-4 py-2 hover:bg-pink-50 w-full text-blue-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

