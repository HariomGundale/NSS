"use client";

import React from "react";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Mail } from "lucide-react";
import {
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export default function ContactView() {
  return (
    <div className="space-y-12">
      {/* Main 2-Column Section matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Get in Touch (Span 5) */}
        <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#0B1A2F] mb-2 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-sm inline-block" />
              Get in Touch
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Have questions regarding upcoming camps, collaboration, or volunteering? Reach out to us.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            {/* College Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">DY Patil College of Engineering, Akurdi</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sector 29, Nigdi Pradhikaran, Akurdi, Pune - 411044, Maharashtra
                </p>
              </div>
            </div>

            {/* Official Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                <a
                  href="mailto:nss@dypcoe.ac.in"
                  className="text-xs sm:text-sm text-orange-600 hover:underline block mt-0.5"
                >
                  nss@dypcoe.ac.in
                </a>
                <span className="text-[11px] text-slate-400">(Official NSS Cell Inquiry)</span>
              </div>
            </div>
          </div>

          {/* Follow Us Social Icons matching reference */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-pink-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send Us a Message (Span 7) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
