"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Shield } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide on admin routes except login
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminPage) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events & Activities", href: "/events" },
    { name: "Our Team", href: "/team" },
    { name: "Achievements & Impact", href: "/achievements" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-[#0B1A2F] text-white ${
        scrolled ? "shadow-md bg-[#081526]/95 backdrop-blur-sm" : "border-b border-slate-800/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & College Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo/nss-logo.png"
                alt="NSS Logo Emblem"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-white/20 shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                NSS DYPCOE Akurdi
              </span>
              <span className="text-xs font-semibold text-slate-300 tracking-wider">
                Unit A-106
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-md ${
                    active
                      ? "text-orange-400 font-semibold"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Admin link pill & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-full transition-all"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081526] border-t border-slate-800 px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  active
                    ? "bg-orange-500/15 text-orange-400 font-semibold border-l-4 border-orange-500"
                    : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80 mt-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Shield className="w-4 h-4 text-orange-400" />
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
