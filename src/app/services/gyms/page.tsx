import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Reliable Laundry Services for Gyms & Fitness Centers | Mulan Laundries",
  description:
    "Industrial laundry solutions that power New York gyms and fitness studios. Odor-eliminating wash cycles, sweat towel swaps, and fast turnaround.",
  alternates: {
    canonical: "/services/gyms",
  },
};

export default function GymsPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "gyms");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
