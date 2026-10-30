import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { formatDateParts } from "@/lib/utils";
import { Mail, User, Clock, HeartHandshake, CheckCircle } from "lucide-react";

async function getMessages() {
  try {
    await connectToDatabase();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50).lean();
    return JSON.parse(JSON.stringify(messages));
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <AdminLayout
      title="Messages & Volunteer Leads"
      subtitle="View visitor inquiries and student volunteer registration applications"
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Inquiries Inbox</h3>
            <p className="text-xs text-slate-500">
              Showing {messages.length} recent submissions
            </p>
          </div>
        </div>

        {messages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((item: any) => {
              const dateParts = formatDateParts(item.createdAt);
              const isVolunteer = item.type === "volunteer_registration";

              return (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isVolunteer
                            ? "bg-orange-50 text-orange-600 border border-orange-200"
                            : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}
                      >
                        {isVolunteer ? (
                          <HeartHandshake className="w-5 h-5" />
                        ) : (
                          <Mail className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs text-orange-600 hover:underline block"
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isVolunteer
                          ? "bg-orange-100 text-orange-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isVolunteer ? "Volunteer Application" : "General Contact"}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono">
                    {item.message}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dateParts.full}
                    </span>
                    <a
                      href={`mailto:${item.email}?subject=RE: NSS DYPCOE Unit A-106`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Reply via Email →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
            <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-base">No messages yet</h4>
            <p className="text-xs text-slate-400 mt-1">
              Inquiries and volunteer forms submitted through the website will appear here.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
