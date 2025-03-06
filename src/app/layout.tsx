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
  title: "Git Graph",
  description: "Generate your GitHub contribution graph and share them on your socials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={UbuntuMono.className} suppressContentEditableWarning>
      <body>
        {children}
        <Footer/>
        <Toaster />
      </body>
    </html>
  );
}
