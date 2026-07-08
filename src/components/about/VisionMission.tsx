//src/components/about/VisionMission.tsx

"use client";

import { motion } from "framer-motion";
import { Eye, Compass } from "lucide-react";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function VisionMission() {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#FCF8F8] px-10 py-9"
          >
            <Eye
              size={30}
              strokeWidth={2.2}
              className="mb-4 text-[#B20A0A]"
            />

            <h3
              className={`${poppins.className} text-[26px] font-semibold text-[#3E3E3E]`}
            >
              Our Vision
            </h3>

            <p
              className={`${inter.className} mt-2 md:mt-5 max-w-xl text-[15px] font-regular leading-8 md:leading-10 tracking-[2px] text-[#555555]`}
            >
              To make premium furniture accessible for every modern
              lifestyle and designing spaces where comfort meets
              elegance.
            </p>
          </motion.div>

          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="bg-[#474747] px-10 py-9"
          >
            <Compass
              size={30}
              strokeWidth={2.2}
              className="mb-4 text-[#FF3838]"
            />

            <h3
              className={`${poppins.className} text-[26px] font-semibold text-white`}
            >
              Our Mission
            </h3>

            <p
              className={`${inter.className} mt-2 md:mt-5 max-w-xl text-[15px] font-regular leading-8 md:leading-10 tracking-[2px] text-[#ECECEC]`}
            >
              To provide premium office furniture solutions that
              enhance productivity and comfort in workspaces across
              Tamil Nadu.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}