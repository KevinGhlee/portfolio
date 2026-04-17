"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DDoSVisual } from "./visuals/DDoSVisual";
import { GroupTripVisual } from "./visuals/GroupTripVisual";
import { RAGVisual } from "./visuals/RAGVisual";
import { AnalyticsVisual } from "./visuals/AnalyticsVisual";
import { OMATVisual } from "./visuals/OMATVisual";

const projects = [
  {
    id: 1,
    name: "DDoS Mitigation Research",
    description:
      "Real-time detection system using entropy-based analysis and SDN-driven mitigation",
    context: "Dartmouth · Sep 2024 – present",
    status: "active",
    tags: ["Python", "SDN", "Network Security"],
    Visual: DDoSVisual,
  },
  {
    id: 2,
    name: "GroupTrip.ai",
    description:
      "AI-powered group travel planner with multi-agent itinerary generation",
    context: "Personal · Jan 2025",
    status: "building",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    Visual: GroupTripVisual,
  },
  {
    id: 3,
    name: "RAG Chatbot",
    description:
      "Internal knowledge base chatbot achieving 40% reduction in support tickets",
    context: "Hiossen Implant · Summer 2024",
    status: "shipped",
    tags: ["Python", "LangChain", "Pinecone"],
    Visual: RAGVisual,
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    description:
      "Real-time traffic and engagement analytics for campus newspaper",
    context: "The Dartmouth · 2024",
    status: "shipped",
    tags: ["React", "D3.js", "PostgreSQL"],
    Visual: AnalyticsVisual,
  },
  {
    id: 5,
    name: "OMAT Concussion Screening",
    description:
      "Oculomotor assessment modules for traumatic brain injury detection",
    context: "Dartmouth · 2024",
    status: "shipped",
    tags: ["Python", "OpenCV", "Medical Imaging"],
    Visual: OMATVisual,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-400 border-green-400/20 bg-green-400/10 animate-[pulse-slow_3s_cubic-bezier(0.4,0,0.6,1)_infinite]";
    case "building":
      return "text-[#5eead4] border-[#5eead4]/20 bg-[#5eead4]/10";
    case "shipped":
      return "text-[#888] border-[#333] bg-[#1a1a1a]";
    default:
      return "text-[#888] border-[#333] bg-[#1a1a1a]";
  }
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col md:flex-row gap-8 border-b border-[#222] pb-10 last:border-0"
      style={{ perspective: 1000 }}
    >
      {/* Visual Area - 3D Tilt */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full md:w-[45%] lg:w-[50%] aspect-[16/10] md:aspect-auto md:min-h-[280px] rounded-lg bg-[#111] border border-[#222] group-hover:border-[#444] transition-colors duration-500 relative"
      >
        <div
          data-cursor="explore"
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          <project.Visual />
        </div>
      </motion.div>

      {/* Details Area */}
      <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center py-2">
        <div className="flex items-center gap-3 mb-2">
          <motion.h3
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[16px] md:text-[18px] font-medium text-[#fafafa] group-hover:text-[#5eead4] transition-colors duration-300"
          >
            {project.name}
          </motion.h3>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${getStatusColor(project.status)}`}
          >
            {project.status}
          </span>
        </div>

        <p className="text-[13px] md:text-[14px] text-[#888] mb-4">
          {project.description}
        </p>

        <div className="text-[13px] text-[#888] mb-6">{project.context}</div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded bg-[#111] border border-[#222] text-[12px] text-[#888] font-mono hover:scale-[1.02] hover:border-[#444] transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      className="px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto relative z-10 bg-[#0a0a0a]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-[#888]">
          Selected Work
        </h2>
      </motion.div>

      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
