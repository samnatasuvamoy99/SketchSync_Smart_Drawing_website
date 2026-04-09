"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JoinRoomResponse } from "@/types/RoomType";
import { Spinner } from "@/public/spiner";
import { StatusBadge } from "@/public/statusbadge";
import { apiJoinRoom } from "@/service/RoomService";

export function JoinSection({
  onJoined,
}: {
  onJoined: (r: JoinRoomResponse) => void;
}) {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<JoinRoomResponse | null>(null);

  //  extract only ID (handles full URL or plain ID)
  const extractRoomId = (input: string) => {
    input = input.trim();

    if (input.includes("/room/")) {
      return input.split("/room/")[1];
    }

    return input;
  };

  const join = async () => {
    const id = extractRoomId(roomId);

    if (!id) {
      setError("Paste a valid Room ID.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await apiJoinRoom(id);

      setResult(data);
      onJoined(data);

      // redirect (NO duplicate URL)
      router.push(`/room/${id}`);

    } catch (e: any) {
      setError(e.message ?? "Room not found.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-[9px] font-bold font-mono tracking-[0.12em] uppercase text-white/35 mb-1.5">
          Room ID
        </label>

        <input
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
            setError("");
            setResult(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && join()}
          placeholder="Paste Room ID or full link…"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400/40"
        />
      </div>

      <button
        onClick={join}
        disabled={loading || !roomId.trim()}
        className="w-full py-2.5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white disabled:opacity-40"
      >
        {loading ? (
          <>
            <Spinner /> Joining…
          </>
        ) : (
          "→ Join Room"
        )}
      </button>

      {error && <StatusBadge type="error">⚠ {error}</StatusBadge>}

      {result && (
        <StatusBadge type="success">
          <span className="flex flex-col gap-0.5">
            <span>
              ✓ Joined <strong>{result.roomName}</strong>
            </span>
            <span className="text-white/40">
              {result.membersOnline} member
              {result.membersOnline !== 1 ? "s" : ""} online now
            </span>
          </span>
        </StatusBadge>
      )}
    </div>
  );
}