"use client";

import { forwardRef } from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "secondary" | "ghost";
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", variant = "secondary", label, children, className = "", style, ...props }, ref) => {
    const sizes = { sm: "w-8 h-8", md: "w-9 h-9", lg: "w-10 h-10" };

    const variantStyles: Record<string, React.CSSProperties> = {
      secondary: {
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      },
      ghost: {
        backgroundColor: "var(--bg-tertiary)",
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
      },
    };

    return (
      <button
        ref={ref}
        aria-label={label}
        className={`${sizes[size]} flex items-center justify-center rounded-xl border transition-colors hover:bg-[var(--bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{ ...variantStyles[variant], ...style }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
