"use client";

import { forwardRef, useState, useCallback, useId } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      style,
      children,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const uid = useId();
    const patternId = `dot-btn-${uid.replace(/:/g, "")}`;

    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
        onMouseMove?.(e);
      },
      [onMouseMove]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false);
        setMouse({ x: 0.5, y: 0.5 });
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const isPrimary = variant === "primary";

    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "relative overflow-hidden",
      secondary: "border transition-colors duration-200 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]",
      ghost: "transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]",
      danger: "text-white transition-colors duration-200 focus:ring-[var(--error)]",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2",
    };

    const dangerStyle: React.CSSProperties = variant === "danger"
      ? { backgroundColor: "var(--error)" }
      : {};

    const isDisabled = !!props.disabled;
    const canHover = isHovered && !isDisabled;

    const primaryStyle: React.CSSProperties = isPrimary
      ? {
          border: "1.5px solid var(--accent)",
          color: canHover ? "#fff" : "var(--accent)",
          backgroundColor: canHover
            ? "var(--accent)"
            : "transparent",
          boxShadow: canHover
            ? "0 0 28px -6px color-mix(in srgb, var(--accent) 55%, transparent)"
            : "none",
          transform: canHover ? "scale(1.02) translateZ(0)" : "scale(1) translateZ(0)",
          transition:
            "color 0.2s ease, background-color 0.2s ease, box-shadow 0.25s ease, transform 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
          ...(isDisabled ? { filter: "saturate(0.4)" } : {}),
        }
      : {};

    const inlineStyle: React.CSSProperties = {
      ...(variant === "secondary" ? { borderColor: "var(--border)" } : {}),
      ...primaryStyle,
      ...dangerStyle,
      ...style,
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        style={inlineStyle}
        onMouseMove={isPrimary ? handleMouseMove : onMouseMove}
        onMouseEnter={isPrimary ? handleMouseEnter : onMouseEnter}
        onMouseLeave={isPrimary ? handleMouseLeave : onMouseLeave}
        {...props}
      >
        {isPrimary && (
          <>
            {/* Dot grid — revealed around cursor */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                maskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)`,
                WebkitMaskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)`,
              }}
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id={patternId}
                  x="0" y="0"
                  width="12" height="12"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="6" cy="6" r="0.9" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>

            {/* Specular highlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.18s ease",
                background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 65%)`,
              }}
            />
          </>
        )}

        {/* Content above overlays */}
        <span className={`${isPrimary ? "relative z-10" : ""} inline-flex items-center gap-2`}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
