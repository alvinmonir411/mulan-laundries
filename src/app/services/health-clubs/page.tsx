import React from "react";
import type { Metadata } from "next";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Health Clubs & Wellness Laundry Services NYC | Mulan Laundries",
  description:
    "Professional laundry solutions for health clubs and wellness centers in New York. Continuous towel replenishment, odor removal, and flexible off-peak routes.",
  alternates: {
    canonical: "/services/health-clubs",
  },
};

export default function HealthClubsPage() {
  const service = COMMERCIAL_SERVICES.find((s) => s.id === "health-clubs");
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
