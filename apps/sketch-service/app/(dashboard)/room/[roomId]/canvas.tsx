"use client";
import { useState } from "react";
import { SketchNavbar } from "@/components/layout/Navbar";
import { SketchSidebar } from "@/components/layout/Sidebar";
import { List } from "lucide-react";
import DrawingCanvas from "../../../../components/canvas/CanvasSocket"; 
import { CanvasProps } from "@/types/DrawingShapesTypes";



export  function Canvas({roomId , token}:CanvasProps) {
  const [showPage, setShowPage] = useState(false);

  return (
    <div className="h-screen w-screen fixed bg-black overflow-hidden">
      <SketchNavbar />


      <div className="pt-16 pl-4 absolute z-20">
        <button
          onClick={() => setShowPage((prev) => !prev)}
          className="text-white hover:text-yellow-400 transition"
        >
          <List size={23} />
        </button>
      </div>

      <SketchSidebar
        isOpen={showPage}
        onClose={() => setShowPage(false)}
      />

      <DrawingCanvas token={token} roomId={roomId} />
    </div>
  );
}