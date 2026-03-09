"use client";
import { HTMLAttributes, forwardRef, useState } from "react";

type CardVariant = "default" | "outlined" | "elevated" | "gold" | "feature";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
}

const variantBase: Record<CardVariant, React.CSSProperties> = {
  default: {
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  outlined: {
    background: "transparent",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "none",
  },
  elevated: {
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 6px 32px rgba(0,0,0,0.08)",
  },
  gold: {
    background: "rgba(255,215,0,0.04)",
    border: "1.5px solid rgba(200,134,10,0.24)",
    boxShadow: "0 4px 24px rgba(200,134,10,0.08)",
  },
  feature: {
    background: "#F8F6F1",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
};

const paddingMap = { sm: "16px 18px", md: "24px 26px", lg: "32px 30px" };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hoverable = false, padding = "md", style, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);

    const base: React.CSSProperties = {
      borderRadius: 14,
      padding: paddingMap[padding],
      transition: "all 0.24s ease",
      ...variantBase[variant],
      ...(hoverable && hovered
        ? {
            transform: "translateY(-3px)",
            boxShadow:
              variant === "gold"
                ? "0 10px 40px rgba(200,134,10,0.16)"
                : "0 10px 40px rgba(0,0,0,0.10)",
          }
        : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        style={base}
        onMouseEnter={(e) => {
          if (hoverable) setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (hoverable) setHovered(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";


/* ── Convenience sub-components ─────────────────────────── */
export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#C8860A",
        marginBottom: 8,
      }}
    >
      {children}
    </p>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 20,
        fontWeight: 700,
        color: "#0F0F0F",
        letterSpacing: "-0.4px",
        marginBottom: 10,
        lineHeight: 1.2,
      }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 14,
        fontStyle: "italic",
        color: "rgba(15,15,15,0.48)",
        lineHeight: 1.75,
      }}
    >
      {children}
    </p>
  );
}

