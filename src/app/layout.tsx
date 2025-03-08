import type { Metadata } from "next";
import { Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/footer";
import {Header} from "@/components/header";
import { FlickeringGrid } from '@/components/ui/background';

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
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-black text-white">
        <FlickeringGrid
                className="absolute flex flex-col justify-center items-center w-full h-full [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                squareSize={4}
                gridGap={6}
                color="#3a0ca3"
                maxOpacity={0.5}
                flickerChance={0.6}
              />
        <Header />
        {children}
        <Footer />
        <Toaster richColors/>
      </body>
    </html>
  );
}