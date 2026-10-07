// src/app/services/page.tsx

import type { Metadata } from "next";

import ServiceHero from "@/components/services/ServiceHero";
import ServicesList from "@/components/services/ServicesList";
import Workflow from "@/components/services/Workflow";
import ServiceCTA from "@/components/services/ServiceCTA";
import SparePartsSection from "@/components/services/SparePartsSection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services | MPR Furniture",
  description:
    "Explore MPR Furniture's office furniture sales, repair, and maintenance services across Tamil Nadu.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  let spareParts: { id: string; name: string; imageUrl: string }[] = [];

  try {
    spareParts = await prisma.sparePart.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });
  } catch (error) {
    console.error("Failed to load spare parts in services page:", error);
  }

  return (
    <main className="overflow-hidden bg-white">
      <ServiceHero />

      <ServicesList />

      <SparePartsSection initialParts={spareParts} />

      <Workflow />

      <ServiceCTA />
    </main>
  );
}