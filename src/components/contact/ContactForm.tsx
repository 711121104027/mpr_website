//src/components/contact/ContactForm.tsx

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Select from "@/components/ui/Select";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const containerVariants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const inputClass =
  "h-12 w-full rounded-lg border border-[#D8D8D8] bg-white px-4 text-[14px] text-[#222222] outline-none transition-colors duration-200 placeholder:text-[13px] placeholder:text-[#9B9B9B] hover:border-[#B5B5B5] focus:border-[#D41111]";

const labelClass =
  "mb-2 block text-[13px] font-medium tracking-wide text-[#4B4B4B]";



export default function ContactForm() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  location: "",
  service: "",
  message: "",
});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.phone ||
    !formData.location ||
    !formData.service
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const message = `MPR Furniture Enquiry

Name: ${formData.name}

Email: ${formData.email}

Phone: ${formData.phone}

Location: ${formData.location}

Service: ${formData.service}

Message:
${formData.message}`;

  const whatsappUrl = `https://wa.me/919787822250?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");

  setFormData({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: "",
  });
};
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[24px] border border-[#E8E8E8] bg-white p-5 md:p-8 lg:p-10"
    >
      {/* Heading */}
      <motion.div variants={itemVariants}>
        <h2
          className={`${inter.className} text-2xl font-bold text-[#111111] lg:text-[38px]`}
        >
          Send an Enquiry
        </h2>
      </motion.div>

      {/* Form */}
      <form
  onSubmit={handleSubmit}
  className={`${inter.className} mt-8 space-y-5`}
>
        {/* Name & Email */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div>
            <label className={labelClass}>Full Name</label>

            <input
              type="text"
              name="name"
  value={formData.name}
  onChange={handleChange}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address</label>

            <input
              type="email"
              name="email"
  value={formData.email}
  onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div variants={itemVariants}>
          <label className={labelClass}>Phone Number</label>

          <input
            type="tel"
            name="phone"
  value={formData.phone}
  onChange={handleChange}
            placeholder="+91 9876543210"
            className={inputClass}
          />
        </motion.div>

        {/* Location */}
        <motion.div variants={itemVariants}>
          <label className={labelClass}>Location</label>

          <input
            type="text"
            name="location"
  value={formData.location}
  onChange={handleChange}
            placeholder="Coimbatore, Tamil Nadu"
            className={inputClass}
          />
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
  <Select
    label="Select Service"
    placeholder="Choose a Service"
    value={formData.service}
onChange={(value) =>
  setFormData((prev) => ({
    ...prev,
    service: value,
  }))
}
    options={[
      {
        label: "Office Furniture Sales",
        value: "office-furniture-sales",
      },
      {
        label: "Repair & Maintenance",
        value: "repair-maintenance",
      },
      {
        label: "Office Chairs",
        value: "office-chairs",
      },
      {
        label: "Custom Office Furniture",
        value: "custom-office-furniture",
      },
      {
        label: "Others",
        value: "others",
      },
    ]}
  />
</motion.div>

                {/* Message */}
        <motion.div variants={itemVariants}>
          <label className={labelClass}>Message</label>

          <textarea
            rows={5}
            name="message"
  value={formData.message}
  onChange={handleChange}
            placeholder="Tell us about your office furniture requirements..."
            className="min-h-[140px] w-full resize-none rounded-lg border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] text-[#222222] outline-none transition-all duration-300 placeholder:text-[13px] placeholder:text-[#9B9B9B] hover:border-[#C62828]"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            transition={{
              duration: 0.2,
            }}
            className="group relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-[#D41111] text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#BC0F0F]"
          >

            <span className="relative z-10">
              Send Message
            </span>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}