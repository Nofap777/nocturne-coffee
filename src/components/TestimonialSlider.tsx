"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const testimonials = [
    { quote: "The most intense cold brew I’ve ever tasted. It changed my mornings permanently.", author: "James T." },
    { quote: "Smooth, velvety, and completely devoid of bitterness. A masterpiece.", author: "Sarah W." },
    { quote: "Nocturne tastes like luxury in a glass. Unbelievable profile.", author: "Michael B." },
];

export default function TestimonialSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(0);

    // Simple infinite marquee effect
    useAnimationFrame((time, delta) => {
        let moveBy = 1 * (delta / 16);
        let newX = x - moveBy;

        // Reset based on half width (we duplicate content)
        if (scrollRef.current) {
            if (newX <= -scrollRef.current.clientWidth / 2) {
                newX = 0;
            }
        }
        setX(newX);
    });

    return (
        <section className="bg-background py-40 overflow-hidden relative z-10 w-full" ref={containerRef}>
            <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="w-full relative">
                <motion.div
                    ref={scrollRef}
                    style={{ x }}
                    className="flex whitespace-nowrap gap-16 md:gap-32 w-max items-center"
                >
                    {/* Duplicate for infinite loop */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="flex flex-col gap-6 ml-16 md:ml-32">
                            <h3 className="text-4xl md:text-7xl font-light text-white italic tracking-tighter">
                                "{t.quote}"
                            </h3>
                            <p className="text-primary tracking-widest uppercase text-sm font-bold">
                                — {t.author}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
