"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { User, Shield, ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (role === "student" && username === "demo" && password === "demo") {
      login("student");
      router.push("/student");
    } else if (role === "admin" && username === "admin" && password === "admin") {
      login("admin");
      router.push("/admin");
    } else {
      setError("Invalid credentials. Try demo/demo or admin/admin.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] flex items-center justify-center py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 animate-pulse-soft">
          <div className="w-32 h-32 rounded-full bg-brand-400/10 blur-2xl"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse-soft" style={{animationDelay: '2s'}}>
          <div className="w-40 h-40 rounded-full bg-brand-700/10 blur-2xl"></div>
        </div>
        
        <div className="section w-full max-w-md">
          <div className="card text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center">
                <LogIn className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
              <p className="text-brand-700">Sign in to access your alumni dashboard</p>
            </div>
            
            {!role ? (
              <div className="space-y-6">
                <p className="text-lg text-brand-700 mb-8">Choose your role to continue:</p>
                <div className="space-y-4">
                  <button 
                    className="w-full btn-primary flex items-center justify-center gap-3 py-4"
                    onClick={() => setRole("student")}
                  >
                    <User className="h-5 w-5" />
                    <span>Continue as Student</span>
                  </button>
                  <button 
                    className="w-full btn-secondary flex items-center justify-center gap-3 py-4"
                    onClick={() => setRole("admin")}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Continue as Administrator</span>
                  </button>
                </div>
                <div className="mt-8 p-4 bg-brand-100/50 rounded-xl border border-brand-400/20">
                  <p className="text-sm text-brand-700">
                    <strong>Demo Credentials:</strong><br />
                    Student: demo/demo<br />
                    Admin: admin/admin
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {role === "student" ? <User className="h-6 w-6 text-brand-700" /> : <Shield className="h-6 w-6 text-brand-700" />}
                    <span className="text-xl font-semibold">
                      {role.charAt(0).toUpperCase() + role.slice(1)} Login
                    </span>
                  </div>
                  <button 
                    onClick={() => setRole(null)}
                    className="text-brand-700 hover:text-brand-900 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">Username</label>
                      <input 
                        className="input input-focus" 
                        placeholder="Enter your username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">Password</label>
                      <input 
                        className="input input-focus" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="text-red-600 text-sm font-medium">{error}</div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <button className="btn-primary w-full py-4 text-lg" type="submit">
                      Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                    <button 
                      className="btn-ghost w-full py-3" 
                      type="button" 
                      onClick={() => setRole(null)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Role Selection
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}