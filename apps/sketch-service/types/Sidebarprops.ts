export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTool?: string;
  activeColor?: string;
  onToolChange?: (tool: string) => void;
  onColorChange?: (color: string) => void;
  onReset?: () => void;
  onExport?: () => void;
}
