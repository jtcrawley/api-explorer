import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Trainer",
  description:
    "A story-driven interactive learning platform for product designers to understand APIs, databases, and how modern apps are built. No coding experience needed.",
  metadataBase: new URL("https://apitrainer.vercel.app"),
  openGraph: {
    title: "API Trainer",
    description:
      "A story-driven interactive learning platform for product designers to understand APIs, databases, and how modern apps are built. No coding experience needed.",
    url: "https://apitrainer.vercel.app",
    siteName: "API Trainer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Trainer",
    description:
      "A story-driven interactive learning platform for product designers to understand APIs, databases, and how modern apps are built. No coding experience needed.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: applies theme class before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('theme-pokemon')||'bulbasaur';var m=localStorage.getItem('theme-mode')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add('theme-'+p+'-'+m);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
