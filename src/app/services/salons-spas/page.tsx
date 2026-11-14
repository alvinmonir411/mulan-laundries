import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Specialized Laundry Services for Salons & Spas | Mulan Laundries",
  description:
    "Expert salon and day spa laundry services in NYC. Specialized massage oil removal, cosmetic dye treatment, and ultra-soft towel conditioning.",
  alternates: {
    canonical: "/services/salons-spas",
  },
};

export default function SalonsSpasPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "salons-spas");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
