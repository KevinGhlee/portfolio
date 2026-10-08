"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlacisVisual } from "./visuals/GlacisVisual";
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
    name: "Glacis",
    description:
      "Edge defense console for game infrastructure — live attack telemetry, mitigation controls, and incident timelines",
    context: "Personal · 2026",
    status: "shipped",
    tags: ["HTML/CSS/JS", "Network Security", "Game Infra"],
    Visual: GlacisVisual,
    modal: {
      name: "Glacis — Edge Defense Console",
      context: "Personal · 2026",
      overview:
        "Glacis is a single-file operator console purpose-built for game server infrastructure. It came out of the DDoS amplification research — I wanted a real operator-facing tool that shows live attack telemetry, lets you push mitigation policy changes, and gives you an incident timeline all in one screen without a backend dependency.",
      highlights: [
        "Single-file deployment: the entire console is one self-contained HTML/CSS/JS file — no build step, no server — so a game server operator can drop it anywhere and have it running immediately.",
        "Live attack telemetry panel: displays inbound query rates, source IP clustering, and bandwidth amplification factor (BAF) in real time, color-coded to Rossow threat thresholds.",
        "Mitigation policy controls: toggle challenge-response handshake (Valve's A2S fix), per-subnet rate limiting, and RTBH/FlowSpec policy pushes with one click and immediate rollback.",
        "Incident timeline: every policy change and threshold breach is logged with a timestamp and operator note, giving an auditable record for post-incident review.",
        "Published with a companion product case study documenting the design decisions and security model.",
      ],
      links: [],
    },
  },
  {
    id: 2,
    name: "DDoS Amplification Research",
    description:
      "Measuring and mitigating reflection-amplification attacks on gaming server query protocols (Quake3, Steam A2S)",
    context: "Dartmouth URAD · Sep 2024 – Present",
    status: "active",
    tags: ["Python", "Network Security", "SDN"],
    Visual: DDoSVisual,
    modal: {
      name: "DDoS Amplification Research",
      context: "Dartmouth College URAD · Sep 2024 – Present · 2× Research Honor Award",
      overview:
        "Reflection-amplification attacks exploit public servers that reply to anyone — the attacker spoofs the victim's IP, sends a small request, and the server unwittingly floods the victim with a reply dozens of times larger. Game servers are a primary target because their query protocols (Quake3's getstatus, Steam's A2S_INFO) have no authentication and produce large replies. Rossow (NDSS 2014) measured bandwidth amplification factors (BAF) up to 83× for Quake3 and 15× for Steam.\n\nThis project fills a gap: the proposed fixes were never rigorously measured. The evidence from Valve's own rollout of the A2S challenge-response was anecdotal — operators reporting that ping \"looked doubled\" or servers \"disappeared.\" I'm running the controlled experiments that were never done, so operators have real numbers rather than vibes.",
      highlights: [
        "Built a sliding-window traffic feature pipeline over synthetic and public attack datasets, benchmarking unsupervised anomaly detection against supervised classification baselines.",
        "Implemented and tested Rossow's two retrofittable fixes: challenge-response handshake (directly blocking spoofed reflection) and per-subnet rate limiting.",
        "Measurement framework covers two independent axes: security benefit (BAF reduction, ideally toward 1×) and player-side cost (query completion time, success rate, ping display accuracy, server browser population time).",
        "Attack simulation testbed generates traffic modeled on live multiplayer conditions — server browser polling intervals, player counts, match load — to measure fixes under realistic conditions.",
        "Validated mitigation strategies in an emulated network environment; ML detection models across 6 red-team attack scenarios achieved 0.91 precision, 0.87 recall, 0.89 F1.",
        "Two-time URAD Research Honor Award recipient. Faculty mentor: Prof. Sami Saydjari.",
      ],
      links: [
        {
          label: "MatrixNet / Braid Group RL Paper",
          url: "/papers/matrixnet-braid-group-rl.pdf",
          icon: "pdf",
        },
        {
          label: "DDoS/EDoS Algebraic Fingerprinting Paper",
          url: "/papers/ddos-edos-matrixnet-algebraic.pdf",
          icon: "pdf",
        },
      ],
    },
  },
  {
    id: 3,
    name: "GroupTrip.ai",
    description:
      "AI-powered collaborative trip planner with real-time dashboards, day planners, and a GPT-4o-mini agent",
    context: "CS 52 · Dartmouth · 2025–Present",
    status: "building",
    tags: ["TypeScript", "Node/Express", "MongoDB"],
    Visual: GroupTripVisual,
    modal: {
      name: "GroupTrip.ai",
      context: "CS 52 · Dartmouth College · Co-Leader",
      overview:
        "A full-stack AI travel planner built from 0 to 1 for Dartmouth's full-stack development course, now in active development. GroupTrip.ai solves the coordination problem of group travel — everyone has different preferences, someone has to do the research, and plans fall apart in group chats. The app centralizes everything.",
      highlights: [
        "Autonomous AI agent (GPT-4o-mini) with function calling: executes structured actions — searching places, building itineraries, resolving conflicts — from natural language chat, grounded in the current trip context and each user's stated preferences.",
        "Real-time collaborative dashboards built on WebSockets: every participant sees itinerary updates, votes, and chat messages live without refresh.",
        "Day planner UI: drag-and-drop timeline for each day, with activities populated by the agent or added manually. Conflicts (overlapping times, out-of-range distances) are flagged inline.",
        "Full-stack: TypeScript frontend, Node.js/Express REST API, MongoDB for persistence, deployed on Render.",
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
    id: 4,
    name: "Analytics Dashboard",
    description:
      "Production dashboard tracking 500K+ monthly impressions across 30+ ad placements at The Dartmouth",
    context: "The Dartmouth · Sep 2023 – Present",
    status: "shipped",
    tags: ["React", "TypeScript", "MongoDB"],
    Visual: AnalyticsVisual,
    modal: {
      name: "Analytics Dashboard — The Dartmouth",
      context: "The Dartmouth · Software Co-Head · Sep 2023 – Present",
      overview:
        "The Dartmouth is Dartmouth's independent student newspaper and one of the oldest college dailies in the country. I joined as a Software Engineer and now lead the software department as Co-Head, owning all CMS releases, site infrastructure, and new feature development.",
      highlights: [
        "Built and shipped a production analytics dashboard (React, TypeScript) tracking 500K+ monthly impressions across 30+ ad placements — adopted by 18 non-technical staff for daily editorial and business decisions.",
        "Designed Node.js REST APIs that ingest external partner data into MongoDB, improving ad placement optimization by 14% and automating manual reporting workflows.",
        "Built a Python scraping pipeline that enriched the alumni directorate database now used for outreach campaigns.",
        "As Co-Head: own CMS and site releases, mentor software team members, and coordinate with editorial on feature priorities.",
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
    name: "RAG AI Agent",
    description:
      "Production AI agent serving 43 users across 4 product modules — 68% → 89% response accuracy",
    context: "Hiossen Implant · Jun–Sep 2025",
    status: "shipped",
    tags: ["Python", "LangChain", "Three.js"],
    Visual: RAGVisual,
    modal: {
      name: "RAG AI Agent — Hiossen Implant",
      context: "Hiossen Implant · Software Engineering Intern · Jun–Sep 2025",
      overview:
        "Hiossen Implant's internal support team handled hundreds of repetitive questions from distributors and field reps about product specs, surgical protocols, and regulatory docs. I built and shipped a production AI agent to replace that manual lookup loop, and rebuilt the frontend around it.",
      highlights: [
        "Production RAG agent built on Python and LangChain, serving 43 end users across 4 product modules: product specs, surgical protocols, regulatory filings, and training materials.",
        "Redesigned the retrieval and reasoning pipeline end-to-end: hybrid dense+sparse retrieval over Pinecone, cross-encoder re-ranking, few-shot prompting, and structured reasoning chains. Raised response accuracy from 68% to 89%.",
        "Cut human escalations by 32% across 1,200+ monthly queries.",
        "Built full-stack integrations connecting interactive 3D product interfaces (Three.js) to the ML-backed inference service, owning the work from ideation through production launch.",
      ],
      links: [],
    },
  },
  {
    id: 6,
    name: "OMAT Concussion Screening",
    description:
      "Raised concussion screening accuracy from 78% to 94% on the OMAT diagnostic tool at NJIT's SQRL Lab",
    context: "SQRL Lab · NJIT · Jun 2023 – Sep 2024",
    status: "shipped",
    tags: ["Python", "FSL", "Kotlin"],
    Visual: OMATVisual,
    modal: {
      name: "OMAT — OculoMotor Assessment Tool",
      context: "SQRL Lab · New Jersey Institute of Technology · Jun 2023 – Sep 2024",
      overview:
        "Concussion diagnosis is notoriously unreliable — symptoms overlap with fatigue and anxiety, and sideline assessment is often subjective. The OMAT project at NJIT's SQRL Lab digitizes oculomotor testing, which has shown strong diagnostic signal for traumatic brain injury in clinical research (Yaramothu et al., 2021).",
      highlights: [
        "Raised concussion screening accuracy from 78% to 94% on the OMAT diagnostic tool by building automated MRI/fMRI/DTI preprocessing pipelines (Python, FSL) for eye-movement and memory signal analysis.",
        "The preprocessing pipeline normalized diffusion tensor imaging (DTI) fractional anisotropy maps, co-registered fMRI BOLD signals to structural MRI, and extracted oculomotor pathway ROI metrics — removing the manual preprocessing bottleneck that was the main source of variability.",
        "Built Android visualization modules (Kotlin, WebView, JavaScript) for interactive brain imaging slice navigation and overlay rendering — still in active use in ongoing lab research.",
        "Based on the clinical protocol from Yaramothu et al. (2021, PMC8205981), which validated oculomotor metrics (saccade latency, smooth pursuit gain, vergence accuracy) as reliable TBI biomarkers.",
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
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

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
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <p className="text-[13px] md:text-[14px] text-[#888] mb-4">{project.description}</p>
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
