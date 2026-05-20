import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arunbalaji A | Technical Support Associate & Next.js Specialization",
  description: "Technical Support Associate specializing in Next.js web applications, root cause analysis, and AI-integrated troubleshooting. Discover my portfolio, skills, and experience.",
  keywords: ["Arunbalaji A", "Technical Support Associate", "Next.js Support", "Saku AI Tech", "IT Troubleshooting", "B.E Computer Science", "API Monitoring", "Sethu Institute of Technology"],
  authors: [{ name: "Arunbalaji A" }],
  openGraph: {
    title: "Arunbalaji A | Technical Support Associate",
    description: "Technical Support Associate specializing in Next.js applications and root cause analysis.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0f1d" />
      </head>
      <body>
        <div className="glow-blob blob-1"></div>
        <div className="glow-blob blob-2"></div>
        <div className="glow-blob blob-3"></div>
        {children}
      </body>
    </html>
  );
}
