"use client";

import { useEffect, useRef, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useInView } from "framer-motion";

const data = [
  { time: "00:00", value: 120 },
  { time: "02:00", value: 180 },
  { time: "04:00", value: 150 },
  { time: "06:00", value: 250 },
  { time: "08:00", value: 400 },
  { time: "10:00", value: 650 },
  { time: "12:00", value: 800 },
  { time: "14:00", value: 750 },
  { time: "16:00", value: 900 },
  { time: "18:00", value: 850 },
  { time: "20:00", value: 600 },
  { time: "22:00", value: 300 },
];

function useCounter(end: number, duration: number, start = 0, isInView = false) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) {
      setCount(start);
      return;
    }
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * (end - start) + start));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isInView]);

  return count;
}

export function AnalyticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const pageviews = useCounter(12400, 2000, 0, isInView);
  const readers = useCounter(3200, 2000, 0, isInView);
  const time = useCounter(272, 2000, 0, isInView);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formatNumber = (num: number) =>
    num > 999 ? (num / 1000).toFixed(1) + "k" : num.toString();

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#111] p-4 md:p-6 flex flex-col gap-4"
    >
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-[#1a1a1a] border border-[#222] rounded p-2 md:p-3">
          <div className="text-[10px] text-[#888] font-mono mb-1">PAGEVIEWS</div>
          <div className="text-[14px] md:text-[18px] text-[#fafafa] font-medium">
            {formatNumber(pageviews)}
          </div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#222] rounded p-2 md:p-3">
          <div className="text-[10px] text-[#888] font-mono mb-1">READERS</div>
          <div className="text-[14px] md:text-[18px] text-[#fafafa] font-medium">
            {formatNumber(readers)}
          </div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#222] rounded p-2 md:p-3">
          <div className="text-[10px] text-[#888] font-mono mb-1">AVG TIME</div>
          <div className="text-[14px] md:text-[18px] text-[#5eead4] font-medium">
            {formatTime(time)}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#1a1a1a] border border-[#222] rounded p-2 relative">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5eead4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5eead4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={[0, 1000]} hide />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "4px", fontSize: "12px" }}
                itemStyle={{ color: "#5eead4" }}
                labelStyle={{ color: "#888", marginBottom: "4px" }}
                cursor={{ stroke: "#333", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#5eead4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
