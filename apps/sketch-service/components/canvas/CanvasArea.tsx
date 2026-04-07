
"use client"
import { useEffect,useRef } from 'react';
import { CanvasProps } from '../../types/DrawingShapesTypes';
import { initSketch } from '@/drawservice/DiffShapes';




export function CanvasDrawing( {roomId,Socket,canvasRef}:CanvasProps){

  const initialized = useRef(false);
  useEffect(() => {

    if (initialized.current) return;


     if (!canvasRef?.current) return;


    const canvas = canvasRef.current; // ref the current shapes from canvas

    if (!canvas) return;

    const setupCanvas = () => {

      //canvas display setting
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
    initSketch(canvas,roomId ,Socket );  //for diff types of shapes  

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    initialized.current = true;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}