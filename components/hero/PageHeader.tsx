import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; href?: string }[];
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  backgroundImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
}: PageHeaderProps) {
  return (
    <section className="relative bg-[#09172B] text-white overflow-hidden py-14 sm:py-20 border-b border-slate-800">
      {/* Background Image with Dark Blue Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transform scale-105 transition-transform duration-700"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#0B1A30]/90 to-[#071324]/85" />

      {/* Decorative subtle ambient lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-2">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-1">
            <ol className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-orange-400 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb, idx) => (
                <li key={idx} className="flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-slate-300 hover:text-orange-400 transition-colors font-medium"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-orange-400 font-semibold">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.02em] text-white leading-tight">
            {title}
          </h1>

          {/* Optional Subtitle */}
          {subtitle && (
            <p className="mt-1 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
