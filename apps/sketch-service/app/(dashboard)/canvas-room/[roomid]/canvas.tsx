"use client";

import { useEffect, useState, useRef } from "react";
import { Sketch } from "@/draw-logic";
import { SketchNavbar} from "@/components/layout/navbar"
export default function Canvas() {
  // ref for Dom

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 })

  //useEffect Runs after the component mounts.
  useEffect(() => {
      setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    //mounts logic

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      Sketch(canvas);

    }

  }, [canvasRef])



  return <div>
        <SketchNavbar/>
    <canvas ref={canvasRef} width={size.width} height={size.height}>

    </canvas>
  </div>
}
