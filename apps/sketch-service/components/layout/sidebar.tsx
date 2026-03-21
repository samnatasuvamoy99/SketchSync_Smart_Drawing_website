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
       <div className="fixed left-0 top-0 w-56 h-screen bg-[#686464] z-[999] p-4 shadow-xl" >

                 <div className="text-white font-thin">
                  hello
                   </div>  
       </div>
  )

}