"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "AI Quality Analyst",
    org: "Turing · Google Gemini",
    period: "Jun 2026 – Present",
    note: "Evaluating Gemini personalization for Korean locale",
    accent: "#5eead4",
    dot: "active",
  },
  {
    title: "Software Engineering Intern",
    org: "Hiossen Implant",
    period: "Jun – Sep 2025",
    note: "Shipped RAG AI agent; 68% → 89% accuracy",
    accent: "#94a3b8",
    dot: "shipped",
  },
  {
    title: "Software Co-Head",
    org: "The Dartmouth",
    period: "Sep 2023 – Present",
    note: "500K+ monthly impressions; analytics dashboard",
    accent: "#94a3b8",
    dot: "active",
  },
  {
    title: "Undergraduate Researcher",
    org: "Dartmouth URAD",
    period: "Sep 2024 – Present",
    note: "DDoS/amplification research; 2× URAD Honor Award",
    accent: "#94a3b8",
    dot: "active",
  },
  {
    title: "Research Intern",
    org: "SQRL Lab · NJIT",
    period: "Jun 2023 – Sep 2024",
    note: "OMAT concussion screening: 78% → 94% accuracy",
    accent: "#94a3b8",
    dot: "shipped",
  },
];

export function Experience() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto relative z-10 bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-[#888]">
          Experience
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#222] hidden md:block" />

        <div className="flex flex-col gap-0">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex gap-6 md:gap-10 py-4 border-b border-[#111] last:border-0 group"
            >
              {/* Dot */}
              <div className="hidden md:flex flex-col items-center pt-1.5 shrink-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${
                    role.dot === "active"
                      ? "border-[#5eead4] bg-[#5eead4]/20"
                      : "border-[#333] bg-[#222]"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 flex-1 min-w-0">
                <div className="md:w-[200px] shrink-0">
                  <div className="text-[13px] font-medium text-[#fafafa] group-hover:text-[#5eead4] transition-colors duration-200 leading-tight">
                    {role.title}
                  </div>
                  <div className="text-[12px] text-[#888] font-mono mt-0.5">{role.org}</div>
                </div>
                <div className="text-[12px] text-[#555] font-mono md:w-[160px] shrink-0">
                  {role.period}
                </div>
                <div className="text-[13px] text-[#666]">{role.note}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
