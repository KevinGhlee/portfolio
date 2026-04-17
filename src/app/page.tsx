"use client";

import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Marquee } from "@/components/Marquee";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-[#5eead4] selection:text-[#0a0a0a] relative">
      <CursorSpotlight />
      <CustomCursor />
      <CommandPalette />
      <ScrollProgress />

      <main>
        <Hero />
        <Marquee />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
