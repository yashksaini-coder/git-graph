import type { Metadata } from "next";
import { Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/footer";

const UbuntuMono = Ubuntu_Sans_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Git Graph - GitHub Contribution Visualizer",
  description: "Generate your GitHub contribution graph and share them on your socials.",
  keywords: ["github", "contributions", "graph", "visualization", "developer tool"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={UbuntuMono.className} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-black to-slate-900 text-white">
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
