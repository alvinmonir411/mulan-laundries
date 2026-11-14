import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Reliable Laundry Services for Schools & Dorms | Mulan Laundries",
  description:
    "High-volume laundry solutions for New York colleges, boarding schools, and student residences. Hygienic washing, athletic jersey care, and reliable campus routes.",
  alternates: {
    canonical: "/services/schools-dorms",
  },
};

export default function SchoolsDormsPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "schools-dorms");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
