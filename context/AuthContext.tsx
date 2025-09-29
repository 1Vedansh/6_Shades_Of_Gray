"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, setRole as setStoredRole } from "@/lib/auth";

type Role = "student" | "admin" | null;
type Ctx = { role: Role; login: (r: Role) => void; logout: () => void; };
const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();
  
  useEffect(() => setRole(getRole()), []);
  
  const login = (r: Role) => { 
    setStoredRole(r); 
    setRole(r); 
  };
  
  const logout = () => { 
    setStoredRole(null); 
    setRole(null);
    // Redirect to home page after logout
    router.push('/');
  };
  
  return <AuthCtx.Provider value={{ role, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}