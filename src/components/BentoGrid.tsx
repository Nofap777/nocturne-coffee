"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
    {
        title: "Sourced with Care",
        description: "Single-origin beans from high altitudes.",
        span: "md:col-span-2 md:row-span-1",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Zero Bitterness",
        description: "Pure smoothness.",
        span: "md:col-span-1 md:row-span-2",
        img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600",
    },
    {
        title: "Nitro Infused",
        description: "A cascade of bubbles.",
        span: "md:col-span-1 md:row-span-1",
        img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    },
    {
        title: "Sustainably Packaged",
        description: "100% recyclable cans.",
        span: "md:col-span-2 md:row-span-1",
        img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800",
    },
];

export default function BentoGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section className="bg-background py-20 px-[5%] md:px-[10%] max-w-7xl mx-auto z-10 relative">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-16 tracking-tight">
                The Anatomy of <span className="text-primary italic font-bold">Perfection</span>.
            </h2>
            <div
                ref={ref}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className={`group relative overflow-hidden rounded-3xl bg-dark-card ${card.span}`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-overlay"
                            style={{ backgroundImage: `url(${card.img})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
                        <div className="relative h-full flex flex-col justify-end p-8 z-10">
                            <h3 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">
                                {card.title}
                            </h3>
                            <p className="text-primary-dark font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                {card.description}
                            </p>
                        </div>

                        {/* Outline hover effect */}
                        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-3xl pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
