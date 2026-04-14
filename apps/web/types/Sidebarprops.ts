// export type StrokeWidth = 1 | 1.5 | 2.5 | 3;

// export interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;

//   activeTool?: string;
//   activeColor?: string;

//   onToolChange?: (tool: string) => void;
//   onColorChange?: (color: string) => void;
//   onStrokeWidthChange?: (width: StrokeWidth) => void;

//   onReset?: () => void;
//   onExport?: () => void;
// }

export type StrokeWidth = 1 | 1.5 | 2.5 | 3;

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;

  activeTool?: string;
  activeColor?: string;
  activeStrokeWidth?: StrokeWidth; // ✅ ADD THIS

  onToolChange?: (tool: string) => void;
  onColorChange?: (color: string) => void;
  onStrokeWidthChange?: (width: StrokeWidth) => void; // ✅ ADD THIS

  onReset?: () => void;
  onExport?: () => void;
}