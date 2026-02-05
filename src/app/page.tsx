'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RESUME_URL = '/Kevin_Lee_RESUME.pdf?v=2';

type Project = {
  title: string;
  blurb: string;
  image: string;        // path under /public
  tags: string[];
  repo?: string;        // optional repo/demo link
};

const PROJECTS: Project[] = [
  {
    title: 'OMAT — OculoMotor Assessment Tool',
    blurb:
      'Android app + web backend to capture oculomotor metrics (saccades, vergence, accommodation) and help clinicians track concussion recovery. I built the mobile data capture, organized datasets, and contributed to the web UI.',
    image: '/omat.jpg',
    tags: ['Kotlin', 'Flask/Web', 'Data', 'Health'],
    repo: undefined, // add later if public
  },
  {
    title: 'Real-Time Posture Tracking (Turtleneck Prevention)',
    blurb:
      'At-home head/neck posture monitor using device gyroscope and image processing. I built the web server + interface, designed angle-based thresholds from literature to flag forward-head posture, and started an ML fusion path.',
    image: '/posture.jpg',
    tags: ['Web', 'Sensors', 'Visualization', 'ML (in-progress)'],
    repo: undefined, // add later if public
  },
];

const SKILLS: Record<string, string[]> = {
  Languages: ['Python', 'C/C++', 'Java', 'Kotlin', 'TypeScript/JavaScript'],
  Frameworks: ['Next.js', 'React', 'Tailwind', 'Flask'],
  Systems: ['Git/GitHub', 'Linux', 'Networking & DDoS basics'],
  Data: ['Pandas', 'NumPy', 'scikit-learn (basics)'],
};

const COURSEWORK = [
  'CS 10 (OOP)',
  'CS 30 (Discrete Math)',
  'CS 31 (Algorithms)',
  'CS 50 (Software Implementation)',
  'CS 69 (Cybersecurity)',
  'CS 74 (Machine Learning)',
  'CS 52 (Full-Stack)',
  'Math 32 (Knot Theory)',
];

function ExternalLink(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { href, children, className } = props;
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <main className="container py-10 space-y-12">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Kevin Lee</h1>
          <p className="mt-2 text-muted-foreground">
            Dartmouth College — B.S. in Computer Science • Hanover, NH
          </p>
          <p className="mt-2 max-w-2xl">
            I’m a problem-solver who enjoys building clean, fast software and
            applying ML when it genuinely helps. I also make time for art
            (drawing, photography) and music (piano/composition)—the craft side
            keeps my engineering thoughtful.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <a href={RESUME_URL}>
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </Button>
            <Button asChild variant="secondary">
              <ExternalLink href="https://github.com/KevinGhlee">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </ExternalLink>
            </Button>
            <Button asChild variant="secondary">
              <ExternalLink href="https://www.linkedin.com/in/kevinghlee/">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </ExternalLink>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:kevin.ghlee@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </div>

        {/* Simple nav */}
        <nav className="hidden sm:flex gap-5 pt-2 text-sm">
          <Link href="#projects" className="hover:underline">
            Projects
          </Link>
          <Link href="#skills" className="hover:underline">
            Skills
          </Link>
          <Link href="#education" className="hover:underline">
            Education
          </Link>
          <a className="hover:underline" href={RESUME_URL}>
            Resume
          </a>
          <a className="hover:underline" href="mailto:kevin.ghlee@gmail.com">
            Contact
          </a>
        </nav>
      </header>

      {/* Projects */}
      <section id="projects" className="space-y-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  {p.repo && (
                    <div className="pt-2">
                      <ExternalLink
                        href={p.repo}
                        className="text-sm underline underline-offset-4"
                      >
                        View repo
                      </ExternalLink>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="space-y-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(SKILLS).map(([group, items]) => (
            <Card key={group}>
              <CardContent className="p-5">
                <h3 className="font-medium">{group}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {items.join(' • ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="space-y-2">
        <h2 className="text-2xl font-semibold">Education</h2>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dartmouth College</p>
                <p className="text-sm text-muted-foreground">
                  B.S. in Computer Science • Relevant Coursework:
                </p>
              </div>
            </div>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 text-sm">
              {COURSEWORK.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <footer className="pt-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kevin Lee
      </footer>
    </main>
  );
}