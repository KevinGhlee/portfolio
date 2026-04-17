"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function RAGVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });

  const particleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 1, 1, 0],
      transition: { duration: 2, repeat: Infinity, ease: "linear" as const },
    },
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#111] flex items-center justify-center p-4"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full max-w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path id="path1" d="M 60 100 L 120 100" stroke="#333" strokeWidth="2" />
        <path id="path2" d="M 160 100 L 220 100" stroke="#333" strokeWidth="2" />
        <path id="path3" d="M 260 100 L 320 100" stroke="#333" strokeWidth="2" />

        {isInView && (
          <>
            <motion.path
              d="M 60 100 L 120 100"
              stroke="#5eead4"
              strokeWidth="2"
              strokeDasharray="4 4"
              variants={particleVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 160 100 L 220 100"
              stroke="#5eead4"
              strokeWidth="2"
              strokeDasharray="4 4"
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6, duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 260 100 L 320 100"
              stroke="#5eead4"
              strokeWidth="2"
              strokeDasharray="4 4"
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}

        <rect x="20" y="80" width="40" height="40" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
        <text x="40" y="104" fill="#888" fontSize="10" fontFamily="monospace" textAnchor="middle">DOC</text>

        <rect x="120" y="80" width="40" height="40" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
        <rect x="125" y="85" width="12" height="12" rx="2" fill="#333" />
        <rect x="143" y="85" width="12" height="12" rx="2" fill="#333" />
        <rect x="125" y="103" width="12" height="12" rx="2" fill="#333" />
        <rect x="143" y="103" width="12" height="12" rx="2" fill="#333" />

        <path d="M220 85 C220 75, 260 75, 260 85 L260 115 C260 125, 220 125, 220 115 Z" fill="#1a1a1a" stroke="#5eead4" strokeWidth="2" />
        <path d="M220 85 C220 95, 260 95, 260 85" stroke="#5eead4" strokeWidth="2" />
        <text x="240" y="108" fill="#5eead4" fontSize="10" fontFamily="monospace" textAnchor="middle">V-DB</text>

        <rect x="320" y="80" width="60" height="40" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
        <text x="350" y="104" fill="#fafafa" fontSize="12" fontFamily="monospace" textAnchor="middle">LLM</text>
      </svg>
    </div>
  );
}
