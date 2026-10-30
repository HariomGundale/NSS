import React from "react";
import PageHeader from "@/components/hero/PageHeader";
import ContactView from "@/components/contact/ContactView";

export const metadata = {
  title: "Contact Us | NSS DYPCOE Akurdi",
  description:
    "Get in touch with NSS DYPCOE Akurdi Unit A-106. Campus address, official email, and online message inquiry.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Header with Breadcrumb: Home > Contact Us */}
      <PageHeader
        title="Contact Us"
        breadcrumb={[{ label: "Contact Us" }]}
        backgroundImage="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ContactView />
      </div>
    </main>
  );
}
