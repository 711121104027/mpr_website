//src/components/services/Workflow.tsx

"use client";

import { motion } from "framer-motion";

const workflow = [
  {
    id: "1",
    title: "Site Visit",
    description:
      "Technician visits your location for a physical inspection.",
  },
  {
    id: "2",
    title: "Assessment",
    description:
      "Detailed identification of damages and parts required.",
  },
  {
    id: "3",
    title: "Quotation",
    description:
      "Receive a transparent cost estimate for approval.",
  },
  {
    id: "4",
    title: "Approval",
    description:
      "Project starts upon formal client confirmation.",
  },
  {
    id: "5",
    title: "Completion",
    description:
      "Precision execution and quality sign-off by our team.",
  },
];

export default function Workflow() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-[1px] w-14 bg-[#c1121f]" />

            <span className="font-poppins text-[11px] md:text-xs font-semibold uppercase tracking-[3px] text-[#c1121f]">
              Our Workflow
            </span>

            <div className="h-[1px] w-14 bg-[#c1121f]" />
          </div>

          <h2 className="font-poppins text-[32px] font-semibold text-[#1a1a1a] md:text-[38px]">
            Our Service Workflow
          </h2>

          <p className="mt-3 md:mt-5 font-inter text-lg text-gray-600">
            A systematic approach to ensuring quality and transparency.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="relative hidden lg:block">
          {/* Line */}
          <div
  className="
    absolute
    top-[33px]
    left-[70px]
    right-[70px]
    md:left-[85px]
    md:right-[85px]
    lg:left-[110px]
    lg:right-[110px]
    h-[2px]
    bg-red-100
  "
/>

          <div className="grid grid-cols-5 gap-8">
            {workflow.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Number */}
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#c1121f] text-xl font-semibold text-white shadow-xl"
                >
                  {step.id}
                </motion.div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="font-poppins text-lg font-semibold text-black">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-inter text-[15px] leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Timeline */}
<div className="relative mx-auto max-w-xl lg:hidden">
  {/* Vertical Line */}
  <div
    className="absolute left-[23px] top-6 bottom-14 w-[2px] bg-red-100"
  />

  <div className="space-y-10">
    {workflow.map((step, index) => (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
        }}
        viewport={{ once: true }}
        className="relative flex gap-6"
      >
        {/* Number */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#c1121f] font-poppins text-lg font-semibold text-white shadow-lg"
        >
          {step.id}
        </motion.div>

        {/* Content */}
        <div className="flex-1 pb-2">
          <h3 className="font-poppins text-lg font-semibold text-black">
            {step.title}
          </h3>

          <p className="mt-2 font-inter leading-7 text-gray-600">
            {step.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}