"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost" | "gold-outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #FFD700 0%, #C8860A 100%)",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 20px rgba(200,134,10,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
  },
  outline: {
    background: "transparent",
    color: "#0F0F0F",
    border: "1.5px solid rgba(0,0,0,0.14)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  ghost: {
    background: "transparent",
    color: "rgba(15,15,15,0.55)",
    border: "none",
    boxShadow: "none",
  },
  "gold-outline": {
    background: "rgba(255,215,0,0.06)",
    color: "#C8860A",
    border: "1.5px solid rgba(200,134,10,0.28)",
    boxShadow: "none",
  },
};

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { fontSize: 11, padding: "8px 16px", borderRadius: 7, letterSpacing: "0.07em" },
  md: { fontSize: 12, padding: "12px 24px", borderRadius: 9, letterSpacing: "0.07em" },
  lg: { fontSize: 13, padding: "15px 34px", borderRadius: 10, letterSpacing: "0.06em" },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "right",
      children,
      style,
      disabled,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      textTransform: "uppercase",
      cursor: isDisabled ? "not-allowed" : "pointer",
      transition: "all 0.22s ease",
      opacity: isDisabled ? 0.5 : 1,
      whiteSpace: "nowrap",
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(200,134,10,0.40), inset 0 1px 0 rgba(255,255,255,0.15)";
        }
        if (variant === "outline") {
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)";
          e.currentTarget.style.background = "rgba(0,0,0,0.03)";
        }
        if (variant === "gold-outline") {
          e.currentTarget.style.background = "rgba(255,215,0,0.11)";
          e.currentTarget.style.borderColor = "rgba(200,134,10,0.5)";
        }
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow as string;
      e.currentTarget.style.background = variantStyles[variant].background as string;
      e.currentTarget.style.borderColor = "";
      onMouseLeave?.(e);
    };

    return (
      <button
        ref={ref}
        style={baseStyle}
        disabled={isDisabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {loading && (
          <span style={{ display: "flex", gap: 3 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 5, height: 5,
                  borderRadius: "50%",
                  background: "currentColor",
                  display: "inline-block",
                  animation: `dot-bounce 0.9s ${i * 0.18}s ease-in-out infinite`,
                }}
              />
            ))}
          </span>
        )}
        {!loading && icon && iconPosition === "left" && icon}
        {!loading && children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";