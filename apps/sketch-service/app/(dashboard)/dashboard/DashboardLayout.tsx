
"use client";

import { Pencil, List } from "lucide-react";
import { SketchNavbar } from "@/components/layout/Navbar";
import { SketchSidebar } from "@/components/layout/Sidebar";
import { useState } from "react";

export default function Layout() {
  const [showPage, setShowPage] = useState(false);

  return (
    <div className="h-screen w-screen bg-black grid-bg relative">
      
      
      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "25%",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <SketchNavbar />


      <div className="relative z-[200] flex pt-16 pl-4">
        <button
          onClick={() => setShowPage((prev) => !prev)}
          className="text-white hover:text-yellow-400 transition"
        >
          <List size={15} />
        </button>
      </div>

        
      <SketchSidebar
        isOpen={showPage}
        onClose={() => setShowPage(false)}
      />

    
      <div className="flex justify-center items-center mt-20">
        <Pencil size={48} className="opacity-50 text-yellow-400" />
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="text-white font-semibold font-mono text-2xl">
          Welcome Back, Nabanita Bera!
        </div>
      </div>

      <div className="text-white flex mt-3 font-normal font-serif italic justify-center items-center text-center">
        Pick a shape, choose a color, and start drawing — or
        <br />
        invite your team to sketch together in real time.
      </div>

      <div className="pt-3 italic flex justify-center items-center text-2xl opacity-20 text-yellow-200">
        𝓒𝓵𝓲𝓬𝓴 𝓪 𝓼𝓱𝓪𝓹𝓮 𝓪𝓫𝓸𝓿𝓮 · 𝓭𝓻𝓪𝓰 𝓽𝓸 𝓭𝓻𝓪𝔀 · 𝓬𝓸𝓵𝓵𝓪𝓫𝓸𝓻𝓪𝓽𝓮
      </div>
    </div>
  );
} 


