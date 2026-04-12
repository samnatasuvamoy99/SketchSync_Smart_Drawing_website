
"use client";

import { useState } from "react";
import { StatusBadge } from "@/public/statusbadge";
import { Spinner } from "@/public/spiner";
import { CreateRoomResponse } from "@/types/RoomType";
import { apiCreateRoom } from "@/service/RoomService";
import { Copy, Check } from "lucide-react";

export function GenerateSection({
  onCreated,
  onCopiedSuccess, //NEW PROP
}: {
  onCreated: (r: CreateRoomResponse) => void;
  onCopiedSuccess?: () => void; // ✅ OPTIONAL
}) {
  const [roomName, setroomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CreateRoomResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // COPY HANDLER (UPDATED)
  const handleCopy = async () => {
    if (!result?.link) return;

    try {
      await navigator.clipboard.writeText(result.link);
      setCopied(true);

      // show copied state briefly
      setTimeout(() => {
        setCopied(false);

        //SWITCH TO JOIN TAB
        onCopiedSuccess?.();
      }, 800);

    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const generate = async () => {
    const n = roomName.trim();
    if (!n) {
      setError("Enter a room name first.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const room = await apiCreateRoom(roomName);
      setResult(room);
      onCreated(room);
    } catch (e: any) {
      setError(e.message ?? "Failed to create room.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-[9px] font-bold font-mono tracking-[0.12em] uppercase text-white/35 mb-1.5">
          Room Name
        </label>
        <input
          value={roomName}
          onChange={(e) => {
            setroomName(e.target.value);
            setError("");
            setResult(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. design-sprint, q1-review…"
          className="
            w-full bg-white/[0.04] border border-white/[0.08] rounded-lg
            px-3 py-2 text-[11px] font-mono text-white
            placeholder:text-white/20
            focus:outline-none focus:border-amber-400/40
            transition-colors duration-150
          "
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !roomName.trim()}
        className="
          w-full py-2.5 rounded-lg font-mono text-[11px] font-bold
          tracking-widest uppercase
          bg-white/[0.04] border border-white/[0.08] text-white
          hover:opacity-90 active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-150 flex items-center justify-center gap-2
        "
      >
        {loading ? <><Spinner /> Generating…</> : "⬡ Generate Room"}
      </button>

      {error && <StatusBadge type="error">⚠ {error}</StatusBadge>}

      {/* RESULT */}
      {result && (
        <div className="bg-[#111] border border-amber-400/20 rounded-xl p-4 flex flex-col gap-3 animate-[fadeUp_0.22s_ease]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg shrink-0">
              ⬡
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-bold font-mono truncate">
                {result.roomName}
              </p>
              <p className="text-[9px] text-amber-400/70 font-mono tracking-wide mt-0.5">
                ID: {result.id}
              </p>
            </div>

            <span className="ml-auto flex items-center gap-1.5 text-[9px] text-green-400 font-mono shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {result.membersOnline} online
            </span>
          </div>

          {/* LINK + COPY */}
          <div className="relative">
            <input
              value={result.link}
              readOnly
              className="
                w-full bg-black/40 border border-white/[0.07] rounded-lg
                px-3 py-1.5 pr-10 font-mono text-[9px]
                text-amber-400/60 truncate
              "
            />

            <button
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy link"}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                p-1 rounded-md hover:bg-white/10 transition
              "
            >
              {copied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} className="text-white/60" />
              )}
            </button>
          </div>

          {/* STATUS */}
          <StatusBadge type="success">
            ✓ Room created · Share the ID with teammates to collaborate
          </StatusBadge>
        </div>
      )}
    </div>
  );
}