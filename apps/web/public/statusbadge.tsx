
 export function StatusBadge({
  type,
  children,
}: {
  type: "success" | "error" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    success: "bg-green-500/10 border-green-500/25 text-green-400",
    error:   "bg-red-500/10  border-red-500/25  text-red-400",
    info:    "bg-amber-400/10 border-amber-400/25 text-amber-400",
  };
  return (
    <div className={`rounded-lg border px-3 py-2 text-[10px] font-mono leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
}
