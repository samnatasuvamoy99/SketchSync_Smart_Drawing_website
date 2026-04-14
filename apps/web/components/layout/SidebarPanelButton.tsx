import { ChevronRight} from "lucide-react"
import { ReactNode } from "react";

 type PanelTool = {
   id: string;
   label: string;
   icon: ReactNode;
 };
 
 
 export function PanelButton({
  tool,
  onClick,
}: {
  tool: PanelTool;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.07] bg-transparent hover:bg-white/[0.06] flex items-center gap-2 transition"
    >
      <span className="text-white/40">{tool.icon}</span>
      <span className="text-[10px] text-white/55 font-mono flex-1 text-left">
        {tool.label}
      </span>
      <ChevronRight size={10} className="text-white/20" />
    </button>
  );
}
