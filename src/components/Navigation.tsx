"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { Coffee, Instagram, Twitter } from "lucide-react";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "Our Process", href: "#process" },
    { title: "Shop", href: "#shop" },
    { title: "Journal", href: "#journal" },
    { title: "Contact", href: "#contact" },
];

export default function Navigation() {
    const [isActive, setIsActive] = useState(false);

    const menuVariants = {
        open: {
            clipPath: "circle(150% at calc(100% - 40px) 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
        },
        closed: {
            clipPath: "circle(0% at calc(100% - 40px) 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const linkVariants = {
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        }),
        closed: {
            y: 50,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
        },
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
                <Link href="/" className="pointer-events-auto flex items-center gap-3 group">
                    <Coffee className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                    <span className="text-white font-bold tracking-widest text-xl uppercase hidden md:inline-block">
                        Nocturne
                    </span>
                </Link>
                <div className="pointer-events-auto mix-blend-normal">
                    <MagneticButton>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className="flex items-center justify-center space-x-2"
                        >
                            <span className="text-sm">Menu</span>
                            <div className="w-6 h-4 relative flex flex-col justify-between">
                                <span
                                    className={`block h-0.5 w-full bg-current transition-transform duration-300 ${isActive ? "rotate-45 translate-y-1.5" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${isActive ? "opacity-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-0.5 w-full bg-current transition-transform duration-300 ${isActive ? "-rotate-45 -translate-y-[0.45rem]" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </MagneticButton>
                </div>
            </header>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-[#d4a373] z-40 flex flex-col justify-center px-[10%] pt-20"
                    >
                        <div className="flex flex-col md:flex-row justify-between w-full h-full max-h-[70vh]">
                            <div className="flex flex-col gap-4 md:gap-8 justify-center h-full">
                                {navLinks.map((link, i) => (
                                    <div key={link.title} className="overflow-hidden">
                                        <motion.div
                                            custom={i}
                                            variants={linkVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsActive(false)}
                                                className="text-5xl md:text-8xl font-bold tracking-tighter text-background hover:text-white transition-colors uppercase py-2 inline-block"
                                            >
                                                {link.title}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex md:flex-col justify-between md:justify-end pb-10 md:pb-0 gap-6 mt-10 md:mt-0 text-background/80 font-medium tracking-wide uppercase">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm opacity-50 mb-2">Socials</p>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                        <Instagram className="w-4 h-4" /> Instagram
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                        <Twitter className="w-4 h-4" /> Twitter
                                    </a>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm opacity-50 mb-2">Say Hello</p>
                                    <a href="mailto:hello@nocturne.com" className="hover:text-white transition-colors">
                                        hello@nocturne.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
