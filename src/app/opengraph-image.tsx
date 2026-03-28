import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "API Trainer — Learn APIs & Databases";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent bloom */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0.04) 50%, transparent 75%)",
          }}
        />

        {/* Pokéball */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 32 32"
          style={{ marginBottom: "28px" }}
        >
          <path d="M 2 16 A 14 14 0 0 1 30 16 Z" fill="#4ade80" />
          <path d="M 2 16 A 14 14 0 0 0 30 16 Z" fill="#18181b" />
          <circle cx="16" cy="16" r="14" stroke="#4ade80" strokeWidth="1.5" fill="none" />
          <line x1="2" y1="16" x2="10.5" y2="16" stroke="#4ade80" strokeWidth="1.5" />
          <line x1="21.5" y1="16" x2="30" y2="16" stroke="#4ade80" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="4" fill="#18181b" stroke="#4ade80" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="1.5" fill="#4ade80" />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "#fafafa",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          API Trainer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#a1a1aa",
            fontWeight: "400",
            letterSpacing: "-0.3px",
            maxWidth: "640px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          A story-driven learning platform for product designers to understand APIs &amp; databases.
        </div>

        {/* URL pill */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: "18px",
            color: "#71717a",
            letterSpacing: "0.2px",
          }}
        >
          apitrainer.vercel.app
        </div>
      </div>
    ),
    size
  );
}
