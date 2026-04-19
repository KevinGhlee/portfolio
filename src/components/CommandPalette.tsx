"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Mail, Github, Activity, ArrowRight } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    {
      id: "resume",
      title: "View Resume",
      icon: FileText,
      action: () => window.open("/resume/Kevin_Geonhun_Lee_Resume.pdf", "_blank"),
    },
    {
      id: "email",
      title: "Copy Email",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("kevin.ghlee@gmail.com");
      },
    },
    {
      id: "source",
      title: "View Source",
      icon: Github,
      action: () => window.open("https://github.com/KevinGhlee", "_blank"),
    },
    {
      id: "lighthouse",
      title: "Run Lighthouse",
      icon: Activity,
      action: () => window.open("https://pagespeed.web.dev/", "_blank"),
    },
    {
      id: "projects",
      title: "Go to Projects",
      icon: ArrowRight,
      action: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#111] border border-[#333] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-[#222]">
              <Search className="w-4 h-4 text-[#888]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none text-[#fafafa] text-[14px] px-3 py-4 focus:outline-none placeholder:text-[#888]"
              />
              <div className="flex items-center gap-1">
                <kbd className="bg-[#222] text-[#888] text-[10px] font-mono px-1.5 py-0.5 rounded">
                  ESC
                </kbd>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="text-center text-[#888] text-[13px] py-8">
                  No results found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      selectedIndex === idx
                        ? "bg-accent/10 text-accent"
                        : "text-[#888] hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <cmd.icon className="w-4 h-4" />
                    <span className="text-[13px] font-medium">{cmd.title}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
