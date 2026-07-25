// src/components/services/SparePartsSection.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Poppins,
  Inter,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const spareParts = [
  {
    name: "Pin Wheel",
    image: "/services/spare-parts/pin-wheel.jpeg",
  },
  {
    name: "Hydraulic",
    image: "/services/spare-parts/hydraulic.jpeg",
  },
  {
    name: "Push Back Mechanism",
    image: "/services/spare-parts/push-back-mechanism.jpeg",
  },
  {
    name: "Metal Base",
    image: "/services/spare-parts/metal-base.jpeg",
  },
  {
    name: "802 Mesh",
    image: "/services/spare-parts/802-mesh.jpeg",
  },
  {
    name: "506 Seat Plywood",
    image: "/services/spare-parts/506-seat-plywood.jpeg",
  },
  {
    name: "XW Handle Set",
    image: "/services/spare-parts/xw-handle-set.jpeg",
  },
  {
    name: "T Sonyc Handle",
    image: "/services/spare-parts/t-sonyc-handle.jpeg",
  },
  {
    name: "S Type PU Handle",
    image: "/services/spare-parts/s-type-pu-handle.jpeg",
  },
  {
    name: "Tilting Mechanism",
    image: "/services/spare-parts/tilting-mechanism.jpeg",
  },
  {
    name: "Synchro Mechanism",
    image: "/services/spare-parts/synchro-mechanism.jpeg",
  },
  {
    name: "Peacock Handle",
    image: "/services/spare-parts/peacock-handle.jpeg",
  },
];

export default function SparePartsSection() {
  return (
    <section className="bg-[#FAFAFA] py-14 lg:py-20">

      <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >

          <div className="mb-5 flex items-center justify-center gap-4">

            <div className="h-[1px] w-14 bg-[#c1121f]" />

            <span
              className={`
                ${poppins.className}
                text-[11px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#c1121f]
                md:text-xs
              `}
            >
              Spare Parts
            </span>

            <div className="h-[1px] w-14 bg-[#c1121f]" />

          </div>

          <h2
            className={`
              ${poppins.className}
              text-[24px]
              font-semibold
              text-[#1E1E1E]
              md:text-[40px]
            `}
          >
            Premium Chair Spare Parts
          </h2>

          <p
            className={`
              ${inter.className}
              mx-auto
              mt-5
              max-w-3xl
              text-[12px]
              leading-8
              text-gray-600
              md:text-[17px]
            `}
          >
            We provide premium quality replacement spare parts
            for office chairs including wheels, hydraulic systems,
            mechanisms, handles and bases for long-lasting
            performance and smooth operation.
          </p>

        </motion.div>

        {/* Grid */}

        <div
          className="
            grid
            grid-cols-2
            gap-5
            md:grid-cols-3
            lg:grid-cols-4
            lg:gap-7
          "
        >

          {spareParts.slice(0, 6).map((part, index) => (

            <motion.div
              key={part.name}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:border-[#c1121f]/20
                hover:shadow-2xl
              "
            >

              {/* Image */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-white
                  p-5
                "
              >

                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  className="
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

              </div>

              {/* Name */}

              <div className="border-t border-gray-100 px-4 py-5">

                <h3
                  className={`
                    ${poppins.className}
                    text-center
                    text-[15px]
                    font-semibold
                    text-[#202020]
                    md:text-[17px]
                  `}
                >
                  {part.name}
                </h3>

              </div>

            </motion.div>

          ))}
                    {spareParts.slice(6).map((part, index) => (

            <motion.div
              key={part.name}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: (index + 6) * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:border-[#c1121f]/20
                hover:shadow-2xl
              "
            >

              {/* Image */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-white
                  p-5
                "
              >

                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  className="
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

              </div>

              {/* Name */}

              <div className="border-t border-gray-100 px-4 py-5">

                <h3
                  className={`
                    ${poppins.className}
                    text-center
                    text-[15px]
                    font-semibold
                    text-[#202020]
                    md:text-[17px]
                  `}
                >
                  {part.name}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}