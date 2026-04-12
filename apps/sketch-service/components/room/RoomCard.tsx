
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { RoomCardProps } from "@/types/RoomType";
import { GenerateSection } from "./GenerateRoom";
import { JoinSection } from "./JoinRoom";

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px bg-white/[0.07]" />
      <span className="text-[9px] font-bold font-mono tracking-widest text-white/25 uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
}

export function RoomCard({
  onRoomCreated,
  onRoomJoined,
  onClose,
  isOpen,
}: RoomCardProps) {
  const [tab, setTab] = useState<"create" | "join">("create");

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Serif+Display:ital@0;1&display=swap');
      `}</style>

      <div className="w-[360px] bg-[#1C1C1C] border border-white/[0.09] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono">

        {/* HEADER */}
        <div className="h-9 bg-[#161616] border-b border-white/[0.07] flex items-center px-3 gap-2">
          <div className="flex gap-[5px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>

          <span className="flex-1 text-center text-[10px] font-bold text-white/50 tracking-wide">
            Sketch Link · Rooms
          </span>

          <div className="flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-green-400 animate-pulse" />

            <button
              onClick={onClose}
              className="p-1 rounded text-white/40 hover:text-red-400 hover:bg-white/10 transition"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex border-b border-white/[0.07]">
          {(["create", "join"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest font-mono
                transition-all duration-150
                ${
                  tab === t
                    ? "text-amber-400 border-b-2 border-amber-400 bg-amber-400/5"
                    : "text-white/30 hover:text-white/55 border-b-2 border-transparent"
                }
              `}
            >
              {t === "create" ? "⬡ Generate" : "→ Join"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[420px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tab === "create" ? (
            <GenerateSection
              onCreated={(room) => onRoomCreated?.(room)}
              onCopiedSuccess={() => {
                setTimeout(() => setTab("join"), 800); // ✅ switch after copy
              }}
            />
          ) : (
            <JoinSection onJoined={onRoomJoined} />
          )}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#161616] flex items-center justify-between">
          <span className="text-[9px] text-white/20 font-mono">
            Sketch Link · Rooms
          </span>

          <button
            onClick={() => setTab(tab === "create" ? "join" : "create")}
            className="text-[9px] text-white/20 font-mono hover:text-amber-400 transition-colors"
          >
            {tab === "create"
              ? "Already have a room ID? →"
              : "← Create new room"}
          </button>
        </div>
      </div>
    </>
  );
}