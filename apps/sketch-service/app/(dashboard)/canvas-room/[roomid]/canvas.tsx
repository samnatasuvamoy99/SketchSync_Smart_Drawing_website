

"use client";

import { useState } from "react";
import { SketchNavbar } from "@/components/layout/navbar";
import { SketchSidebar } from "@/components/layout/sidebar";
import { List } from "lucide-react";
import DrawingCanvas from "../drawingcanvas"; // 👈 separate component

export default function Canvas() {
  const [showPage, setShowPage] = useState(false);

  return (
    <div className="h-screen w-screen fixed bg-black overflow-hidden">
      <SketchNavbar />


      <div className="pt-16 pl-4 absolute z-20">
        <button
          onClick={() => setShowPage((prev) => !prev)}
          className="text-white hover:text-yellow-400 transition"
        >
          <List size={25} />
        </button>
      </div>

      <SketchSidebar
        isOpen={showPage}
        onClose={() => setShowPage(false)}
      />

      <DrawingCanvas />
    </div>
  );
}