"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function DDoSVisual() {
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
    let packets: { x: number; y: number; isAttack: boolean; speed: number; id: number; blockTime?: number }[] = [];
    let packetIdCounter = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const layer1X = canvas.width * 0.25;
    const layer2X = canvas.width * 0.5;
    const layer3X = canvas.width * 0.75;

    const spawnPacket = () => {
      packets.push({
        id: packetIdCounter++,
        x: 0,
        y: canvas.height * 0.2 + Math.random() * (canvas.height * 0.6),
        isAttack: Math.random() > 0.6,
        speed: 1 + Math.random() * 1.5,
      });
    };

    let lastSpawnTime = 0;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#222";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      ctx.fillStyle = "#1a1a1a";
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.fillRect(layer1X - 10, 20, 20, canvas.height - 40);
      ctx.strokeRect(layer1X - 10, 20, 20, canvas.height - 40);
      ctx.fillRect(layer2X - 10, 20, 20, canvas.height - 40);
      ctx.strokeRect(layer2X - 10, 20, 20, canvas.height - 40);
      ctx.fillStyle = "#1a1a1a";
      ctx.strokeStyle = "#5eead4";
      ctx.fillRect(layer3X - 10, 20, 20, canvas.height - 40);
      ctx.strokeRect(layer3X - 10, 20, 20, canvas.height - 40);

      ctx.fillStyle = "#888";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Ingress", layer1X, canvas.height - 10);
      ctx.fillText("Entropy", layer2X, canvas.height - 10);
      ctx.fillStyle = "#5eead4";
      ctx.fillText("SDN Filter", layer3X, canvas.height - 10);

      if (timestamp - lastSpawnTime > 300) {
        spawnPacket();
        lastSpawnTime = timestamp;
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.x += p.speed;
        let color = "#888";
        let radius = 3;
        let opacity = 1;

        if (p.isAttack) {
          if (p.x > layer2X && p.x < layer3X) {
            color = "#ef4444";
          } else if (p.x >= layer3X) {
            p.speed = 0;
            if (p.blockTime === undefined) p.blockTime = timestamp;
            opacity = Math.max(0, 1 - (timestamp - p.blockTime) / 500);
            color = "#ef4444";
            radius = 3 + (1 - opacity) * 5;
            if (opacity <= 0) {
              packets.splice(i, 1);
              continue;
            }
          }
        } else {
          if (p.x > layer3X) {
            color = "#5eead4";
          }
        }

        if (p.x > canvas.width) {
          packets.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

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
