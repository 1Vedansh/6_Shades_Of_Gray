"use client";
import Link from "next/link";
import { GraduationCap, LayoutDashboard, LogIn, BookOpen, Menu, X, User, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  let homeHref = "/";
  if (role === "student") homeHref = "/student";
  else if (role === "admin") homeHref = "/admin";
  const showBlog = role === "student" || role === "admin";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar sticky top-0 z-50 px-6 py-4">
      <div className="section flex justify-between items-center max-w-none">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="h-6 w-6 text-brand-900" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold text-brand-100">Alumni Nexus</span>
            <div className="text-xs text-brand-400 -mt-1">Connect • Share • Grow</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {showBlog && (
            <Link 
              href={`/${role}/blog`} 
              className="flex items-center gap-2 text-brand-100 hover:text-brand-400 transition-colors duration-200 group"
            >
              <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Community Blog</span>
            </Link>
          )}
          
          {role ? (
            <div className="flex items-center gap-4">
              <Link 
                href={`/${role}`} 
                className="flex items-center gap-2 text-brand-100 hover:text-brand-400 transition-colors duration-200 group"
              >
                {role === "admin" ? (
                  <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
                ) : (
                  <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-medium">
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </span>
              </Link>
              
              <div className="w-px h-6 bg-brand-700/50"></div>
              
              <button 
                onClick={logout} 
                className="text-brand-100 hover:text-brand-400 transition-colors duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary group">
              <LogIn className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden w-10 h-10 rounded-xl bg-brand-700/20 flex items-center justify-center text-brand-100 hover:bg-brand-700/40 transition-colors"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-900/95 backdrop-blur-md border-t border-brand-700/20 shadow-2xl">
          <div className="section py-6 space-y-4">
            {showBlog && (
              <Link 
                href={`/${role}/blog`} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-700/20 text-brand-100 transition-colors"
                onClick={toggleMenu}
              >
                <BookOpen className="h-5 w-5 text-brand-400" />
                <span className="font-medium">Community Blog</span>
              </Link>
            )}
            
            {role ? (
              <>
                <Link 
                  href={`/${role}`} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-700/20 text-brand-100 transition-colors"
                  onClick={toggleMenu}
                >
                  {role === "admin" ? (
                    <Shield className="h-5 w-5 text-brand-400" />
                  ) : (
                    <User className="h-5 w-5 text-brand-400" />
                  )}
                  <span className="font-medium">
                    {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                  </span>
                </Link>
                
                <div className="border-t border-brand-700/20 my-2"></div>
                
                <button 
                  onClick={() => { logout(); toggleMenu(); }} 
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 text-brand-100 hover:text-red-300 transition-colors"
                >
                  <LogIn className="h-5 w-5 rotate-180" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-brand-700 to-brand-900 text-brand-100 font-medium"
                onClick={toggleMenu}
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}