//src/app/services/page.tsx

import type { Metadata } from "next";

import ServiceHero from "@/components/services/ServiceHero";
import ServicesList from "@/components/services/ServicesList";
import Workflow from "@/components/services/Workflow";
import ServiceCTA from "@/components/services/ServiceCTA";

export const metadata: Metadata = {
  title: "Services | MPR Furniture",
  description:
    "Explore MPR Furniture's office furniture sales, repair, and maintenance services across Tamil Nadu.",
};

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-white">
      <ServiceHero />

      <ServicesList />

      <Workflow />

      <ServiceCTA />
    </main>
  );
}