"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onLoaded }: { onLoaded: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Preload important images
        let loadedCount = 0;
        const totalImages = 240;

        const loadImages = () => {
            // Step interval for basic progress if images load too fast
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 30);

            // Actually preload images
            for (let i = 1; i <= totalImages; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        setProgress(100);
                    }
                };
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                onLoaded();
            }, 500); // Small delay to let user see 100%
        }
    }, [progress, onLoaded]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight text-primary-dark"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        NOCTURNE
                    </motion.h1>
                    <div className="h-1 w-48 bg-dark-card overflow-hidden rounded-full">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "circOut" }}
                        />
                    </div>
                    <p className="text-sm font-medium tracking-widest text-[#d4a373] mt-2">
                        {Math.floor(progress)}%
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
