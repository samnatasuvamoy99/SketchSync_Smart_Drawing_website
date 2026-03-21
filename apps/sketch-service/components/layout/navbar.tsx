
import { useState } from 'react';
import {
  Pencil,
  Square,
  Circle,
  Diamond,
  ArrowRight,
  Minus,
  Users,
  Eraser
} from "lucide-react"

export  function SketchNavbar() {

  const [activeTool, setActiveTool] = useState("pen")
  const [strokeStyle, setStrokeStyle] = useState("solid")

  const tools = [
    { id: "pen", icon: <Pencil size={18} /> },
    { id: "rectangle", icon: <Square size={18} /> },
    { id: "circle", icon: <Circle size={18} /> },
    { id: "diamond", icon: <Diamond size={18} /> },
    { id: "arrow", icon: <ArrowRight size={18} /> },
    { id: "line", icon: <Minus size={18} /> },
    { id: "erase", icon: <Eraser size={18} /> }
  ]

  const strokes = [
    { id: "solid", class: "border-t-2 border-white w-3" },
    { id: "dashed", class: "border-t-2 border-dashed border-white w-3" },
    { id: "dotted", class: "border-t-2 border-dotted border-white w-3" },
    { id: "bold", class: "border-t-4 border-white w-3" }
  ]

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-[#2b2b2b] border-b border-neutral-700 flex items-center justify-between px-4 z-50">

      <div className="flex gap-2">
        <div className="w-7 h-7 bg-gold-300 rounded-md flex text-xl items-center justify-center font-bold text-white">
          S
        </div>

        <span className="text-white font-semibold text-sm">
          SketchSync
        </span>
      </div>

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        <span className="text-neutral-400 ml-4 text-sm">
          Shapes
        </span>

        {/* SHAPE TOOLS */}
        <div className="flex items-center gap-2 ml-2">

          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-600 transition
              ${activeTool === tool.id
                  ? "bg-black text-white"
                  : "text-white hover:bg-neutral-700"}
              `}
            >
              {tool.icon}
            </button>
          ))}

           <span className="text-neutral-400 ml-4 text-sm">
          Shapes
        </span>

          {/* STROKE STYLE */}
          {strokes.map((stroke) => (
            <button
              key={stroke.id}
              onClick={() => setStrokeStyle(stroke.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-600 transition
              ${strokeStyle === stroke.id
                  ? "bg-black text-white"
                  : "hover:bg-neutral-700"}
              `}
            >
              <div className={stroke.class}></div>
            </button>
          ))}

        </div>
      </div>

      <div className="flex gap-8">

        <button className="gap-1 p-1 w-auto h-8 flex items-center justify-center 
        bg-[#2b2b2b] 
        border border-neutral-600 
       
        rounded-md 
        text-white
        hover:bg-neutral-700 
        transition">
          <Users size={20} />
          Collaborate
        </button>

        <div className="w-7 h-7 md:1 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          A
        </div>

      </div>

    </div>
  )
}   