//src/components/contact/ContactInfo.tsx

import { Cormorant_Garamond, Poppins } from "next/font/google";
import { Mail, MapPin, PhoneCall } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const contactDetails = [
  {
    icon: PhoneCall,
    title: "Call Us",
    content: "+91 97878 22250",
  },
  {
    icon: Mail,
    title: "Email Inquiries",
    content: "mprfurniture@gmail.com",
  },
  {
    icon: MapPin,
    title: "Our Location",
    content: "69, Nadakappatti, Thogaimalai, Tamil Nadu-621313",
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col">
      {/* Contact Details */}
      <div className="space-y-8">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-start gap-5">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#FFE5E1]">
                <Icon
                  size={22}
                  strokeWidth={2}
                  className="text-[#D41111]"
                />
              </div>

              {/* Text */}
              <div>
                <p
                  className={`${poppins.className} text-[14px] font-medium uppercase tracking-wide text-[#888888]`}
                >
                  {item.title}
                </p>

                <p
                  className={`${poppins.className} mt-2 whitespace-pre-line text-lg font-medium leading-relaxed text-[#111111] lg:text-[18px]`}
                >
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Find Us */}
      <div className="mt-14">
        <h2
          className={`${cormorant.className} text-[28px] font-medium leading-none text-[#D41111] lg:text-[38px]`}
        >
          Find Us
        </h2>

        <p
          className={`${poppins.className} mt-4 max-w-lg text-[15px] leading-8 text-[#666666]`}
        >
          Visit our showroom and explore premium furniture collections crafted
          with quality, comfort, and timeless elegance.
        </p>
      </div>
    </div>
  );
}