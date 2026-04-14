// "use client";
// import { useEffect, useRef, useState } from "react";
// import { CanvasProps } from "@/types/DrawingShapesTypes";
// import { WEBSOCKET_URL } from '../../config';
// import { SpinnerDemo } from "../loading/loading";
// import { CanvasDrawing } from "./CanvasArea";
// import { apiJoinRoomWS } from "@/service/RoomService";
// import { Error } from "../ui/error";

// // React always passes props as an object, not a raw string
// export default  function CanvasSocket({ roomId, token }: CanvasProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [socket, Setsocket] = useState<WebSocket | null>(null);
//   const [error, setError] = useState<string | null>(null);


//   // if (!token || !roomId) {
//   //   console.log("No token and roomId");
//   //   return;
//   // }

//   if (!token || !roomId) {
//   // LOCAL MODE (no socket)
//   return (
//     <CanvasDrawing
//       canvasRef={canvasRef}
//     />
//   );
// }
  
// useEffect(() => {
//   if (!token || !roomId) return;

//   const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

//   ws.onopen = async () => {
//     try {
//       const res = await apiJoinRoomWS(ws, roomId);
//       console.log("Joined room:", res);

//       Setsocket(ws); // set only AFTER success
//     } catch (err:any) {
//       console.error("Join failed:", err);
//       setError(err.message || "Invalid Room ID");
//       ws.close();
//     }
//   };

//   ws.onclose = () => {
//     console.log("WebSocket closed");
//   };

//   return () => {
//     ws.close();
//   };
// }, [token, roomId]);

// if (error) {
//   return (
//      <Error error={error}/>
//   );
// }

//   if (!socket) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
//         <SpinnerDemo />
//       </div>
//     );
//   }


// //after socket connection  allow user to drawing something
//    return(
//     <CanvasDrawing 
//     roomId={roomId} 
//     canvasRef={canvasRef} 
//     Socket={socket} 
//     />

//    ) 

// }


"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/types/DrawingShapesTypes";
import { WEBSOCKET_URL } from "../../config";
import { SpinnerDemo } from "../loading/loading";
import { CanvasDrawing } from "./CanvasArea";
import { apiJoinRoomWS } from "@/service/RoomService";
import { Error } from "../ui/error";

export default function CanvasSocket({ roomId, token , tool}: CanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toolRef = useRef(tool);


   // for latest tool pickup
  useEffect(() => {
  toolRef.current = tool;
}, [tool]);


  // LOCAL MODE (no websocket)
  if (!token || !roomId) {
    return <CanvasDrawing canvasRef={canvasRef} toolRef={toolRef} />;
  }

  useEffect(() => {
    const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

    ws.onopen = async () => {
      try {
        await apiJoinRoomWS(ws, roomId);
        setSocket(ws);
      } catch (err: any) {
        setError(err.message || "Invalid Room ID");
        ws.close();
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [roomId, token]);

  if (error) {
    return <Error error={error} />;
  }

  if (!socket) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <SpinnerDemo />
      </div>
    );
  }

  //COLLAB MODE
  return (
    <CanvasDrawing
      roomId={roomId}
      Socket={socket}
      canvasRef={canvasRef}
      toolRef={toolRef}
    />
  );
}