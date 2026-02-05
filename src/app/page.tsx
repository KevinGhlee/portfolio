"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  FileText,
  MapPin,
  Leaf,
  Code2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* =========================
   Personalize (Resume-accurate)
   ========================= */
const NAME = "Kevin Lee"; // site display
const FULL_NAME = "Kevin Geonhun Lee"; // resume name
const ROLE = "Dartmouth College — B.S. Computer Science";
const LOCATION = "Hanover, NH";
const EMAIL = "kevin.ghlee@gmail.com";

const RESUME_URL = "/resume/Kevin_Lee_RESUME.pdf"; // /public/resume/Kevin_Lee_RESUME.pdf
const GITHUB_URL = "https://github.com/KevinGhlee";
const LINKEDIN_URL = "https://www.linkedin.com/in/kevin-ghlee";

/* =========================
   Helpers
   ========================= */
type IconType = LucideIcon;

function SectionTitle({
  icon: Icon,
  text,
  subtitle,
}: {
  icon: IconType;
  text: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="icon-chip">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-50">
          {text}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-emerald-50/65">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return <Badge className="pill">{text}</Badge>;
}

/* =========================
   Content (UPDATED from resume)
   ========================= */
const PROJECTS = [
  {
    title: "OMAT — Oculomotor Movement Analysis Tool",
    blurb:
      "Designed a medical imaging pipeline processing MRI/fMRI/DTI inputs via FSL (motion correction, registration, ROI analysis) and delivered results to a mobile app. Built an Android visualization layer using WebView and JavaScript medical imaging viewers for slice navigation and overlay rendering.",
    impact:
      "Improved concussion screening diagnostic accuracy from 78% → 94% through automated preprocessing and feature extraction.",
    tags: ["Kotlin", "Python", "JavaScript", "FSL"],
    image: "/omat.jpg",
    imageAlt: "OMAT medical visualization",
  },
  {
    title: "Smart Posture — Real-Time Sensor System",
    blurb:
      "Built real-time sitting posture simulations using reusable Three.js components modeling vertical and horizontal spine inclination. Classified posture states from pressure sensors (FSRs, textile sensors), accelerometers, and gyroscopes using data from 113 student participants.",
    impact:
      "Developed a browser-based visualization tool for real-time posture feedback and severity classification.",
    tags: ["C", "JavaScript", "Three.js", "Sensors"],
    image: "/posture.jpg",
    imageAlt: "Posture visualization",
  },
];

const EXPERIENCE = [
  {
    company: "The Dartmouth (Student Newspaper)",
    role: "Software Engineer (Full-Stack)",
    when: "Sept 2025 – Present · Hanover, NH",
    bullets: [
      "Built production React and React Three Fiber interfaces integrating generative AI analytics for Monumetric advertising data, analyzing placement effectiveness, component performance, and reader engagement.",
      "Designed backend services and REST APIs in Node.js to process large-scale ad impression and interaction data from external partners collaborating with The Dartmouth.",
      "Worked cross-functionally with design, business, and external vendors to ship data-driven tooling used by editors and operations staff.",
    ],
  },
  {
    company: "Thayer School of Engineering at Dartmouth College",
    role: "Undergraduate Research Assistant — Cybersecurity Systems",
    when: "Sept 2024 – Present · Hanover, NH",
    bullets: [
      "Designed a multi-layer DDoS mitigation research prototype combining real-time traffic sensors (port mirroring, sFlow) with intelligent filtering across Layer 3/4 and Layer 7 traffic.",
      "Modeled edge mitigation mechanisms including BGP RTBH and BGP FlowSpec policies to drop attack traffic at routers and distributed PoPs before congestion reaches protected services.",
      "Simulated real-world attack scenarios in controlled virtual environments (“red button” testing), evaluating ML-based detection accuracy and time-to-mitigation tradeoffs.",
    ],
  },
  {
    company: "Hiossen Implant (U.S. division of Osstem Implant)",
    role: "Software Engineering Intern",
    when: "Jun 2025 – Sept 2025 · Englewood, NJ",
    bullets: [
      "Built interactive dental lab simulations using reusable Three.js components to visualize implant procedures and workflows, reducing development effort for new lab modules.",
      "Improved an internal clinical support chatbot using retrieval-augmented generation (RAG), few-shot prompting, and structured reasoning pipelines in Python and LangChain.",
      "Developed full-stack integrations between 3D simulation interfaces and ML-backed services, enabling clinicians to explore procedural visuals alongside AI-generated guidance.",
    ],
  },
  {
    company: "Dartmouth College",
    role: "Computer Science Teaching Assistant — CS50",
    when: "Sept 2024 – Present",
    bullets: [
      "Supported students developing C programs in Linux-based environments.",
      "Debugged memory management, file I/O, and socket-based networking issues.",
    ],
  },
];

const COURSEWORK = {
  completed: [
    "Object-Oriented Programming",
    "Discrete Mathematics",
    "Algorithms",
    "Software Implementation",
    "Cybersecurity",
    "Machine Learning",
  ],
  current: ["Fullstack Development", "Knot Theory with Reinforcement Learning"],
};

const SKILLS = [
  { name: "Languages", items: ["Python", "JavaScript", "C", "C++", "Java", "Kotlin"] },
  { name: "Systems / Backend", items: ["Node.js", "REST APIs", "Linux", "TCP/IP", "Socket programming"] },
  { name: "Frontend / Visualization", items: ["React", "React Three Fiber", "Three.js"] },
  { name: "ML / Data", items: ["NumPy", "scikit-learn", "LangChain", "RAG pipelines"] },
  { name: "Tools", items: ["Git", "Docker", "Bash"] },
];

/* =========================
   Fancy effects (NO hydration mismatch)
   ========================= */
function useSpotlight() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = document.documentElement;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

type LeafSpec = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: "sm" | "md" | "lg";
  opacity: number;
};

function makeLeaves(count = 10): LeafSpec[] {
  const sizes: LeafSpec["size"][] = ["sm", "md", "lg"];
  return Array.from({ length: count }).map((_, i) => {
    const left = `${Math.floor(Math.random() * 100)}%`;
    const delay = `${Math.random() * 10}s`;
    const duration = `${30 + Math.random() * 18}s`;
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const opacity = 0.10 + Math.random() * 0.18;
    return { id: i, left, delay, duration, size, opacity };
  });
}

/* =========================
   Page
   ========================= */
export default function Page() {
  useSpotlight();

  const mounted = useMounted();
  const [leaves, setLeaves] = useState<LeafSpec[]>([]);

  useEffect(() => {
    if (mounted) setLeaves(makeLeaves(10));
  }, [mounted]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <div className="bg-stage" />
      <div className="bg-noise" />
      <div className="bg-smooth" />
      <div className="bg-blobs" />
      <div className="bg-spotlight" />

      {/* Leaves (client-only to avoid hydration mismatch) */}
      {mounted && (
        <div className="leaf-layer" aria-hidden="true">
          {leaves.map((l) => (
            <span
              key={l.id}
              className={`leaf ${l.size}`}
              style={{
                left: l.left,
                animationDelay: l.delay,
                animationDuration: l.duration,
                opacity: l.opacity,
              }}
            >
              🍃
            </span>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-10 md:pt-14">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="icon-chip">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight text-emerald-50/95">
              {NAME}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2 justify-self-end">
            {[
              ["Projects", "#projects"],
              ["Experience", "#experience"],
              ["Coursework", "#coursework"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="btn-nav">
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-10 md:mt-14 grid place-items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200/10 bg-white/5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-200" />
            <span className="text-sm text-emerald-50/90">
              Systems • Networking • Security • ML Tooling
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-emerald-50">
            {FULL_NAME}
          </h1>

          <p className="mt-3 text-emerald-50/70">
            {ROLE} •{" "}
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {LOCATION}
            </span>
          </p>

          <p className="mt-5 max-w-3xl text-balance text-emerald-50/75 leading-relaxed">
            I build production-ready systems and interfaces with a focus on performance,
            reliability, and security. Recent work includes DDoS mitigation research,
            large-scale analytics pipelines, and interactive 3D + ML-backed tooling.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-solid">
              <FileText className="h-5 w-5 mr-2" />
              View Resume
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-outline">
              <Mail className="h-5 w-5 mr-2" />
              {EMAIL}
            </a>
          </div>
        </motion.div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 pt-12">
        {/* Projects */}
        <section id="projects" className="scroll-mt-24">
          <SectionTitle icon={Code2} text="Projects" subtitle="Selected builds with measurable impact." />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="card-wrap"
              >
                <Card className="card-glass">
                  {p.image && (
                    <div className="relative w-full h-44 overflow-hidden rounded-t-3xl">
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? p.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                  )}

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-emerald-50">{p.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 pb-6">
                    <p className="text-sm text-emerald-50/75 leading-relaxed">{p.blurb}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => <Pill key={t} text={t} />)}
                    </div>
                    <p className="text-xs text-emerald-100/60">{p.impact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-14 scroll-mt-24">
          <SectionTitle
            icon={Briefcase}
            text="Experience"
            subtitle="Recent roles across systems, security, and product engineering."
          />

          <div className="space-y-5">
            {EXPERIENCE.map((e) => (
              <motion.div
                key={e.company + e.role}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <Card className="card-glass rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-6 items-start">
                      <CardTitle className="text-xl text-emerald-50 leading-snug">
                        {e.role} • {e.company}
                      </CardTitle>
                      <div className="text-sm text-emerald-50/60 md:text-right md:whitespace-nowrap">
                        {e.when}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-emerald-50/75">
                      {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coursework */}
        <section id="coursework" className="mt-14 scroll-mt-24">
          <SectionTitle icon={GraduationCap} text="Coursework" subtitle="Core CS foundations + current focus areas." />
          <Card className="card-glass rounded-2xl">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-medium mb-2 text-emerald-50">Completed</div>
                  <div className="flex flex-wrap gap-2">
                    {COURSEWORK.completed.map((c) => <Pill key={c} text={c} />)}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2 text-emerald-50">Currently taking</div>
                  <div className="flex flex-wrap gap-2">
                    {COURSEWORK.current.map((c) => <Pill key={c} text={c} />)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-14 scroll-mt-24">
          <SectionTitle icon={Wrench} text="Skills" subtitle="A stack aimed at shipping + performance + reliability." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((g) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <Card className="card-glass rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-emerald-50">{g.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2 pb-6">
                    {g.items.map((i) => <Pill key={i} text={i} />)}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-14 scroll-mt-24">
          <SectionTitle icon={Mail} text="Contact" subtitle="Reach out — I reply fast." />
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${EMAIL}`} className="btn-solid">
              <Mail className="h-5 w-5 mr-2" />
              {EMAIL}
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </section>

        <footer className="pt-16 text-center text-sm text-emerald-50/45">
          © {new Date().getFullYear()} {FULL_NAME}. Built with Next.js + Tailwind.
        </footer>
      </div>
    </main>
  );
}