//src/components/services/ServiceHero.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServiceHero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/services/hero-bg.png"
                    alt="Office Background"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative mx-auto w-full max-w-[1450px] px-5 lg:px-8">
                <div className="grid min-h-[760px] items-center gap-14 py-12 lg:grid-cols-2 lg:py-10">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.15,
                                duration: 0.6,
                            }}
                            viewport={{ once: true }}
                            className="mb-4 font-poppins text-[12px] md:text-xs font-semibold uppercase tracking-[4px] text-[#c1121f]"
                        >
                            Tamil Nadu&apos;s Trusted Partner
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.25,
                                duration: 0.7,
                            }}
                            viewport={{ once: true }}
                            className="max-w-xl font-poppins text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-[46px]"
                        >
                            Premium Furniture{" "}
                            <span className="text-[#c1121f]">
                                Sales & Expert Services
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.35,
                                duration: 0.7,
                            }}
                            viewport={{ once: true }}
                            className="mt-8 max-w-xl font-inter text-[16px]md:text-[17px] leading-8 text-gray-700"
                        >
                            Transforming workspaces across Tamil Nadu with quality
                            furniture and professional maintenance. From procurement
                            to precision repairs, we manage your office
                            infrastructure.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.45,
                                duration: 0.7,
                            }}
                            viewport={{ once: true }}
                            className="mt-10 grid grid-cols-2 gap-4 lg:flex lg:flex-row"
                        >
                            <Link
                                href="/products"
                                className="flex items-center justify-center rounded-md bg-[#c1121f] px-4 py-4 text-center font-poppins text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a20f1b] hover:shadow-xl md:px-8 md:text-base"
                            >
                                Explore Product
                            </Link>

                            <Link
                                href="/contact"
                                className="flex items-center justify-center rounded-md border border-gray-400 bg-white/30 px-4 py-4 text-center font-poppins text-sm font-medium text-gray-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c1121f] hover:bg-white md:px-8 md:text-base"
                            >
                                Book Service
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="order-1 flex justify-center lg:order-2 lg:justify-end"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 5,
                                ease: "easeInOut",
                            }}
                            className="relative w-full max-w-[620px]"
                        >
                            <div className="rounded-xl border-[10px] border-white bg-white p-2 shadow-[0_30px_80px_rgba(0,0,0,0.20)]">
                                <Image
                                    src="/services/hero-chair.png"
                                    alt="Office Chair"
                                    width={650}
                                    height={520}
                                    priority
                                    className="h-auto w-full rounded-md object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}