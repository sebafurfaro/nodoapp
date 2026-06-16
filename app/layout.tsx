import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NodoApp | Tecnologia con vision de futuro",
  description:
    "NodoApp disena experiencias digitales modernas, accesibles y escalables para empresas que quieren crecer con una identidad tecnologica potente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var storedTheme = localStorage.getItem("nodoapp-theme");
              var theme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              document.documentElement.dataset.theme = theme;
              document.documentElement.style.colorScheme = theme;
            } catch (error) {}
          })();
        `}</Script>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-slate-950 focus:shadow-lg"
        >
          Ir al contenido principal
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Header />
            <main id="content" className="relative flex-1">
              {children}
            </main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
