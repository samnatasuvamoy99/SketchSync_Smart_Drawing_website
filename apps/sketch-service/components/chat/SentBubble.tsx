//  Bubble: sent 
 export function SentBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div>
        <p className="text-[8px] text-white/30 mb-0.5 text-right font-mono tracking-wide">
          You
        </p>
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-black text-[10px] italic leading-snug px-2.5 py-1.5 rounded-[10px_10px_2px_10px] max-w-[180px]">
          {text}
        </div>
      </div>
    </div>
  );
}
