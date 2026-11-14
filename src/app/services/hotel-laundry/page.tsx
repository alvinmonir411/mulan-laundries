import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Hotel Laundry Services NYC | Linen Management | Mulan Laundries",
  description:
    "New York hotels trust Mulan Laundries for timely, professional laundry and linen management. Rotary pressing, emergency rush service, and five-star quality.",
  alternates: {
    canonical: "/services/hotel-laundry",
  },
};

export default function HotelLaundryPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "hotel-laundry");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
