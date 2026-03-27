"use client";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
}

export default function Logo({ size = 32, showWordmark = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer rounded square */}
        <rect width="32" height="32" rx="8" fill="var(--accent)" />

        {/* Three stacked lines representing layers/data — like a database or stack */}
        {/* Top line — short */}
        <rect x="8" y="9" width="10" height="2.5" rx="1.25" fill="white" opacity="0.5" />
        {/* Middle line — full */}
        <rect x="8" y="14.75" width="16" height="2.5" rx="1.25" fill="white" />
        {/* Bottom line — medium */}
        <rect x="8" y="20.5" width="13" height="2.5" rx="1.25" fill="white" opacity="0.75" />

        {/* Small dot accent top-right */}
        <circle cx="23" cy="10.25" r="2" fill="white" opacity="0.9" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div>
          <div
            className="text-base font-bold tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            The Backend
          </div>
          <div
            className="text-[10px] leading-none mt-0.5"
            style={{ color: "var(--text-tertiary)" }}
          >
            A Designer&apos;s Guide
          </div>
        </div>
      )}
    </div>
  );
}
