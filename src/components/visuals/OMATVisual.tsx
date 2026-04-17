"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function OMATVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const points = [
      { x: 0.5, y: 0.5 },
      { x: 0.2, y: 0.3 },
      { x: 0.8, y: 0.7 },
      { x: 0.5, y: 0.5 },
      { x: 0.8, y: 0.2 },
      { x: 0.3, y: 0.8 },
    ];

    let currentPointIdx = 0;
    let currentPos = { x: points[0].x, y: points[0].y };
    let trail: { x: number; y: number; alpha: number }[] = [];
    let state = "fixation";
    let stateTimer = 0;
    let velDisplay = 0;
    let fixDisplay = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height);

      ctx.strokeStyle = "#222";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#333";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#444";
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.1, 0, Math.PI * 2);
      ctx.stroke();

      const target = points[currentPointIdx];
      const currentPx = {
        x: currentPos.x * canvas.width,
        y: currentPos.y * canvas.height,
      };

      if (state === "fixation") {
        stateTimer++;
        velDisplay = Math.max(0, velDisplay - 5);
        fixDisplay = stateTimer * 16;
        currentPos.x = target.x + (Math.random() - 0.5) * 0.005;
        currentPos.y = target.y + (Math.random() - 0.5) * 0.005;
        if (stateTimer > 60) {
          state = "saccade";
          currentPointIdx = (currentPointIdx + 1) % points.length;
          stateTimer = 0;
        }
      } else {
        const dx = target.x - currentPos.x;
        const dy = target.y - currentPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        velDisplay = dist * 1000;
        if (dist < 0.01) {
          state = "fixation";
          stateTimer = 0;
        } else {
          currentPos.x += dx * 0.2;
          currentPos.y += dy * 0.2;
        }
      }

      trail.push({ x: currentPx.x, y: currentPx.y, alpha: 1 });
      if (trail.length > 20) trail.shift();

      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.alpha -= 0.05;
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(94, 234, 212, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(currentPx.x, currentPx.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#5eead4";
      ctx.fill();

      ctx.fillStyle = "#1a1a1a";
      ctx.strokeStyle = "#222";
      ctx.fillRect(10, 10, 120, 45);
      ctx.strokeRect(10, 10, 120, 45);
      ctx.fillStyle = "#888";
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`VEL: ${Math.round(velDisplay)} °/s`, 20, 25);
      ctx.fillText(`FIX: ${Math.round(fixDisplay)} ms`, 20, 40);

      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#111] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
