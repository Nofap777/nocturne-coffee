"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { useInView, motion } from "framer-motion";

const stats = [
    { value: 24, label: "Hours Steep Time", suffix: "" },
    { value: 100, label: "Percent Organic", suffix: "%" },
    { value: 0, label: "Bitterness Profile", suffix: "" },
    { value: 5, label: "Star Ratings", suffix: ".0" },
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section ref={ref} className="bg-dark-card py-32 px-[5%] border-y border-white/5 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                <div className="md:w-1/3">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        By the Numbers.
                    </h2>
                    <p className="text-white/60 text-lg">
                        We don't comprise on quality, and the proof is in every batch.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-16 flex-1 w-full text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-5xl md:text-7xl font-light text-primary tracking-tighter font-mono">
                                {isInView ? (
                                    <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                                ) : (
                                    "0"
                                )}
                                {stat.suffix}
                            </div>
                            <div className="text-sm md:text-base uppercase tracking-widest text-white/50 mt-4 font-bold">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
