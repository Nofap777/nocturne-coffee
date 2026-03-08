"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "center center"],
    });

    const text =
        "We spent a year sourcing shade-grown beans and another year mastering the exact temperature curve required for Nocturne. Our 24-hour steep process ensures the most velvety, uncompromised cold brew you have ever tasted.";

    const words = text.split(" ");

    return (
        <section ref={containerRef} className="relative z-10 -mt-[100vh] min-h-screen bg-background flex flex-col items-center justify-center py-40 px-[5%] md:px-[20%] text-center">
            <p className="flex flex-wrap text-3xl md:text-6xl font-light leading-[1.2] text-white/20 select-none">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;

                    return (
                        <Word
                            key={i}
                            word={word}
                            progress={scrollYProgress}
                            range={[start, end]}
                        />
                    );
                })}
            </p>
        </section>
    );
}

const Word = ({
    word,
    progress,
    range,
}: {
    word: string;
    progress: any;
    range: number[];
}) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative mr-[1.5vw] mt-2">
            <span className="absolute opacity-20">{word}</span>
            <motion.span style={{ opacity: opacity }} className="text-primary">
                {word}
            </motion.span>
        </span>
    );
};
