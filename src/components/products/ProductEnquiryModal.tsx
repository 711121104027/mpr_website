//src/components/products/ProductEnquiryModal.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ProductEnquirySchema,
  ProductEnquiryInput,
} from "@/lib/validators";

interface ProductEnquiryModalProps {
  open: boolean;
  onClose: () => void;

  product: {
  name: string;
  code: string;
  slug: string;
} | null;
}


export default function ProductEnquiryModal({
  open,
  onClose,
  product,
}: ProductEnquiryModalProps) {
    const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ProductEnquiryInput>({
  resolver: zodResolver(ProductEnquirySchema),

  defaultValues: {
    fullName: "",
    phone: "",
    location: "",
    additionalDetails: "",
  },
});

const router = useRouter();

const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!open) {
    reset();
  }
}, [open, reset]);

async function onSubmit(
  data: ProductEnquiryInput
) {
  if (!product) return;

  setLoading(true);

  const message = `Hello MPR Furniture,

I would like to enquire about the following product.

━━━━━━━━━━━━━━━━━━

Furniture Type:
${product.name}

Furniture Code:
${product.code}

━━━━━━━━━━━━━━━━━━

Customer Name:
${data.fullName}

Phone Number:
${data.phone}

Location:
${data.location}

Additional Details:
${data.additionalDetails || "N/A"}

━━━━━━━━━━━━━━━━━━

Thank You`;

  const whatsappUrl = `https://wa.me/919787822250?text=${encodeURIComponent(
    message
  )}`;

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

  reset();

  setLoading(false);

  onClose();

  router.push(`/products/${product.slug}`);
}

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
fixed
inset-0
z-[100]
bg-black/50
backdrop-blur-md
"
          />

          {/* Modal */}

          <motion.div
  initial={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  transition={{
    duration: 0.25,
  }}
  className="
    fixed
    inset-0
    z-[110]
    flex
    items-center
    justify-center
    overflow-y-auto
    p-4
    md:p-8
  "
>
            <div
  className="
    relative
    w-full
    max-w-[720px]
    max-h-[90vh]
    overflow-hidden
    rounded-2xl
    bg-white
    shadow-2xl
  "
>
              {/* Close */}

              <button
                onClick={() => {
  onClose();

  if (product) {
    router.push(`/products/${product.slug}`);
  }
}}
                className="
absolute
right-5
top-5
z-20
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-gray-300
bg-white
shadow-sm
transition
hover:bg-gray-100
"
              >
                <X size={20} />
              </button>

              {/* Content */}

              <div
  className="
    max-h-[90vh]
    overflow-y-auto
    p-6
    md:p-8
    lg:p-10
  "
>

                <h2
                  className="
                    font-[Poppins]
                    text-[34px]
                    font-semibold
                    text-[#202020]
                  "
                >
                  Product Enquiry
                </h2>

                <form
  onSubmit={handleSubmit(onSubmit)}
  className="mt-8 space-y-5"
>

                  {/* Name */}

                  <div>
                    <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                    {...register("fullName")}
                      placeholder="eg: Barry Allen"
                      className="
                        h-12
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        font-[Inter]
                        outline-none
                        transition
                        focus:border-[#B5161B]
                      "
                    />
                    {errors.fullName && (
  <p className="mt-1 text-xs text-red-600">
    {errors.fullName.message}
  </p>
)}
                  </div>

                  {/* Row */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                        Phone Number
                      </label>

                      <input
                      {...register("phone")}
                        placeholder="eg: 9876543210"
                        className="
                          h-12
                          w-full
                          rounded-lg
                          border
                          border-gray-300
                          px-4
                          font-[Inter]
                          outline-none
                          focus:border-[#B5161B]
                        "
                      />
                      {errors.phone && (
  <p className="mt-1 text-xs text-red-600">
    {errors.phone.message}
  </p>
)}
                    </div>

                    <div>
                      <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                        Location
                      </label>

                      <input
                      {...register("location")}
                        placeholder="eg: Coimbatore"
                        className="
                          h-12
                          w-full
                          rounded-lg
                          border
                          border-gray-300
                          px-4
                          font-[Inter]
                          outline-none
                          focus:border-[#B5161B]
                        "
                      />
                      {errors.location && (
  <p className="mt-1 text-xs text-red-600">
    {errors.location.message}
  </p>
)}
                    </div>

                  </div>

                  {/* Furniture */}

                  <div>
                    <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                      Type of Furniture
                    </label>

                    <input
  value={product?.name ?? ""}
  readOnly
  className="
    h-12
    w-full
    rounded-lg
    border
    border-gray-300
    bg-gray-50
    px-4
    font-[Inter]
    outline-none
  "
/>
                  </div>

                  {/* Code */}

                  <div>
                    <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                      Furniture Code
                    </label>

                    <input
  value={product?.code ?? ""}
  readOnly
  className="
    h-12
    w-full
    rounded-lg
    border
    border-gray-300
    bg-gray-50
    px-4
    font-[Inter]
    outline-none
  "
/>
                  </div>

                  {/* Details */}

                  <div>
                    <label className="mb-2 block font-[Inter] text-sm font-medium text-gray-700">
                      Additional Details
                    </label>

                    <textarea
                     {...register("additionalDetails")}
                      rows={5}
                      placeholder="Tell us more about Frame details and special requirements"
                      className="
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-gray-300
                        p-4
                        font-[Inter]
                        outline-none
                        focus:border-[#B5161B]
                      "
                    />
                  </div>

                  {/* Button */}

                  <button
  type="submit"
  disabled={loading}
  className="
mt-2
h-12
w-full
rounded-lg
bg-[#D60B0B]
font-[Inter]
font-semibold
text-white
transition
hover:bg-[#B5161B]
disabled:cursor-not-allowed
disabled:opacity-60
"
>
  {loading
  ? "Redirecting..."
  : "Send Via WhatsApp"}
</button>

                </form>

              </div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}