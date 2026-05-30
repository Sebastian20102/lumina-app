import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space' });

export const metadata: Metadata = {
  title: {
    default: "LUMINA | Domina la Programación",
    template: "%s | LUMINA"
  },
  description: "La plataforma de aprendizaje más avanzada y gamificada para desarrolladores de élite. Aprende Python, Web y más con una experiencia tecnológica de vanguardia.",
  keywords: ["programación", "aprender a programar", "python", "javascript", "desarrollo web", "lumina", "gamificación"],
  authors: [{ name: "Lumina Team" }],
  creator: "Lumina Team",
  publisher: "Lumina Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "LUMINA | Domina la Programación",
    description: "La plataforma de aprendizaje más avanzada y gamificada para desarrolladores de élite.",
    url: "https://lumina-code.vercel.app",
    siteName: "LUMINA",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMINA | Domina la Programación",
    description: "La plataforma de aprendizaje más avanzada y gamificada para desarrolladores de élite.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}>
      <body className={`${GeistSans.className} bg-background text-text antialiased selection:bg-accent/30 selection:text-accent`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
            <ToastContainer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
