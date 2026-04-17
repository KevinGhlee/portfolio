"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }
    resize();

    const spacing = 30;
    const baseRadius = 1.5;
    const maxRadius = 3;
    const interactionRadius = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          let radius = baseRadius;
          let opacity = 0.15;
          let color = "#333333";

          if (!isMobile) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < interactionRadius) {
              const factor = 1 - distance / interactionRadius;
              radius = baseRadius + (maxRadius - baseRadius) * factor;
              opacity = 0.15 + (0.4 - 0.15) * factor;
              if (factor > 0.2) {
                color = `rgba(94, 234, 212, ${opacity})`;
              } else {
                color = `rgba(51, 51, 51, ${opacity})`;
              }
            } else {
              color = `rgba(51, 51, 51, ${opacity})`;
            }
          } else {
            color = `rgba(51, 51, 51, ${opacity})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
