import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PostPilot — Turn Any Input Into Content That Sounds Like You",
  description: "PostPilot turns photos, screenshots, tweets, and raw ideas into polished LinkedIn posts and X (Twitter) threads that sound like you wrote them — not like AI. Style Training learns your unique writing style.",
  keywords: "social media post generator, LinkedIn post writer, Twitter thread builder, AI content creator, writing style AI, PostPilot",
  authors: [{ name: "PostPilot" }],
  openGraph: {
    title: "PostPilot — Turn Any Input Into Content That Sounds Like You",
    description: "Photos, screenshots, raw thoughts → polished LinkedIn posts and X threads in your writing style.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-height)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
