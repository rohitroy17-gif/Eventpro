"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config"; // your firebase config
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Store the current user
  const [loading, setLoading] = useState(true); // Loading state for auth

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null); // Clear user on logout
  };

  // Update user profile (name + photo)
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    setUser({ ...auth.currentUser }); // Update state
  };

  return (
    <AuthContext.Provider value={{ user, updateUserProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
