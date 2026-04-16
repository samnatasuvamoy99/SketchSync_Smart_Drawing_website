import { Type } from "lucide-react";
import React, { MutableRefObject } from "react";

export type StrokeStyle = "solid" | "dashed" | "dotted" | "bold";

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
    |

     (BaseShape & {
      type: "text";
      x: number;
      y: number;
      text: string;
      color: string;
      fontSize: number;
    })
    |

    (BaseShape & {
    type: "diamond";
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
    |
    (BaseShape & {
       type: "ellipse"; 
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
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
  textAreaRef?:React.RefObject<HTMLTextAreaElement| null>;
  Socket?: WebSocket | undefined;
  token?:string;
  tool: string;
  color: string;          
  strokeWidth?: number; 
  strokeStyle?:StrokeStyle
};


export type CanvasDrawingProps = {
  roomId?: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  textAreaRef?:React.RefObject<HTMLTextAreaElement| null>;
  Socket?: WebSocket;
  token?:string
  toolRef: React.MutableRefObject<string>;
  colorRef :React.MutableRefObject<string>;
  strokeRef:React.MutableRefObject<number>;
  strokeStyleRef:React.MutableRefObject<StrokeStyle>
};