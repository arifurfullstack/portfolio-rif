import type { Metadata } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Rivera | AI Systems & Full Stack Engineer",
  description:
    "Personal portfolio engineered with Next.js 15, live robot cursors, and sub-100ms precision.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${caveatBrush.variable} ${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var agentsParam = params.get('agents');
                  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  var stored = localStorage.getItem('portfolio_agents_mode');
                  
                  var enabled = true;
                  if (agentsParam === 'off') {
                    enabled = false;
                  } else if (agentsParam === 'on') {
                    enabled = true;
                  } else if (stored !== null) {
                    enabled = stored === 'true';
                  } else if (prefersReduced) {
                    enabled = false;
                  }
                  
                  if (enabled) {
                    document.documentElement.classList.add('build-mode');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans antialiased selection:bg-[#ff3b2f] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
