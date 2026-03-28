"use client";

import { useState } from "react";
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
  apiBase = "",
}: RoomCardProps) {
  const [tab, setTab] = useState<"create" | "join">("create");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-[360px] bg-[#1C1C1C] border border-white/[0.09] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono">

        {/* ── HEADER ──────────────────────────────────────── */}
        <div className="h-9 shrink-0 bg-[#161616] border-b border-white/[0.07] flex items-center px-3 gap-2">
          <div className="flex gap-[5px] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] block" />
          </div>
          <span className="flex-1 text-center text-[10px] font-bold text-white/50 tracking-wide">
            Sketch Link · Rooms
          </span>
          <span className="w-[5px] h-[5px] rounded-full bg-green-400 shrink-0 animate-pulse" />
        </div>

        {/* // TAB SWITCHER  */}
        <div className="flex border-b border-white/[0.07] shrink-0">
          {(["create", "join"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest font-mono
                transition-all duration-150
                ${tab === t
                  ? "text-amber-400 border-b-2 border-amber-400 bg-amber-400/5"
                  : "text-white/30 hover:text-white/55 border-b-2 border-transparent"
                }
              `}
            >
              {t === "create" ? "⬡ Generate" : "→ Join"}
            </button>
          ))}
        </div>

        {/* //Content */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[420px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tab === "create" ? (
            <GenerateSection
              apiBase={apiBase}
              onCreated={(room) => onRoomCreated?.(room)}
            />
          ) : (
            <JoinSection
              apiBase={apiBase}
              onJoined={(data) => onRoomJoined?.(data)}
            />
          )}
        </div>

        {/* //FOOTER ─ */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#161616] flex items-center justify-between shrink-0">
          <span className="text-[9px] text-white/20 font-mono">
            Sketch Link. Rooms
          </span>
          <button
            onClick={() => setTab(tab === "create" ? "join" : "create")}
            className="text-[9px] text-white/20 font-mono hover:text-amber-400 transition-colors"
          >
            {tab === "create" ? "Already have a room ID? →" : "← Create new room"}
          </button>
        </div>

      </div>
    </>
  );
}