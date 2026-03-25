import { useState } from "react";
import { JoinRoomResponse } from "@/types/room-type";
import { Spinner} from "@/public/spiner";
import { StatusBadge } from "@/public/statusbadge";
import { apiJoinRoom } from "@/service/room-service";




export function JoinSection({
  apiBase,
  onJoined,
}: {
  apiBase: string;
  onJoined: (r: JoinRoomResponse) => void;
}) {
  const [roomId,  setRoomId]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [result,  setResult]  = useState<JoinRoomResponse | null>(null);

  const join = async () => {
    const id = roomId.trim();
    if (!id) { setError("Paste a Room ID."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const data = await apiJoinRoom(id, apiBase);
      setResult(data);
      onJoined(data);
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
          onChange={(e) => { setRoomId(e.target.value); setError(""); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && join()}
          placeholder="Paste Room ID… e.g. ROOM-X4K2-9PQR"
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
        onClick={join}
        disabled={loading || !roomId.trim()}
        className="
          w-full py-2.5 rounded-lg font-mono text-[11px] font-bold
          tracking-widest uppercase
          bg-white/[0.06] border border-white/[0.1] text-white/70
          hover:bg-white/[0.1] hover:text-white hover:border-white/20
          active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-150 flex items-center justify-center gap-2
        "
      >
        {loading ? <><Spinner /> Joining…</> : "→ Join Room"}
      </button>

      {error && <StatusBadge type="error">⚠ {error}</StatusBadge>}

      {result && (
        <StatusBadge type="success">
          <span className="flex flex-col gap-0.5">
            <span>✓ Joined <strong>{result.roomName}</strong></span>
            <span className="text-white/40">{result.membersOnline} member{result.membersOnline !== 1 ? "s" : ""} online now</span>
          </span>
        </StatusBadge>
      )}
    </div>
  );
}
