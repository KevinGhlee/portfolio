"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DotGrid } from "./DotGrid";
import { GradientMesh } from "./GradientMesh";
import { MagneticButton } from "./MagneticButton";

const RESUME_URL = "/resume/Kevin_Lee_RESUME.pdf";
const GITHUB_URL = "https://github.com/KevinGhlee";
const LINKEDIN_URL = "https://www.linkedin.com/in/kevin-ghlee";
const EMAIL = "kevin.ghlee@gmail.com";

const statement = "Software engineer building at the edge of security and AI.";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textLetterSpacing = useTransform(scrollYProgress, [0, 0.5], ["0em", "0.2em"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 0.3], [0, 20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity }}
      className="relative min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-24 overflow-hidden"
    >
      <GradientMesh />
      <DotGrid />

      {/* Top Left Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 lg:top-24 lg:left-24 z-10"
      >
        <span className="font-mono text-[13px] uppercase tracking-widest text-[#888]">
          Kevin Lee
        </span>
      </motion.div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl mt-20 md:mt-0 z-10 relative pointer-events-none">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ letterSpacing: textLetterSpacing, opacity: textOpacity }}
          className="text-[28px] md:text-[36px] font-medium leading-tight text-[#fafafa] mb-6 flex flex-wrap"
        >
          {statement.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={charVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          style={{ opacity: subOpacity, y: subY }}
          className="text-[14px] text-[#888] mb-12"
        >
          CS at Dartmouth. Researching DDoS mitigation. Previously Hiossen Implant.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          style={{ opacity: subOpacity }}
          className="flex flex-wrap gap-6 text-[14px] pointer-events-auto"
        >
          <MagneticButton>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              Email
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: subOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center z-10 pointer-events-auto"
      >
        <a href="#work" className="p-2 cursor-pointer">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#888] opacity-50 hover:text-[#5eead4] transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </motion.section>
  );
}
