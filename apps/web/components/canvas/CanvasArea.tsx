"use client";

import { useEffect, useRef } from "react";
import { CanvasDrawingProps } from "../../types/DrawingShapesTypes";
import { initSketch } from "@/drawingservice/DiffShapes";
  
export function CanvasDrawing({ roomId, Socket, canvasRef,toolRef , colorRef , strokeRef}:CanvasDrawingProps){

  console.log( "canvaszzzz",toolRef);
  console.log("jbjsbs" , colorRef);
  console.log("dbjbsjbcs" , strokeRef);



  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // reset transform before scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.lineWidth = 1;
    };

    setupCanvas();

    //  initial clear (fix first render issue)
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    initSketch(canvas, roomId, Socket ,toolRef, colorRef, strokeRef);  // pass tool id then render drawing

    const handleResize = () => {
      setupCanvas();
      initSketch(canvas, roomId, Socket); // redraw shapes
    };

    window.addEventListener("resize", handleResize);

    initialized.current = true;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, roomId, Socket]);


  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}