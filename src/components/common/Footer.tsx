//src/components/common/Footer.tsx

"use client";

import FooterAbout from "./FooterAbout";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterWhatsapp from "./FooterWhatsapp";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
  <div className="mx-auto w-full max-w-[1450px] px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
    <FooterAbout />
</div>

<div className="lg:col-span-2">
    <FooterLinks />
</div>

<div className="lg:col-span-3">
    <FooterContact />
</div>

<div className="lg:col-span-4">
    <FooterWhatsapp />
</div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}