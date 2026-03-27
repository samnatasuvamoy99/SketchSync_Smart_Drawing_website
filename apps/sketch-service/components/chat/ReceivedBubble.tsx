//  Bubble: received 


const AVATAR_BG: Record<string, string> = {
  M: "bg-blue-500",
  J: "bg-green-500",
  K: "bg-violet-400",
  A: "bg-amber-400",
};


export function ReceivedBubble({ sender, text }: { sender: string; text: string }) {
  const bg = AVATAR_BG[sender[0]] ?? "bg-zinc-500";
  const isAmber = bg === "bg-amber-400";

  return (
    <div className="flex gap-1.5 items-end">
      <div
        className={`w-[18px] h-[18px] rounded-full ${bg} flex items-center justify-center text-[7px] font-bold shrink-0 ${
          isAmber ? "text-black" : "text-white"
        }`}
      >
        {sender[0]}
      </div>
      <div>
        <p className="text-[8px] text-white/30 mb-0.5 font-mono">{sender}</p>
        <div className="bg-white/5 border border-white/[0.07] text-white/70 text-[10px] italic leading-snug px-2.5 py-1.5 rounded-[10px_10px_10px_2px] max-w-[180px]">
          {text}
        </div>
      </div>
    </div>
  );
}
