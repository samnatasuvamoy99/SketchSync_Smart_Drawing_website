
// "use client"
// import { useEffect,useRef } from 'react';
// import { CanvasProps } from '../../types/DrawingShapesTypes';
// import { initSketch } from '@/drawservice/DiffShapes';




// export function CanvasDrawing( {roomId,Socket,canvasRef}:CanvasProps){

//   const initialized = useRef(false);
//   useEffect(() => {

//     if (initialized.current) return;


//      if (!canvasRef?.current) return;


//     const canvas = canvasRef.current; // ref the current shapes from canvas

//     if (!canvas) return;

//     const setupCanvas = () => {

//       //canvas display setting
//       const dpr = window.devicePixelRatio || 1;
//       const rect = canvas.getBoundingClientRect();

//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;

//       const ctx = canvas.getContext("2d",{ willReadFrequently: true });
//       if (!ctx) return;

//       ctx.scale(dpr, dpr);

//       // smooth lines
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.imageSmoothingEnabled = true;//
//       ctx.lineWidth = 1;
//     };

//     setupCanvas();
//     initSketch(canvas,roomId ,Socket );  //for diff types of shapes  

//     const handleResize = () => {
//       setupCanvas();
//     };

//     if (initialized.current) return;

//     window.addEventListener("resize", handleResize);

//     initialized.current = true;

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [canvasRef,, roomId, Socket]);

// //   return (
// //   <div className="w-full h-full">
// //     <canvas
// //       ref={canvasRef}
// //       className="w-full h-full block"
// //     />
// //   </div>
// // );

// return ( <canvas ref={canvasRef} className="w-full h-full" /> );
// }


"use client";

import { useEffect, useRef } from "react";
import { CanvasProps } from "../../types/DrawingShapesTypes";
import { initSketch } from "@/drawingservice/DiffShapes";

export function CanvasDrawing({ roomId, Socket, canvasRef }: CanvasProps) {
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

    initSketch(canvas, roomId, Socket);

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