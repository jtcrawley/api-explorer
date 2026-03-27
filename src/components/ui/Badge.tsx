"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
    success:
      "bg-[var(--success-light)] text-[var(--success)]",
    warning:
      "bg-[var(--warning-light)] text-[var(--warning)]",
    accent:
      "bg-[var(--accent-light)] text-[var(--accent)]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
