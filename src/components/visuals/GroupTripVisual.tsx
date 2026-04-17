"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function GroupTripVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }

    let timer1: ReturnType<typeof setTimeout>,
      timer2: ReturnType<typeof setTimeout>,
      timer3: ReturnType<typeof setTimeout>,
      timer4: ReturnType<typeof setTimeout>;

    const runSequence = () => {
      setStep(1);
      timer1 = setTimeout(() => setStep(2), 1000);
      timer2 = setTimeout(() => setStep(3), 2500);
      timer3 = setTimeout(() => setStep(4), 3000);
      timer4 = setTimeout(() => {
        setStep(0);
        runSequence();
      }, 7000);
    };
    runSequence();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#111] p-4 md:p-6 flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center gap-3 border-b border-[#222] pb-3 mb-4 shrink-0">
        <div className="w-6 h-6 rounded-full bg-[#5eead4]/20 flex items-center justify-center border border-[#5eead4]/30">
          <span className="text-[8px] text-[#5eead4] font-mono">AI</span>
        </div>
        <div className="text-[12px] font-medium text-[#fafafa]">Trip Planner</div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-end max-w-[85%] bg-[#222] text-[#fafafa] text-[12px] p-3 rounded-lg rounded-tr-none"
            >
              Plan a 5-day trip to Tokyo for 4 friends
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-start bg-transparent border border-[#333] p-3 rounded-lg rounded-tl-none flex gap-1"
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay }}
                  className="w-1.5 h-1.5 bg-[#888] rounded-full"
                />
              ))}
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="self-start max-w-[90%] flex flex-col gap-2"
            >
              <div className="text-[12px] text-[#888] ml-1">
                Here&apos;s your personalized itinerary:
              </div>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3 w-full"
                >
                  <div className="text-[11px] font-mono text-[#5eead4] mb-2">
                    DAY 1: SHINJUKU
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <div className="w-1 h-1 rounded-full bg-[#888]" />
                      <div className="h-2 w-24 bg-[#333] rounded" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-1 h-1 rounded-full bg-[#888]" />
                      <div className="h-2 w-32 bg-[#333] rounded" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
