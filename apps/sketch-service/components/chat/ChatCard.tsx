"use client";

import { useState, useRef, useEffect } from "react";
import { ChatCardProps, Message} from "@/types/ChatType";
import { MsgBubble } from "./MsgBubble";
import { FetchMessages } from "@/service/RoomService";


const uid = () => Math.random().toString(36).slice(2, 9);

// ChatCard 
export function ChatCard({ roomName, roomId, isOpen, onClose}: ChatCardProps) {


  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [resolvedName, setResolvedName] = useState(roomName);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ── Hide if closed */
  if (!isOpen) return null;

   // this is long process......

   
  // /* Fetch room name */
  // useEffect(() => {
  //   if (!roomId) {
  //     setResolvedName(roomName);
  //     return;
  //   }

  //   fetch(`/api/rooms/${roomId}`)
  //     .then((r) => r.json())
  //     .then((d) => setResolvedName(d.name ?? roomName))
  //     .catch(() => setResolvedName(roomName));
  // }, [roomId, roomName]);


  /* Scroll */
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  /* ── SEND MESSAGE (UPDATED) */
  const send = () => {
    const t = input.trim();
    if (!t) return;

    setInput("");

    // YOUR MESSAGE
    setMessages((prev) => [
      ...prev,
      { id: uid(), sender: "You", text: t, isSelf: true},
    ]);

    // SIMULATED OTHER USER
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          sender: "Maya",
          text: "Got it ",
          isSelf: false,
          
        },
      ]);
    }, 800);
  };

  return (
    <div className="w-[300px] h-[400px] flex  mt-96 mb-2.5  flex-col bg-[#1C1C1C] border border-white/[0.09] rounded-2xl overflow-hidden shadow-2xl">

      {/* //HEADER  */}
      <div className="h-9 bg-[#161616] border-b border-white/[0.07] flex items-center gap-2 px-3">

        <div className="flex gap-[5px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>

        <span className="flex-1 text-center text-[10px] font-bold text-white/55 truncate font-mono">
          {resolvedName}
        </span>

        <button
          onClick={onClose}
          className="text-white/40 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>

      {/* //MESSAGES  */}
      <div className="h-[318px] overflow-y-auto flex flex-col gap-1.5 px-2.5 pt-2.5 pb-1">
        {messages.map((m) => (
          <MsgBubble key={m.id} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* //INPUT  */}
      <div className="flex items-center gap-1.5 p-2 bg-[#161616] border-t border-white/[0.07]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message room…"
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[10px] text-white"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-black text-[11px] flex items-center justify-center"
        >
          ↑
        </button>
      </div>
    </div>
  );
}