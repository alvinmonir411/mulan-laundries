import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Bed & Breakfast Laundry Services NYC | Mulan Laundries",
  description:
    "Boutique linen care that lets your New York B&B and inn shine. Gentle fabric care, crisp bedding, fluffy towels, and dependable scheduled pickups.",
  alternates: {
    canonical: "/services/bed-and-breakfast",
  },
};

export default function BedAndBreakfastPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "bed-and-breakfast");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
