"use client";

import MagneticButton from "./MagneticButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

    return (
        <footer ref={ref} className="relative h-screen flex flex-col items-center justify-between text-white overflow-hidden z-0">
            <motion.div
                style={{ y }}
                className="w-full h-full absolute inset-0 bg-[#0a0a0a] flex flex-col justify-between pt-32 pb-10 px-10 md:px-20"
            >
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 drop-shadow-xl">
                        TASTE THE <span className="text-primary italic">NIGHT</span>.
                    </h2>
                    <MagneticButton className="text-lg">Shop Nocturne</MagneticButton>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-t border-white/10 pt-8 w-full">
                    <div className="flex gap-6 uppercase tracking-widest text-xs text-white/50">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/50">
                        © {new Date().getFullYear()} Nocturne Coffee
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/50 hover:text-primary transition-colors cursor-pointer">
                        Back to top ↑
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
