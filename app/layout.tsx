import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RirousassLand — L'aventure du savoir",
  description: "Application éducative ludique pour Syma, Sany et Seji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {children}
        <footer className="text-center py-3 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
          © {new Date().getFullYear()} Riadh MNASRI — RirousassLand
        </footer>
      </body>
    </html>
  );
}
