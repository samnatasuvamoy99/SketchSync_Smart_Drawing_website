"use client";

import { useState, ReactNode } from "react";
import {Layers, Sparkles, Download, History,Hexagon, X, RotateCcw} from "lucide-react";
import { SidebarProps } from "@/types/Sidebarprops";
import { PanelButton } from "./SidebarPanelButton";
import { RoomCard } from "../room/RoomCard";



/* ─── Types */
type PanelTool = {
  id: string;
  label: string;
  icon: ReactNode;
};

type ColorType = {
  hex: string;
  label: string;
};

/* ─── Constant */

const PANEL_TOOLS: PanelTool[] = [
  { id: "layers",  label: "Layers",    icon: <Layers size={14} /> },
  { id: "ai",      label: "AI Assist", icon: <Sparkles size={14} /> },
  { id: "history", label: "History",   icon: <History size={14} /> },
  { id: "export",  label: "Export",    icon: <Download size={14} /> },
  { id: "room",    label: "Room",      icon: <Hexagon size={14} /> },
];

const COLORS: ColorType[] = [
  { hex: "#FFFFFF", label: "White" },
  { hex: "#F59E0B", label: "Amber" },
  { hex: "#3B82F6", label: "Blue" },
  { hex: "#22C55E", label: "Green" },
  { hex: "#DC2626", label: "Red" },
  { hex: "#FB923C", label: "Orange" },
  { hex: "#94A3B8", label: "Slate" },
];



function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/30 mb-1.5 font-mono">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.07] my-0.5" />;
}


/* ─── Sidebar*/

export function SketchSidebar({
  isOpen,
  onClose,
  activeTool = "pen",
  activeColor = "#FFFFFF",
  onToolChange,
  onColorChange,
  onReset,
}: SidebarProps) {
  const [tool, setTool] = useState<string>(activeTool);
  const [color, setColor] = useState<string>(activeColor);

  if (!isOpen) return null;

  const handleTool = (id: string) => {
    setTool(id);
    onToolChange?.(id);
  };

  const handleColor = (hex: string) => {
    setColor(hex);
    onColorChange?.(hex);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[9998]"
      />

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed mt-14 ml-12 rounded top-0 left-0 h-auto w-56 bg-[#1C1C1C] z-[9999] border-r border-white/[0.09] p-3 flex flex-col gap-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Tools</span>
          <button onClick={onClose}>
            <X size={16} className="text-white/70 hover:text-white" />
          </button>
        </div>

        <Divider />

        {/* Colors */}
        <div>
          <SectionLabel>Colors</SectionLabel>
          <div className="flex flex-wrap gap-1">
            {COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => handleColor(c.hex)}
                className={`w-5 h-5 rounded-full border ${
                  color === c.hex ? "border-white border-1 w-6 h-6" : "border-transparent"
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        <Divider />

        {/* Panels */}
        <div>
          <SectionLabel>Panels</SectionLabel>
          {PANEL_TOOLS.map((t) => (
            <PanelButton key={t.id} tool={t} onClick={() => handleTool(t.id)} />
          ))}
        </div>

        <Divider />

      
        
        <button
          onClick={onReset}
          className="text-white text-sm  justify-center  hover:text-red-700 text-left w-full px-1.5 py-1.5 rounded-lg border border-white/[0.07] bg-transparent hover:bg-white/[0.06] flex items-center transition"
        >
          Reset 
           <RotateCcw  className=" hover:text-red-600 ml-1 mt-1" size={14}/>
        </button>
      </div>
    </>
  );
}