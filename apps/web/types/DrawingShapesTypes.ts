import { Type } from "lucide-react";
import { MutableRefObject } from "react";


// export type Shape=
//   | {
//       type: "rectangle";
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//     }
//   | {
//       type: "circle";
//       centerX: number;
//       centerY: number;
//       radius: number;
//     }
//   | {
//       type: "diamond";
//       x: number;
//       y: number;
//       size: number;
//     };

type StrokeStyle = "solid" | "dashed" | "dotted" | "bold";

type BaseShape = {
  color: string;
  strokeWidth?: number;
  strokeStyle?: StrokeStyle;
};

export type Shape =
  | (BaseShape & {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    })
  | (BaseShape & {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    })
  | (BaseShape & {
      type: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    })
  | (BaseShape & {
      type: "arrow";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    })
  | (BaseShape & {
      type: "pencil";
      points: { x: number; y: number }[];
    });


  export type CanvasRealtimeProps = {
  roomId?: string;
  token?:string
};


export type CanvasProps = {
  roomId?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  Socket?: WebSocket | undefined;
  token?:string;
  tool: string;
  color: string;          
  strokeWidth?: number; 
};


export type CanvasDrawingProps = {
  roomId?: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  Socket?: WebSocket;
  token?:string
  toolRef: React.MutableRefObject<string>;
  colorRef :React.MutableRefObject<string>;
  strokeRef:React.MutableRefObject<number>;
};