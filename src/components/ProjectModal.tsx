"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";

export interface ModalLink {
  label: string;
  url: string;
  icon?: "external" | "pdf";
}

export interface ProjectModalData {
  name: string;
  context: string;
  overview: string;
  highlights: string[];
  links?: ModalLink[];
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  // lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#0a0a0a]/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111] border border-[#333] rounded-2xl shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-1.5 rounded-lg text-[#888] hover:text-[#fafafa] hover:bg-[#222] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#5eead4] mb-2">
                  {project.context}
                </p>
                <h2 className="text-[22px] md:text-[26px] font-medium text-[#fafafa] leading-snug">
                  {project.name}
                </h2>
              </div>

              {/* Divider */}
              <div className="border-t border-[#222] mb-6" />

              {/* Overview */}
              <p className="text-[14px] text-[#aaa] leading-relaxed mb-6 whitespace-pre-line">
                {project.overview}
              </p>

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-[#888]">
                      <span className="text-[#5eead4] mt-0.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#333] bg-[#1a1a1a] text-[13px] text-[#888] hover:text-[#5eead4] hover:border-[#5eead4]/40 transition-all duration-200"
                    >
                      {link.icon === "pdf" ? (
                        <FileText className="w-3.5 h-3.5" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5" />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
