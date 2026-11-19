"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-start items-start overflow-hidden bg-[#071220] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 border-b border-slate-800">
      {/* 
        ============================================================
        1. REAL NSS TEAM PHOTO AS FULL HERO BACKGROUND
        ============================================================
      */}
      {/* Mobile Ambient Fill: ensures seamless natural photographic background on narrow mobile viewports */}
      <div className="absolute inset-0 sm:hidden overflow-hidden pointer-events-none">
        <Image
          src="/images/nss-team-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-35 blur-sm"
        />
      </div>

      {/* Main Sharp Real NSS Team Photograph (Full Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mobile: object-contain at bottom preserves 100% of the team members on left & right without cropping */}
        <div className="block sm:hidden w-full h-full relative">
          <Image
            src="/images/nss-team-hero.jpg"
            alt="NSS DYPCOE Akurdi Unit A-106 Team Photograph"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Desktop / Tablet: object-cover anchored at top (50% 0%) so trees/roof fill the upper area behind text and 100% of team members sit clearly in the lower open area */}
        <div className="hidden sm:block w-full h-full relative">
          <Image
            src="/images/nss-team-hero.jpg"
            alt="NSS DYPCOE Akurdi Unit A-106 Team Photograph"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 0%" }}
          />
        </div>
      </div>

      {/* 
        ============================================================
        2. DARK NAVY TRANSPARENT OVERLAY (35–50% opacity)
        - Upper area: subtle gradient overlay (~60-70%) for crisp text legibility
        - Left area: gradient overlay to give left-aligned content maximum contrast and sharpness
        - Lower team area: light overlay (~25-35%) so faces, black shirts & members are bright & recognizable
        ============================================================
      */}
      <div className="absolute inset-0 bg-[#071220]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071220]/80 via-[#071220]/45 to-[#071220]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071220]/95 via-[#071220]/75 to-transparent sm:via-[#071220]/60 md:to-transparent/40 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#071220] to-transparent pointer-events-none" />

      {/* 
        ============================================================
        3. HERO CONTENT STACK — LEFT ALIGNED WITH ANIMATION
        Exact order:
        - National Service Scheme DYPCOE Akurdi (H1, 700)
        - Unit A-106
        - "We work together..."
        - NOT ME BUT YOU
        - [ Explore Our Activities → ]
        ============================================================
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start text-left">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          {/* Main Title (Part 9) */}
          <h1 className="animate-hero-1 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-[-0.025em] leading-[1.14] drop-shadow-md text-left">
            National Service Scheme <br className="hidden sm:inline" />
            <span className="text-white">DYPCOE Akurdi</span>
          </h1>

          {/* Unit A-106 Badge directly below heading (Part 10) */}
          <div className="animate-hero-2 mt-3 sm:mt-3.5">
            <span className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md tracking-wide transition-all duration-200 hover:scale-105">
              Unit A-106
            </span>
          </div>

          {/* Description Sentence below Unit A-106 (Part 11) */}
          <p className="animate-hero-3 mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow-xs text-left">
            We work together for a better tomorrow, through service, solidarity and social
            responsibility.
          </p>

          {/* NOT ME BUT YOU Motto Badge below description (Part 12) */}
          <div className="animate-hero-4 mt-3 sm:mt-3.5">
            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-xs transition-colors duration-200 hover:bg-orange-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
              </span>
              Not Me But You
            </span>
          </div>

          {/* Explore Our Activities CTA Button below motto (Part 13) */}
          <div className="animate-hero-5 mt-5 sm:mt-6">
            <Link
              href="/events"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-orange-600/35 hover:shadow-orange-600/55 transform hover:-translate-y-0.5 overflow-hidden animate-hero-glow"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span>Explore Our Activities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
