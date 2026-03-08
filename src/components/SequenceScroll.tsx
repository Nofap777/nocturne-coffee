"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        // Load images into memory for instant rendering
        const loadedImages: HTMLImageElement[] = [];
        for (let i = 1; i <= 240; i++) {
            const img = new Image();
            img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const drawFrame = (progress: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Map progress 0-1 to frame 0-239
        let frameIndex = Math.floor(progress * 239);
        if (frameIndex > 239) frameIndex = 239;
        if (frameIndex < 0) frameIndex = 0;

        const img = images[frameIndex];
        if (img && img.complete) {
            // Draw Cover
            const canvas = canvasRef.current;
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            // Calculate object-fit cover ratios
            const hRatio = cw / iw;
            const vRatio = ch / ih;
            const ratio = Math.max(hRatio, vRatio);

            const x = (cw - iw * ratio) / 2;
            const y = (ch - ih * ratio) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, 0, 0, iw, ih, x, y, iw * ratio, ih * ratio);
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        drawFrame(latest);
    });

    // Handle Resize setup
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // High DPI Canvas scaling
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                const ctx = canvasRef.current.getContext("2d");
                if (ctx) ctx.scale(dpr, dpr);

                drawFrame(scrollYProgress.get());
            }
        };

        // Initial size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images]); // Re-run when images load to do first paint

    // Overlays Opacity Transformations
    const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
    const y0 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const opacity30 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const y30 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

    const opacity60 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const y60 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

    const opacity90 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const y90 = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* The sequence canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: "100%", height: "100%" }}
                />

                {/* Narrative Overlays overlay on top of canvas */}

                <motion.div
                    style={{ opacity: opacity0, y: y0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase text-center drop-shadow-2xl">
                        Nocturne
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-[#d4a373] tracking-widest uppercase text-center font-light drop-shadow-md">
                        The Art of Cold Brew
                    </p>
                </motion.div>

                <motion.div
                    style={{ opacity: opacity30, y: y30 }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none px-[10%] md:px-[20%]"
                >
                    <div className="max-w-md">
                        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight drop-shadow-xl">
                            Brewed in <br /><span className="font-bold italic text-primary">Shadows</span>.
                        </h2>
                        <p className="mt-6 text-lg text-white/80 font-light">
                            We steep our beans slowly, releasing a dimension of flavor that daylight could never unveil.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: opacity60, y: y60 }}
                    className="absolute inset-0 flex flex-col justify-center items-end pointer-events-none px-[10%] md:px-[20%]"
                >
                    <div className="max-w-md text-right">
                        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight drop-shadow-xl">
                            Silky. Dark. <br /><span className="font-bold italic text-primary">Intense</span>.
                        </h2>
                        <p className="mt-6 text-lg text-white/80 font-light drop-shadow-md">
                            A profile so rich, you'll forget what morning coffee was supposed to taste like.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: opacity90, y: y90 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-xl mb-10 text-center">
                        Embrace the Night.
                    </h2>
                    <div className="pointer-events-auto">
                        <MagneticButton className="flex items-center text-lg gap-3 px-10">
                            <span className="relative z-10 block">Taste Nocturne</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 duration-300" />
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
