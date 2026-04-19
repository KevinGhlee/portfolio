"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";

const RESUME_URL = "/resume/Kevin_Geonhun_Lee_Resume.pdf";
const GITHUB_URL = "https://github.com/KevinGhlee";
const LINKEDIN_URL = "https://www.linkedin.com/in/kevin-ghlee";
const EMAIL = "kevin.ghlee@gmail.com";

export function Footer() {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const time = timing.loadEventEnd - timing.navigationStart;
        setLoadTime(time > 0 ? time : Math.round(performance.now()));
      }
    }, 0);

    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-[#222] mt-24 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <div className="text-[13px] text-[#888] font-mono">
            Kevin Geonhun Lee · 2026
          </div>
          <div className="flex gap-4">
            <div className="text-[10px] text-[#444] font-mono">
              Hanover, NH · {timeStr}
            </div>
            {loadTime !== null && (
              <div className="text-[10px] text-[#444] font-mono hidden md:block">
                Loaded in {loadTime}ms
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px]">
          <MagneticButton>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#888] hover:text-[#5eead4] transition-colors duration-200 block py-2"
            >
              Email
            </a>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
