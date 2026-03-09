"use client";
import { useEffect, useRef } from "react";

export function LiveSketchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const pathsRef  = useRef<any[]>([]);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // warm amber/dark palette — readable on cream bg
    const colors = ["#C8860A", "#E6A800", "#A66800", "#1a1a1a", "#D4920A"];

    const generatePaths = () => {
      pathsRef.current = [];

      // freehand curves
      for (let i = 0; i < 6; i++) {
        const pts: { x: number; y: number }[] = [];
        const cx = 60 + Math.random() * (canvas.width  - 120);
        const cy = 60 + Math.random() * (canvas.height - 120);
        for (let s = 0; s < 22 + Math.floor(Math.random() * 18); s++) {
          pts.push({
            x: cx + (Math.random() - 0.5) * 160,
            y: cy + (Math.random() - 0.5) * 110,
          });
        }
        pathsRef.current.push({ type: "free", pts, color: colors[Math.floor(Math.random() * colors.length)], width: Math.random() * 1.8 + 0.5, alpha: 0.18 + Math.random() * 0.32, progress: 0, delay: i * 55 });
      }

      // circles
      for (let i = 0; i < 3; i++) {
        pathsRef.current.push({ type: "circle", cx: 80 + Math.random() * (canvas.width - 160), cy: 80 + Math.random() * (canvas.height - 160), r: 28 + Math.random() * 55, color: colors[Math.floor(Math.random() * colors.length)], width: 1, alpha: 0.11 + Math.random() * 0.2, progress: 0, delay: 200 + i * 80 });
      }

      // horizontal rule strokes
      for (let i = 0; i < 7; i++) {
        const y = 40 + i * (canvas.height / 8);
        pathsRef.current.push({ type: "line", x1: 20 + Math.random() * 30, y1: y, x2: canvas.width * 0.25 + Math.random() * canvas.width * 0.45, y2: y + (Math.random() - 0.5) * 8, color: colors[Math.floor(Math.random() * colors.length)], width: 0.8 + Math.random() * 0.8, alpha: 0.06 + Math.random() * 0.10, progress: 0, delay: 280 + i * 28 });
      }
    };

    generatePaths();

    const draw = () => {
      frameRef.current++;
      // very slow fade so trails dissolve gently on cream
      ctx.fillStyle = "rgba(248,246,241,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pathsRef.current.forEach((path) => {
        if (frameRef.current < path.delay) return;
        const localFrame = frameRef.current - path.delay;
        path.progress = Math.min(1, path.progress + 0.016);
        ctx.save();
        ctx.globalAlpha = path.alpha * Math.min(1, localFrame / 28);

        if (path.type === "free") {
          const end = Math.floor(path.progress * path.pts.length);
          if (end < 2) { ctx.restore(); return; }
          ctx.beginPath();
          ctx.strokeStyle = path.color;
          ctx.lineWidth   = path.width;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.moveTo(path.pts[0].x, path.pts[0].y);
          for (let i = 1; i < end; i++) ctx.lineTo(path.pts[i].x, path.pts[i].y);
          ctx.stroke();
          if (path.progress < 1) {
            ctx.beginPath();
            ctx.arc(path.pts[end - 1].x, path.pts[end - 1].y, 3, 0, Math.PI * 2);
            ctx.fillStyle  = path.color;
            ctx.globalAlpha = 0.75;
            ctx.fill();
          }
        } else if (path.type === "circle") {
          ctx.beginPath();
          ctx.arc(path.cx, path.cy, path.r, 0, Math.PI * 2 * path.progress);
          ctx.strokeStyle = path.color;
          ctx.lineWidth   = path.width;
          ctx.stroke();
        } else if (path.type === "line") {
          const ex = path.x1 + (path.x2 - path.x1) * path.progress;
          const ey = path.y1 + (path.y2 - path.y1) * path.progress;
          ctx.beginPath();
          ctx.moveTo(path.x1, path.y1);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = path.color;
          ctx.lineWidth   = path.width;
          ctx.stroke();
        }
        ctx.restore();
      });

      if (pathsRef.current.every((p) => p.progress >= 1) && frameRef.current > 560) {
        frameRef.current = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        generatePaths();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
