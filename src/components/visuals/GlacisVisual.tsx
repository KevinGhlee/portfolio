"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  label: string;
  type: "server" | "edge" | "attacker";
  status: "ok" | "attacked" | "blocked";
  pulse: number;
}

interface Packet {
  x: number;
  y: number;
  tx: number;
  ty: number;
  progress: number;
  blocked: boolean;
  color: string;
}

export function GlacisVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const W = () => canvas.width;
    const H = () => canvas.height;

    const nodes: Node[] = [
      { x: 0.5, y: 0.25, label: "EDGE NODE", type: "edge", status: "ok", pulse: 0 },
      { x: 0.22, y: 0.62, label: "GAME SRV 01", type: "server", status: "ok", pulse: 0.3 },
      { x: 0.5, y: 0.72, label: "GAME SRV 02", type: "server", status: "ok", pulse: 0.6 },
      { x: 0.78, y: 0.62, label: "GAME SRV 03", type: "server", status: "ok", pulse: 0.9 },
      { x: 0.15, y: 0.15, label: "ATK", type: "attacker", status: "blocked", pulse: 0 },
      { x: 0.85, y: 0.15, label: "ATK", type: "attacker", status: "blocked", pulse: 0 },
    ];

    const packets: Packet[] = [];
    let lastSpawn = 0;

    const spawnPacket = () => {
      const attackers = [4, 5];
      const src = attackers[Math.floor(Math.random() * attackers.length)];
      const blocked = Math.random() > 0.25;
      const target = blocked ? 0 : 1 + Math.floor(Math.random() * 3);

      packets.push({
        x: nodes[src].x,
        y: nodes[src].y,
        tx: nodes[target].x,
        ty: nodes[target].y,
        progress: 0,
        blocked,
        color: blocked ? "#ef4444" : "#f97316",
      });
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

    const draw = (timestamp: number) => {
      t = timestamp / 1000;

      if (timestamp - lastSpawn > 700 + Math.random() * 500) {
        spawnPacket();
        lastSpawn = timestamp;
      }

      ctx.clearRect(0, 0, W(), H());

      // Background grid
      ctx.strokeStyle = "rgba(94,234,212,0.04)";
      ctx.lineWidth = 1;
      const gridStep = Math.min(W(), H()) / 8;
      for (let gx = 0; gx < W(); gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H());
        ctx.stroke();
      }
      for (let gy = 0; gy < H(); gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W(), gy);
        ctx.stroke();
      }

      // Edges between nodes (infrastructure)
      const edges = [
        [0, 1], [0, 2], [0, 3],
      ];
      edges.forEach(([a, b]) => {
        const nx = (n: Node) => n.x * W();
        const ny = (n: Node) => n.y * H();
        const gradient = ctx.createLinearGradient(
          nx(nodes[a]), ny(nodes[a]), nx(nodes[b]), ny(nodes[b])
        );
        gradient.addColorStop(0, "rgba(94,234,212,0.25)");
        gradient.addColorStop(1, "rgba(94,234,212,0.08)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(nx(nodes[a]), ny(nodes[a]));
        ctx.lineTo(nx(nodes[b]), ny(nodes[b]));
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Attacker dashed lines (threat vectors)
      [4, 5].forEach((ai) => {
        const ax = nodes[ai].x * W();
        const ay = nodes[ai].y * H();
        const ex = nodes[0].x * W();
        const ey = nodes[0].y * H();
        ctx.strokeStyle = "rgba(239,68,68,0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 8]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Animate packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += 0.018;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const eased = easeOut(Math.min(p.progress, 1));
        const cx = p.x * W() + (p.tx - p.x) * W() * eased;
        const cy = p.y * H() + (p.ty - p.y) * H() * eased;

        // Block flash at edge node
        if (p.blocked && p.progress > 0.55 && p.progress < 0.7) {
          const ex = nodes[0].x * W();
          const ey = nodes[0].y * H();
          const flash = 1 - Math.abs(p.progress - 0.625) / 0.075;
          ctx.beginPath();
          ctx.arc(ex, ey, 14 * flash, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239,68,68,${0.3 * flash})`;
          ctx.fill();
        }

        const alpha = p.blocked && p.progress > 0.6 ? (1 - (p.progress - 0.6) / 0.4) : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.blocked
          ? `rgba(239,68,68,${alpha})`
          : `rgba(249,115,22,${alpha})`;
        ctx.fill();

        // Tail
        ctx.beginPath();
        const tailT = Math.max(0, p.progress - 0.08);
        const tailEased = easeOut(Math.min(tailT, 1));
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          p.x * W() + (p.tx - p.x) * W() * tailEased,
          p.y * H() + (p.ty - p.y) * H() * tailEased,
        );
        ctx.strokeStyle = p.blocked
          ? `rgba(239,68,68,${alpha * 0.4})`
          : `rgba(249,115,22,${alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const nx = node.x * W();
        const ny = node.y * H();
        const pulse = (Math.sin(t * 1.5 + node.pulse * Math.PI * 2) * 0.5 + 0.5);

        if (node.type === "attacker") {
          ctx.beginPath();
          const s = 5;
          ctx.moveTo(nx, ny - s);
          ctx.lineTo(nx + s, ny + s);
          ctx.lineTo(nx - s, ny + s);
          ctx.closePath();
          ctx.fillStyle = "rgba(239,68,68,0.7)";
          ctx.fill();
          ctx.strokeStyle = "rgba(239,68,68,0.9)";
          ctx.lineWidth = 1;
          ctx.stroke();
          return;
        }

        const isEdge = node.type === "edge";
        const r = isEdge ? 8 : 6;
        const color = isEdge ? "#5eead4" : "#94a3b8";

        // Pulse ring
        if (isEdge) {
          ctx.beginPath();
          ctx.arc(nx, ny, r + 6 + pulse * 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(94,234,212,${0.15 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = isEdge ? "rgba(94,234,212,0.15)" : "rgba(30,41,59,0.8)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isEdge ? 2 : 1.5;
        ctx.stroke();

        // Label
        ctx.font = `${isEdge ? 9 : 8}px "JetBrains Mono", monospace`;
        ctx.fillStyle = isEdge ? "#5eead4" : "#64748b";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + r + 12);
      });

      // HUD overlay
      const hudY = H() - 32;
      const statuses = [
        { label: "BAF", value: "1.0x", color: "#5eead4" },
        { label: "BLOCKED", value: `${Math.floor(t * 1.1) % 99 + 40}`, color: "#ef4444" },
        { label: "UPTIME", value: "99.9%", color: "#5eead4" },
      ];
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = "left";
      statuses.forEach((s, i) => {
        const sx = 12 + i * (W() / 3.2);
        ctx.fillStyle = "rgba(30,41,59,0.7)";
        ctx.fillRect(sx - 4, hudY - 14, W() / 3.5, 22);
        ctx.fillStyle = "#475569";
        ctx.fillText(s.label, sx, hudY - 2);
        ctx.fillStyle = s.color;
        ctx.fillText(s.value, sx, hudY + 10);
      });

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
