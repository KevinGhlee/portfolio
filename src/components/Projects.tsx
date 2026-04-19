"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DDoSVisual } from "./visuals/DDoSVisual";
import { GroupTripVisual } from "./visuals/GroupTripVisual";
import { RAGVisual } from "./visuals/RAGVisual";
import { AnalyticsVisual } from "./visuals/AnalyticsVisual";
import { OMATVisual } from "./visuals/OMATVisual";
import { ProjectModal, ProjectModalData } from "./ProjectModal";

const projects: Array<{
  id: number;
  name: string;
  description: string;
  context: string;
  status: string;
  tags: string[];
  Visual: React.ComponentType;
  modal: ProjectModalData;
}> = [
  {
    id: 1,
    name: "DDoS Mitigation Research",
    description:
      "Real-time detection system using entropy-based analysis and SDN-driven mitigation",
    context: "Dartmouth · Sep 2024 – present",
    status: "active",
    tags: ["Python", "SDN", "Network Security"],
    Visual: DDoSVisual,
    modal: {
      name: "DDoS Mitigation Research",
      context: "Dartmouth College · Sep 2024 – present",
      overview:
        "Ongoing research at Dartmouth exploring algebraic and machine-learning-based approaches to network attack detection and mitigation. The work spans two papers that apply braid group theory and symmetry-aware reinforcement learning to the problem of DDoS and EDoS attack fingerprinting.",
      highlights: [
        "Paper 1 — \"Reinforcement Learning and Symmetry in the Braid Group: A MatrixNet Approach to Canonical Form Learning\": Develops MatrixNet, a neural architecture that learns canonical forms of braid words. Symmetry-preserving representations are used to build a compact, invariant feature space for traffic classification.",
        "Paper 2 — \"Symmetry-Aware Reinforcement Learning for DDoS and EDoS Attack Detection and Mitigation\": Applies the MatrixNet algebraic fingerprinting approach to live SDN traffic. An entropy-based detector flags anomalous flows; an RL agent dynamically reroutes or rate-limits suspect traffic via OpenFlow rules.",
        "Implemented the SDN simulation environment in Python with Mininet and Ryu controller to generate labeled DDoS/EDoS traffic traces.",
        "Achieved statistically significant detection accuracy improvement over baseline entropy-only classifiers on the generated traffic dataset.",
      ],
      links: [
        {
          label: "MatrixNet Paper (Braid Group RL)",
          url: "/papers/matrixnet-braid-group-rl.pdf",
          icon: "pdf",
        },
        {
          label: "DDoS/EDoS Mitigation Paper",
          url: "/papers/ddos-edos-matrixnet-algebraic.pdf",
          icon: "pdf",
        },
      ],
    },
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
    modal: {
      name: "GroupTrip.ai",
      context: "CS 52 · Dartmouth College · Jan 2025",
      overview:
        "A full-stack AI travel planner that takes the chaos out of group trips. Users enter destinations, travel dates, and individual preferences — a multi-agent pipeline powered by GPT-4o then generates a personalized, conflict-free itinerary for the whole group.",
      highlights: [
        "Multi-agent architecture: a Planner agent decomposes the trip into day-by-day segments, a Researcher agent pulls live data (weather, events, hours), and a Synthesizer agent merges preferences and constraints into a coherent plan.",
        "Built with Next.js 14 App Router, TypeScript, and Tailwind CSS on the frontend; Node/Express API with OpenAI Assistants API on the backend.",
        "Streaming responses via SSE so the itinerary renders incrementally as each agent finishes.",
        "Users can collaboratively vote on suggested activities and the planner re-ranks based on group consensus.",
        "Deployed on Render with persistent sessions stored in PostgreSQL.",
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://project-grouptrip-ai-lx69.onrender.com/",
          icon: "external",
        },
        {
          label: "GitHub",
          url: "https://github.com/dartmouth-cs52/project-grouptrip-ai",
          icon: "external",
        },
      ],
    },
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
    modal: {
      name: "RAG Chatbot — Internal Knowledge Base",
      context: "Hiossen Implant · Summer 2024",
      overview:
        "Built during a software engineering internship at Hiossen Implant, a dental implant manufacturer. The company's internal support team was handling hundreds of repetitive questions from distributors and field reps about product specs, surgical protocols, and regulatory docs. This chatbot replaced that manual lookup loop.",
      highlights: [
        "Ingested 500+ internal documents (product manuals, FDA filings, training guides) into a Pinecone vector store using LangChain document loaders and recursive text splitters.",
        "Retrieval pipeline: hybrid search (dense + sparse BM25) over Pinecone, re-ranked with a cross-encoder before passing top-k chunks to GPT-4 Turbo.",
        "Built a chat UI in React with streaming token output and source citations — every answer links back to the source document and page.",
        "Achieved a 40% reduction in Tier-1 support tickets in the first month of deployment, measured against the prior 30-day baseline.",
        "Added role-based access so external distributors get a restricted document scope vs. internal staff.",
      ],
      links: [],
    },
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
    modal: {
      name: "Analytics Dashboard — The Dartmouth",
      context: "The Dartmouth · 2024",
      overview:
        "The Dartmouth is Dartmouth's independent student newspaper, one of the oldest college papers in the country. I rebuilt their frontend and added an internal analytics dashboard so editors could see what was actually working — in real time.",
      highlights: [
        "Rebuilt the public-facing site frontend in React, migrating away from a legacy WordPress template. Improved Lighthouse performance score from 54 to 91.",
        "Designed and built a live analytics dashboard using D3.js for chart rendering and a PostgreSQL backend. Editors can filter by section, author, date range, and article type.",
        "Implemented ad impression and click tracking: a lightweight pixel-based tracker logs events to the backend, feeding a separate ad-performance view for the business team.",
        "Integrated Google Analytics 4 events alongside the custom tracker for cross-validation and advertiser reporting.",
        "Dashboard surfaces pageviews, unique visitors, scroll depth, time-on-page, and social referral breakdown — all updating live via WebSocket.",
      ],
      links: [
        {
          label: "The Dartmouth",
          url: "https://www.thedartmouth.com/",
          icon: "external",
        },
      ],
    },
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
    modal: {
      name: "OMAT — OculoMotor Assessment Tool",
      context: "Dartmouth College · 2024",
      overview:
        "Concussion diagnosis is notoriously difficult — symptoms overlap with fatigue, anxiety, and other conditions, and sideline assessment is often subjective. The OMAT project digitizes and automates oculomotor testing, which has shown strong diagnostic signal for traumatic brain injury (TBI) in clinical research.",
      highlights: [
        "Based on the clinical protocol from Yaramothu et al. (2021, PMC8205981), which validated oculomotor metrics — saccade latency, smooth pursuit gain, vergence accuracy — as reliable TBI biomarkers.",
        "Built a mobile app (Python + OpenCV backend, React Native frontend) that uses the device camera to track pupil position at 60 fps using a Hough circle transform with sub-pixel refinement.",
        "Implemented three test modules: pro-saccade, anti-saccade, and smooth pursuit. Each module presents a calibrated stimulus and records gaze error against the ground truth trajectory.",
        "Computed per-session metrics (latency, gain, peak velocity) and compared them against normative ranges from the Yaramothu dataset to generate a risk score.",
        "Designed for sideline use: the full assessment runs in under 3 minutes and produces a printable PDF report for trainers and medical staff.",
      ],
      links: [
        {
          label: "Yaramothu et al. 2021 (PMC8205981)",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8205981/",
          icon: "external",
        },
      ],
    },
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
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
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
      className="group flex flex-col md:flex-row gap-8 border-b border-[#222] pb-10 last:border-0 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={onOpen}
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

        {/* Click hint */}
        <div className="mt-5 text-[11px] font-mono text-[#444] group-hover:text-[#5eead4]/60 transition-colors duration-300">
          click to learn more →
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeModal, setActiveModal] = useState<ProjectModalData | null>(null);

  return (
    <>
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setActiveModal(project.modal)}
            />
          ))}
        </div>
      </section>

      <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
