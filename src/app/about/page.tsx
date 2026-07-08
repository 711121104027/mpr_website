//src/app/about/page.tsx

import AboutStory from "@/components/about/AboutStory";
import VisionMission from "@/components/about/VisionMission";
import WhyChoose from "@/components/about/WhyChoose";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStory />
      <VisionMission />
      <WhyChoose />
    </main>
  );
}