"use client";
import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/types/DrawingShapesTypes";
import { WEBSOCKET_URL } from '../../config';
import { SpinnerDemo } from "../loading/loading";
import { CanvasDrawing } from "./CanvasArea";
import { apiJoinRoomWS } from "@/service/RoomService";


// React always passes props as an object, not a raw string
export default  function CanvasSocket({ roomId, token }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socket, Setsocket] = useState<WebSocket | null>(null);

  if (!token || !roomId) {
    console.log("No token and roomId");
    return;
  }
  // console.log(token);
  // console.log(roomId);
  
  // console.log(WEBSOCKET_URL);

  // // connect websocket in canvas
  // if (roomId) {
   
  // }

//  useEffect(() => {


//       const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);
     
//        console.log(ws);

//       //  alert("ws-socket connection successfully completed!!")
//     Setsocket(ws);

//       ws.onopen = () => {
//         Setsocket(ws);

//         ws.send(
//           JSON.stringify({
//             type: "join_room",
//              roomId: roomId,
//           })
//         );
//       };

//       ws.onclose = () => {
//         console.log("WebSocket closed");
//       };


//     }, [token, roomId])


useEffect(() => {
  if (!token || !roomId) return;

  const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

  ws.onopen = async () => {
    try {
      const res = await apiJoinRoomWS(ws, roomId);
      console.log("Joined room:", res);

      Setsocket(ws); // set only AFTER success
    } catch (err) {
      console.error("Join failed:", err);
      ws.close();
    }
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };

  return () => {
    ws.close();
  };
}, [token, roomId]);


  if (!socket) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <SpinnerDemo />
      </div>
    )
  }



  //after socket connection  allow user to drawing something
  return <CanvasDrawing roomId={roomId} canvasRef={canvasRef} Socket={socket} />

}