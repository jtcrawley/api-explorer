"use client";

import { useEffect } from "react";

interface ModalOverlayProps {
  zIndex?: number;
  backdropOpacity?: string;
  backdropBlur?: "sm" | "md";
  onBackdropClick?: () => void;
  children: React.ReactNode;
  overlayAnimation?: string;
}

export default function ModalOverlay({
  zIndex = 50,
  backdropOpacity = "rgba(0,0,0,0.55)",
  backdropBlur = "sm",
  onBackdropClick,
  children,
  overlayAnimation = "overlayIn 0.2s ease-out",
}: ModalOverlayProps) {
  /* Dismiss on Escape key */
  useEffect(() => {
    if (!onBackdropClick) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBackdropClick();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBackdropClick]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex, animation: overlayAnimation }}
    >
      <div
        className={`absolute inset-0 ${backdropBlur === "md" ? "backdrop-blur-md" : "backdrop-blur-sm"}`}
        style={{ backgroundColor: backdropOpacity }}
        onClick={onBackdropClick}
      />
      {children}
    </div>
  );
}
