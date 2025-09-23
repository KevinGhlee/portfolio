"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText, ExternalLink, MapPin, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ====== PERSONALIZE ======
const NAME = "Kevin Lee";
const ROLE = "Dartmouth College — B.S. Computer Science";
const LOCATION = "Hanover, NH";
const EMAIL = "kevin.ghlee@gmail.com";
const RESUME_URL = "/Kevin_Lee_Resume_2025.pdf"; // make sure this file is in /public
const GITHUB_URL = "https://github.com/KevinGhlee";
const LINKEDIN_URL = "https://www.linkedin.com/in/kevinghlee"; // change if your resume uses a different slug

// ====== SKILLS ======
const SKILLS = ["Python", "Java", "Kotlin", "JavaScript", "HTML", "CSS", "Excel"];

// ----- Types -----
type Project = {
  title: string;
  blurb: string;
  tags: string[];
  impact: string;
  image?: string;
  imageAlt?: string;
  link?: string;
};

// ====== PROJECTS ======
const PROJECTS: Project[] = [
  {
    title: "OMAT — OculoMotor Assessment Tool",
    blurb:
      "The OculoMotor Assessment Tool (OMAT) is a standardized clinical tool that measures eye movements (saccades, vergence) and binocular vision functions (e.g., accommodative amplitude, near-point of convergence). It provides normative data for clinicians to assess vision, particularly in patients recovering from concussion-related symptoms.",
    tags: ["Kotlin", "Android", "Web Frontend", "Data"],
    impact:
      "My role: organized and cleaned datasets, developed a Kotlin Android app to capture oculomotor metrics, and built parts of the website frontend. I also added timed outputs and categorization features to improve clinician workflows and speed up evaluations.",
    image: "/omat.jpg",
    imageAlt: "OMAT concussion assessment device",
  },
  {
    title: "Real-Time Posture Tracking (Turtleneck Prevention)",
    blurb:
      "This system uses device gyroscope sensors and image processing to monitor head/neck posture in real time. It applies research-based angle thresholds to identify forward-head posture ('turtleneck') and provides at-home screening feedback.",
    tags: ["Web Server", "JavaScript", "Sensors", "Image Processing", "Data"],
    impact:
      "My role: built the web server and interface to collect and organize posture data; defined criteria and angle-based categories from research literature; currently extending the system with machine learning models for more accurate classification.",
    image: "/posture.jpg",
    imageAlt: "Spinal posture illustration",
  },
  {
    title: "Emergency Evacuation Guide System (Ultrasonic Data Transmission)",
    blurb:
      "A resilience-focused alerting system that transmits guidance via ultrasonic sound when internet or power is unavailable. Implements digital modulation and signal processing to deliver short messages and instructions that are robust to noise.",
    tags: ["Ultrasonic", "Signal Processing", "Embedded", "Reliability"],
    impact:
      "My role: designed the transmission/decoding pipeline, tuned thresholds for noisy environments, and evaluated latency and decoding accuracy; explored speaker/mic constraints for low-cost deployments.",
    image: "/evacuation.jpg", // optional thumbnail in /public
    imageAlt: "Evacuation system concept image",
    // link: "https://github.com/KevinGhlee/evacuation-system"
  },
];

// ====== EXPERIENCE ======
const EXPERIENCE = [
  {
    company: "Hiossen Implant",
    role: "Accounting/Software Intern",
    when: "Dec 2024 – Jan 2025 · Englewood, NJ",
    points: [
      "Organized & verified ~3 years of journal entries to prep internal audit.",
      "Built a software flow that streamlined scanning/organization and cut manual processing time.",
    ],
  },
  {
    company: "Dartmouth CS Dept.",
    role: "Teaching Assistant, COSC 10 (OOP in Java)",
    when: "Sep 2024 – Present · Hanover, NH",
    points: [
      "Graded assignments/exams and supported students during office hours.",
      "Reviewed core data structures, algorithms, and debugging practices.",
    ],
  },
];

// ====== EDUCATION ======
const EDUCATION = [
  {
    school: "Dartmouth College",
    degree: "B.S. in Computer Science",
    when: "Sep 2023 – Present · Hanover, NH",
    items: ["Relevant: Data Structures, Algorithms, Databases, OOP, AI/ML, Systems/OS, HCI"],
  },
];

function Pill({ text }: { text: string }) {
  return <Badge className="rounded-full px-3 py-1 text-sm">{text}</Badge>;
}

export default function Page() {
  return (
    <main className="min-h-screen text-gray-900">
      {/* NAV */}
      <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{NAME}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#experience" className="hover:underline underline-offset-4">Experience</a>
            <a href="#skills" className="hover:underline underline-offset-4">Skills</a>
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary">
              <a href={RESUME_URL} target="_blank" rel="noreferrer"><FileText className="h-4 w-4 mr-2" />Resume</a>
            </Button>
            <Button asChild>
              <a href={`mailto:${EMAIL}`}><Mail className="h-4 w-4 mr-2" />Contact</a>
            </Button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header id="home" className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{NAME}</h1>
            <p className="mt-2 text-lg text-gray-600">
              {ROLE} • <span className="inline-flex items-center"><MapPin className="h-4 w-4 mx-1" />{LOCATION}</span>
            </p>

            {/* Intro blurb */}
            <div className="mt-6">
              <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
                I’m a <span className="font-medium">problem solver</span> who enjoys building software and applying
                machine-learning concepts to real-world problems. I currently study Computer Science at
                <span className="font-medium"> Dartmouth College</span>. Beyond tech, I love art in many forms—drawing,
                photography—and I play piano (sometimes composing). I’m always learning new tools and turning ideas into
                polished projects.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <a href={RESUME_URL} target="_blank" rel="noreferrer"><FileText className="h-4 w-4 mr-2" />View Resume</a>
              </Button>
              <Button asChild variant="secondary">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-2" />GitHub</a>
              </Button>
              <Button asChild variant="secondary">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${EMAIL}`}><Mail className="h-4 w-4 mr-2" />Email</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-5 w-5" /><h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="rounded-2xl shadow-sm overflow-hidden">
              {p.image && (
                <div className="relative w-full h-44">
                  <Image src={p.image} alt={p.imageAlt ?? p.title} fill className="object-cover" priority />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{p.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => <Pill key={t} text={t} />)}
                </div>
                <div className="text-sm text-gray-500">{p.impact}</div>
                {p.link ? (
                  <div className="pt-1">
                    <a className="inline-flex items-center text-sm underline underline-offset-4" href={p.link} target="_blank" rel="noreferrer">
                      View repo <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <div className="space-y-4">
          {EXPERIENCE.map((e) => (
            <Card key={e.company} className="rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <CardTitle className="text-xl">{e.role} • {e.company}</CardTitle>
                  <span className="text-sm text-gray-500">{e.when}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => <Pill key={s} text={s} />)}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {EDUCATION.map((ed) => (
            <Card key={ed.school} className="rounded-2xl">
              <CardHeader><CardTitle>{ed.school}</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="text-gray-700">{ed.degree}</div>
                <div className="text-sm text-gray-500">{ed.when}</div>
                <ul className="list-disc pl-5 text-gray-700">
                  {ed.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="default"><a href={`mailto:${EMAIL}`}><Mail className="h-4 w-4 mr-2" />Email</a></Button>
          <Button asChild variant="secondary"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-2" />GitHub</a></Button>
          <Button asChild variant="secondary"><a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</a></Button>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {NAME}. Built with Next.js + Tailwind.
      </footer>
    </main>
  );
}
