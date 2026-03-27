"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        hover
          ? "cursor-pointer hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200"
          : ""
      } ${className}`}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
