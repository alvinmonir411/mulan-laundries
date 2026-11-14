import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Hospital Laundry Services NYC | Mulan Laundries",
  description:
    "Precision healthcare laundry services in New York. Soil-level sorting, universal precautions, OSHA and Joint Commission adherence, and 24/7 emergency support.",
  alternates: {
    canonical: "/services/hospital-laundry",
  },
};

export default function HospitalLaundryPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "hospital-laundry");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
