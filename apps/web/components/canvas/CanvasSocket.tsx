
"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/types/DrawingShapesTypes";
import { WEBSOCKET_URL } from "../../config";
import { SpinnerDemo } from "../loading/loading";
import { CanvasDrawing } from "./CanvasArea";
import { apiJoinRoomWS } from "@/service/RoomService";
import { Error } from "../ui/error";

export default function CanvasSocket({
  roomId,
  token,
  tool,
  color,
  strokeWidth,
}: CanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const toolRef = useRef(tool ?? "pen");
  const colorRef = useRef<string>(color ?? "#FFFFFF");
  const strokeRef = useRef<number>(strokeWidth ?? 1.5);  

  // keep latest values
  useEffect(() => {
    toolRef.current = tool ?? "pen";
  }, [tool]);

  useEffect(() => {
    colorRef.current = color ?? "#FFFFFF";
  }, [color]);

  useEffect(() => {
    strokeRef.current = strokeWidth ?? 1.5;
  }, [strokeWidth]);

  // WebSocket setup
  useEffect(() => {
    if (!token || !roomId) return;

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

  // UI states
  if (error) return <Error error={error} />;

  if (!socket && token && roomId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <SpinnerDemo />
      </div>
    );
  }

  // LOCAL MODE (no websocket)
  if (!token || !roomId) {
    return (
      <CanvasDrawing
        canvasRef={canvasRef}
        toolRef={toolRef}
        colorRef={colorRef}
        strokeRef={strokeRef}
      />
    );
  }

  // COLLAB MODE
  return (
    <CanvasDrawing
      roomId={roomId}
      Socket={socket}
      canvasRef={canvasRef}
      toolRef={toolRef}
      colorRef={colorRef}
      strokeRef={strokeRef}
    />
  );
}