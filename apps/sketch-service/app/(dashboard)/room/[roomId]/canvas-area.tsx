"use client";
import { useEffect, useRef } from "react";
import { Sketch } from "@/drawlogic/DiffShapes";

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);

      // smooth lines
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;
    };

    setupCanvas();
    Sketch(canvas); 

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    initialized.current = true;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}