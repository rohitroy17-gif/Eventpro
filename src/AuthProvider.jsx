"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    setUser({ ...auth.currentUser });
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// OLD hook — used in Navbar (KEEP IT)
export const useAuth = () => useContext(AuthContext);

// NEW hook — used in PrivateRoute
export const useAuthContext = () => useContext(AuthContext);
