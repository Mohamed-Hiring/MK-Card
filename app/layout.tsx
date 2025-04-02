// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Al Haidariya Hiring",
  description: "Hiring Card Management System",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-black font-sans">{children}</body>
    </html>
  );
}
