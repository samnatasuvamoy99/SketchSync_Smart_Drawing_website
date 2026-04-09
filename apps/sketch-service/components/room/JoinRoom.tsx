// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { JoinRoomResponse } from "@/types/RoomType";
// import { Spinner } from "@/public/spiner";
// import { StatusBadge } from "@/public/statusbadge";
// import { apiJoinRoomWS } from "@/service/RoomService";

// import { WEBSOCKET_URL } from "@/config";

//  export function JoinSection({
//   onJoined,
//   token
// }: {
//   onJoined ?: (r: JoinRoomResponse) => void;
//   token?: string;
// }) {

  
//   const router = useRouter();
//   const [roomId, setRoomId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState<JoinRoomResponse | null>(null);


//   const [ws, setWs] = useState<WebSocket | null>(null);


//      console.log( "joinroom",token);

//   useEffect(() => {
//       if (!token) return;

//     const socket = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

//     socket.onopen = () => {
//       console.log("WS connected");
//       setWs(socket);
//     };

//     socket.onclose = () => {
//       console.log("WS disconnected");
//     };

//     return () => {
//       socket.close();
//     };
//   }, [token]);




//   //  extract only ID (handles full URL or plain ID)
//   const extractRoomId = (input: string) => {
//     input = input.trim();

//     if (input.includes("/room/")) {
//       return input.split("/room/")[1];
//     }

//     return input;
//   };

//   const join = async () => {
//     const id = extractRoomId(roomId);

//     if (!id) {
//       setError("Paste a valid Room ID.");
//       return;
//     }

//     setError("");
//     setLoading(true);
//     setResult(null);

//     try {

//       if (!ws) {
//         return;
//       }

//       const data = await apiJoinRoomWS(ws, roomId);

//       setResult(data);

//       if(onJoined)
//       onJoined(data);

//       // redirect (NO duplicate URL)
//       router.push(`/room/${id}`);

//     } catch (e: any) {
//       setError(e.message ?? "Room not found.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div>
//         <label className="block text-[9px] font-bold font-mono tracking-[0.12em] uppercase text-white/35 mb-1.5">
//           Room ID
//         </label>

//         <input
//           value={roomId}
//           onChange={(e) => {
//             setRoomId(e.target.value);
//             setError("");
//             setResult(null);
//           }}
//           onKeyDown={(e) => e.key === "Enter" && join()}
//           placeholder="Paste Room ID or full link…"
//           className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400/40"
//         />
//       </div>

//       <button
//         onClick={join}
//         disabled={loading || !roomId.trim()}
//         className="w-full py-2.5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white disabled:opacity-40"
//       >
//         {loading ? (
//           <>
//             <Spinner /> Joining…
//           </>
//         ) : (
//           "→ Join Room"
//         )}
//       </button>

//       {error && <StatusBadge type="error">⚠ {error}</StatusBadge>}

//       {result && (
//         <StatusBadge type="success">
//           <span className="flex flex-col gap-0.5">
//             <span>
//               ✓ Joined <strong>{result.roomName}</strong>
//             </span>
//             <span className="text-white/40">
//               {result.membersOnline} member
//               {result.membersOnline !== 1 ? "s" : ""} online now
//             </span>
//           </span>
//         </StatusBadge>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/public/spiner";
import { StatusBadge } from "@/public/statusbadge";

export function JoinSection() {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // extract ID from full URL OR plain ID
  const extractRoomId = (input: string) => {
    input = input.trim();

    if (input.includes("/room/")) {
      return input.split("/room/")[1];
    }

    return input;
  };

  const join = () => {
    const id = extractRoomId(roomId);

    if (!id) {
      setError("Paste a valid Room ID.");
      return;
    }

    setError("");
    setLoading(true);

    // 🔥 ONLY redirect (no API, no WS)
    router.push(`/room/${id}`);
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
            <Spinner /> Redirecting…
          </>
        ) : (
          "→ Join Room"
        )}
      </button>

      {error && <StatusBadge type="error">⚠ {error}</StatusBadge>}
    </div>
  );
}