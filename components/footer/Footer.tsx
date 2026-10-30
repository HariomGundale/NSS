"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Shield,
  Heart,
} from "lucide-react";
import {
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-[#071424] text-slate-300 border-t border-slate-800">
      {/* Top Banner Motto from Reference Image */}
      <div className="border-b border-slate-800/80 bg-[#06101c] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-orange-400 font-medium italic text-base md:text-lg tracking-wide">
            &ldquo;Service to mankind is service to God.&rdquo;{" "}
            <span className="text-slate-400 not-italic font-normal text-sm">— NSS</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-orange-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-orange-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/nss-logo.png"
                alt="NSS Emblem"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full border border-white/20"
              />
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">NSS DYPCOE</h3>
                <p className="text-orange-400 font-semibold text-xs tracking-wider">Unit A-106</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dr. D. Y. Patil College of Engineering, Akurdi. Fostering a spirit of social commitment,
              patriotism, and community upliftment under Savitribai Phule Pune University.
            </p>
            <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-md">
              <span className="text-xs font-semibold text-orange-400">Motto: &ldquo;Not Me But You&rdquo;</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About NSS & Unit A-106
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-orange-400 transition-colors">
                  Events & Activities
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-orange-400 transition-colors">
                  Our Team & Leads
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-orange-400 transition-colors">
                  Achievements & Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Focus Areas
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Community Service & Welfare
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Education & Literacy Campaigns
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Environmental Tree Plantation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Health & Voluntary Blood Donation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Disaster Management & First Aid
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Contact Campus
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  Dr. D. Y. Patil College of Engineering, Sector 29, Nigdi Pradhikaran, Akurdi, Pune - 411044
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:nss@dypcoe.ac.in" className="hover:text-orange-400">
                  nss@dypcoe.ac.in
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700/80 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-orange-400" />
                  Admin Dashboard Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} NSS DYPCOE Unit A-106. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with dedication for student service & community impact <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
