export type Shape =
  | {
      id?: string;
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
      strokeColor?: string;
      strokeWidth?: number;
    }
  | {
      id?: string;
      type: "circle";
      x: number;
      y: number;
      radius: number;
      strokeColor?: string;
      strokeWidth?: number;
    }
  | {
      id?: string;
      type: "line";
      points: { x: number; y: number }[];
      strokeColor?: string;
      strokeWidth?: number;
    };
    
export interface ShapeResponse {
  success: boolean;
  shapes: { Shapes: string }[]; 
}