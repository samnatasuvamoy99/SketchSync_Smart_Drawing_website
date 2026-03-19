"use client"
import {
  Pencil,
  MousePointer,
  Layers,
  Sparkles,
  ArrowUp,
  Clock,
  Hexagon,
  RotateCcw
} from "lucide-react";


export function SketchSidebar() {

  const tool = [
    { id: "pen", icon: <Pencil size={18} /> },
    { id: "mouse", icon: <MousePointer size={18} /> },
    { id: "layer", icon: <Layers size={18} /> },
    { id: "sparks", icon: <Sparkles size={18} /> },
    { id: "arrow", icon: <ArrowUp size={18} /> },
    { id: "clock", icon: <Clock size={18} /> },
    { id: "hexagon", icon: <Hexagon size={18} /> },
    { id: "rotate", icon: <RotateCcw size={18} /> },
  ]

  const colors = [
    "#ffffff",
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
    "#f87171",
    "#a78bfa"
  ]

  return(
       <div className="fixed top-0 left-0 w-full h-12 bg-[#2b2b2b] border-b border-neutral-700 flex-row items-center justify-between px-4 z-50" >
            
       </div>
  )

}