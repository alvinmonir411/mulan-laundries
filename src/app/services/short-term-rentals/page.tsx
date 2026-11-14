import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Short-Term Residential & Airbnb Laundry NYC | Mulan Laundries",
  description:
    "Maintain high standards for Airbnb, serviced apartments, and residential buildings in New York with fast, hygienic turnover laundry. Contact Mulan Laundries today.",
  alternates: {
    canonical: "/services/short-term-rentals",
  },
};

export default function ShortTermRentalsPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "short-term-rentals");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
