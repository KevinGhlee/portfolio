"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function Dot({
  position,
  scrollProgress,
  index,
}: {
  position: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const opacity = useTransform(
    scrollProgress,
    [position - 0.1, position],
    [0.3, 1]
  );
  const scale = useTransform(
    scrollProgress,
    [position - 0.1, position],
    [1, 1.5]
  );
  const backgroundColor = useTransform(
    scrollProgress,
    [position - 0.1, position],
    ["#444", "#5eead4"]
  );

  return (
    <motion.button
      onClick={() => {
        const el = document.getElementById(`project-${index + 1}`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
      className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full cursor-pointer"
      style={{
        top: `${position * 100}%`,
        opacity,
        scale,
        backgroundColor,
      }}
      whileHover={{ scale: 2 }}
    />
  );
}

export function ScrollProgress() {
  const [isMobile, setIsMobile] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) return null;

  const dots = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 h-[300px] w-[2px] bg-[#222] z-40 hidden xl:block">
      <motion.div
        className="absolute top-0 left-0 w-full bg-accent origin-top"
        style={{ scaleY }}
      />
      {dots.map((pos, i) => (
        <Dot
          key={i}
          position={pos}
          scrollProgress={scrollYProgress}
          index={i}
        />
      ))}
    </div>
  );
}
