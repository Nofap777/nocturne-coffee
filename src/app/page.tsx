"use client";

import { useState } from "react";
import SmoothScrolling from "@/components/SmoothScrolling";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoGrid from "@/components/BentoGrid";
import StatsSection from "@/components/StatsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import Footer from "@/components/Footer";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <SmoothScrolling>
            {loading && <Preloader onLoaded={() => setLoading(false)} />}

            <main className={`relative bg-background min-h-screen selection:bg-primary/30 text-foreground transition-opacity duration-1000 ${loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`}>
                <Navigation />
                <SequenceScroll />

                {/* Sections that close the hero narrative, organically flowing up */}
                <div className="relative z-10 bg-background w-full">
                    <AboutSection />
                    <BentoGrid />
                    <StatsSection />
                    <TestimonialSlider />
                    <Footer />
                </div>
            </main>
        </SmoothScrolling>
    );
}
