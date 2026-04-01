"use client";

interface ProgressBarProps {
  value: number; // 0–100
  height?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProgressBar({ value, height = "md", className = "" }: ProgressBarProps) {
  const heights = { sm: "h-1", md: "h-1.5", lg: "h-2" };
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`${heights[height]} rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--bg-tertiary)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${clamped}%`, backgroundColor: "var(--accent)" }}
      />
    </div>
  );
}
