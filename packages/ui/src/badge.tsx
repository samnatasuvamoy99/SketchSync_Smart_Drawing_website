import { HTMLAttributes } from "react";

type BadgeVariant = "gold" | "default" | "live";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ variant = "default", dot = false, children, style, ...props }: BadgeProps) {
  const variants: Record<BadgeVariant, React.CSSProperties> = {
    gold: {
      background: "rgba(255,215,0,0.10)",
      border: "1px solid rgba(200,134,10,0.26)",
      color: "#C8860A",
    },
    default: {
      background: "rgba(0,0,0,0.05)",
      border: "1px solid rgba(0,0,0,0.09)",
      color: "rgba(15,15,15,0.6)",
    },
    live: {
      background: "rgba(255,215,0,0.10)",
      border: "1px solid rgba(200,134,10,0.3)",
      color: "#C8860A",
    },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 13px",
        borderRadius: 100,
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        ...variants[variant],
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#C8860A",
            flexShrink: 0,
            animation: variant === "live" ? "pulse-dot 1.5s infinite" : undefined,
          }}
        />
      )}
      {children}
    </span>
  );
}
