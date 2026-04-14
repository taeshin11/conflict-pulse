import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conflict Pulse — Active Conflicts Worldwide",
  description: "Track active armed conflicts and war zones worldwide with real-time updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  );
}
