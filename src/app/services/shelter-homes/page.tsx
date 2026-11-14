import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Professional Laundry Services for Shelter Homes | Mulan Laundries",
  description:
    "Compassionate and reliable bulk laundry services for shelter homes and transitional housing non-profits in New York. Universal precautions and non-profit pricing.",
  alternates: {
    canonical: "/services/shelter-homes",
  },
};

export default function ShelterHomesPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "shelter-homes");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
