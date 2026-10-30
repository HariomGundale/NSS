import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <AdminLayout
      title="Add New Event"
      subtitle="Publish a new NSS social, educational, or environmental drive"
    >
      <EventForm isEditing={false} />
    </AdminLayout>
  );
}
