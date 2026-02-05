"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  FileText,
  MapPin,
  Leaf,
  ExternalLink,
  Code2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ====== PERSONALIZE ======
const NAME = "Kevin Lee";
const ROLE = "Dartmouth College — B.S. Computer Science";
const LOCATION = "Hanover, NH";
const EMAIL = "kevin.ghlee@gmail.com";

// Put the new PDF into /public with this exact name:
const RESUME_URL = "/Kevin_Lee_RESUME.pdf?v=1";

const GITHUB_URL = "https://github.com/KevinGhlee";
const LINKEDIN_URL = "https://www.linkedin.com/in/kevin-ghlee"; // from your resume

// ====== LEAFY THEME HELPERS ======
function SectionTitle({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-emerald-500" />
      <h2 className="text-2xl font-semibold">{text}</h2>
    </div>
  );
}
function Pill({ text }: { text: string }) {
  return <Badge className="rounded-full px-3 py-1 text-sm">{text}</Badge>;
}

// ====== DATA FROM YOUR RESUME ======
const PROJECTS = [
  {
    title: "OMAT — Oculomotor Movement Analysis Tool",
    blurb:
      "MRI/fMRI/DTI medical imaging pipeline with FSL (motion correction, registration, ROI analysis) delivering results to a mobile app. Android visualization via WebView and JS imaging viewers for slice navigation and overlays.",
    impact:
      "Improved concussion screening accuracy from 78% → 94% through automated preprocessing & feature extraction.",
    tags: ["Kotlin", "Python", "JavaScript", "FSL", "Imaging"],
    image: "/omat.jpg",
    imageAlt: "OMAT device",
  },
  {
    title: "Smart Posture — Real-Time Sensor System",
    blurb:
      "Classified posture from pressure sensors (FSRs/textile), accelerometers & gyros (113 participants) with real-time browser visualization and 3D feedback built using reusable Three.js components.",
    impact:
      "Modeled vertical/horizontal spine inclination and delivered real-time severity classification & feedback.",
    tags: ["C", "JavaScript", "Three.js", "Sensors", "Data Viz"],
    image: "/posture.jpg",
    imageAlt: "Spinal posture illustration",
  },
];

const EXPERIENCE = [
  {
    company: "The Dartmouth (Student Newspaper)",
    role: "Software Engineer (Full-Stack)",
    when: "Sept 2025 – Present · Hanover, NH",
    bullets: [
      "Built production React and React Three Fiber interfaces integrating generative-AI analytics for Monumetric ad data.",
      "Designed Node.js REST services to process large-scale ad impressions & interactions from external partners.",
      "Shipped data-driven tooling with design/business teams for editors and operations staff.",
    ],
  },
  {
    company: "Thayer School of Engineering, Dartmouth",
    role: "Undergraduate Research Assistant — Cybersecurity Systems",
    when: "Sept 2024 – Present · Hanover, NH",
    bullets: [
      "Prototyped multi-layer DDoS mitigation: real-time traffic sensors (port mirroring, sFlow) + L3/4 + L7 filtering.",
      "Modeled edge mitigation via BGP RTBH & FlowSpec to drop attack traffic at routers/PoPs.",
      "Simulated attack scenarios; evaluated ML-based detection accuracy vs time-to-mitigation.",
    ],
  },
  {
    company: "Hiossen Implant (U.S. division of Osstem Implant)",
    role: "Software Engineering Intern",
    when: "Jun 2025 – Sept 2025 · Englewood, NJ",
    bullets: [
      "Built reusable Three.js components for interactive dental lab simulations.",
      "Improved internal clinical support chatbot using RAG + few-shot prompting in Python/LangChain.",
      "Integrated 3D interfaces with ML services for procedural visuals + AI guidance.",
    ],
  },
  {
    company: "Dartmouth College",
    role: "Computer Science Teaching Assistant — CS50",
    when: "Sept 2024 – Present",
    bullets: [
      "Supported students building C programs on Linux.",
      "Debugged memory, file I/O, and socket-networking issues.",
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
  {
    name: "Languages",
    items: ["Python", "JavaScript", "C", "C++", "Java", "Kotlin"],
  },
  {
    name: "Systems / Backend",
    items: ["Node.js", "REST APIs", "Linux", "TCP/IP", "Sockets"],
  },
  {
    name: "Frontend / Viz",
    items: ["React", "React Three Fiber", "Three.js"],
  },
  {
    name: "ML / Data",
    items: ["NumPy", "scikit-learn", "LangChain", "RAG pipelines"],
  },
  { name: "Tools", items: ["Git", "Docker", "Bash"] },
];

export default function Page() {
  return (
    <main className="min-h-screen text-gray-900 bg-emerald-50">
      {/* leafy gradient header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-[380px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950" />
        </div>

        {/* faint leaf pattern */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[380px] -z-10 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(24px 24px at 16px 16px, rgba(34,197,94,0.25) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* NAV */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-emerald-50">
          <div className="inline-flex items-center gap-2 font-semibold">
            <Leaf className="h-5 w-5 text-emerald-300" />
            <span>{NAME}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">
              Projects
            </a>
            <a href="#experience" className="hover:underline underline-offset-4">
              Experience
            </a>
            <a href="#coursework" className="hover:underline underline-offset-4">
              Coursework
            </a>
            <a href="#skills" className="hover:underline underline-offset-4">
              Skills
            </a>
            <a href="#contact" className="hover:underline underline-offset-4">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary">
              <a href={RESUME_URL} target="_blank" rel="noreferrer">
                <FileText className="h-4 w-4 mr-2" />
                Resume
              </a>
            </Button>
            <Button asChild>
              <a href={`mailto:${EMAIL}`}>
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </a>
            </Button>
          </div>
        </div>

        {/* HERO */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-emerald-50">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {NAME}
            </h1>
            <p className="mt-2 text-lg/7 text-emerald-200">
              {ROLE} •{" "}
              <span className="inline-flex items-center">
                <MapPin className="h-4 w-4 mx-1" />
                {LOCATION}
              </span>
            </p>

            <p className="mt-5 max-w-3xl text-emerald-100">
              I build practical, fast software—mixing strong fundamentals with
              data-driven interfaces and ML-backed tooling. Recently I’ve worked
              on ad-analytics UIs with React/Three.js, DDoS mitigation research,
              and interactive clinical simulations.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-500 hover:bg-emerald-400">
                <a href={RESUME_URL} target="_blank" rel="noreferrer">
                  <FileText className="h-4 w-4 mr-2" />
                  View Resume
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${EMAIL}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
            </div>
          </motion.div>
        </header>
      </div>

      {/* PROJECTS */}
      <section
        id="projects"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12"
      >
        <SectionTitle icon={Code2} text="Projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Card
              key={p.title}
              className="rounded-2xl border-emerald-100 shadow-sm overflow-hidden"
            >
              {p.image && (
                <div className="relative w-full h-44">
                  <Image
                    src={p.image}
                    alt={p.imageAlt ?? p.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{p.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Pill key={t} text={t} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{p.impact}</p>
                {false && (
                  <a
                    className="inline-flex items-center text-sm underline underline-offset-4"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View repo <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <SectionTitle icon={Leaf} text="Experience" />
        <div className="space-y-4">
          {EXPERIENCE.map((e) => (
            <Card key={e.company} className="rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <CardTitle className="text-xl">
                    {e.role} • {e.company}
                  </CardTitle>
                  <span className="text-sm text-gray-500">{e.when}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* COURSEWORK */}
      <section
        id="coursework"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <SectionTitle icon={Leaf} text="Coursework" />
        <Card className="rounded-2xl">
          <CardContent className="py-5">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="font-medium mb-2">Completed</div>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.completed.map((c) => (
                    <Pill key={c} text={c} />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Currently taking</div>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.current.map((c) => (
                    <Pill key={c} text={c} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <SectionTitle icon={Leaf} text="Skills" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((g) => (
            <Card key={g.name} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{g.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <Pill key={i} text={i} />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <SectionTitle icon={Leaf} text="Contact" />
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href={`mailto:${EMAIL}`}>
              <Mail className="h-4 w-4 mr-2" />
              {EMAIL}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {NAME}. Built with Next.js + Tailwind.
      </footer>
    </main>
  );
}