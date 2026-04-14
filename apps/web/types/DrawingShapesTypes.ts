import { Type } from "lucide-react";


export type Shape=
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "diamond";
      x: number;
      y: number;
      size: number;
    };




  export type CanvasRealtimeProps = {
  roomId?: string;
  token?:string
};


export type CanvasProps = {
  roomId?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  Socket?: WebSocket;
  token?:string
  tool: string;
};


export type CanvasDrawingProps = {
  roomId?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  Socket?: WebSocket;
  token?:string
  toolRef: React.MutableRefObject<string>;
};