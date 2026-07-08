//src/components/common/FooterContact.tsx

"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function FooterContact() {
  return (
    <div>
      {/* Heading */}
      <h3
        className={`${cormorant.className} text-[28px] font-bold text-[#C41E1E]`}
      >
        Contact Us
      </h3>

      <div className={`mt-5 space-y-4 ${poppins.className}`}>
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full bg-red-50 p-2">
            <Phone
              size={18}
              className="text-[#C41E1E]"
              strokeWidth={2.3}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Phone</p>

            <a
              href="tel:+919876543210"
              className="mt-1 block text-[15px] leading-6 text-gray-600 transition hover:text-[#C41E1E]"
            >
              +91 97878 22250
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full bg-red-50 p-2">
            <Mail
              size={18}
              className="text-[#C41E1E]"
              strokeWidth={2.3}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Email</p>

            <a
              href="mailto:info@mprfurniture.com"
              className="mt-1 block break-all text-[15px] leading-6 text-gray-600 transition hover:text-[#C41E1E]"
            >
              info@mprfurniture.com
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full bg-red-50 p-2">
            <MapPin
              size={18}
              className="text-[#C41E1E]"
              strokeWidth={2.3}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Address</p>

            <p className="mt-1 text-[15px] leading-7 text-gray-600">
              69, Nadakappatti, Thogaimalai,
              <br />
              Tamil Nadu - 621313
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}