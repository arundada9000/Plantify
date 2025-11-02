import NavBar from "@/components/guest/NavBar";
import { AuthProvider } from "@/context/auth-context";
import { TimerProvider } from "@/context/TimerContext";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Plantify | Gamify Your Focus for a Greener Planet",
    template: "%s | Plantify - Focus, Grow, and Save Energy",
  },
  description:
    "Plantify helps you stay focused and save energy through gamified productivity. Grow virtual forests, track your eco-impact, and join a sustainability-driven community making focus fun and green.",
  keywords: [
    "sustainability app",
    "focus productivity app",
    "gamified focus",
    "plant trees while studying",
    "eco-friendly productivity",
    "green energy habits",
    "gamification for sustainability",
    "Pomodoro app for focus",
    "mindfulness and environment",
    "eco tracker app",
    "carbon footprint reduction",
    "renewable lifestyle app",
    "energy saving gamification",
    "Plantify app",
    "green productivity tools",
    "climate tech startup",
    "environmental awareness app",
    "sustainable work habits",
    "focus timer sustainability",
    "grow trees online",
  ],
  authors: [{ name: "Plantify Team", url: "https://plantify.vercel.app" }],
  creator: "Plantify",
  publisher: "Plantify",
  metadataBase: new URL("https://plantify.vercel.app"),
  alternates: {
    canonical: "https://plantify.app",
    languages: {
      "en-US": "https://plantify.vercel.app",
      "es-ES": "https://plantify.vercel.app/es",
      "fr-FR": "https://plantify.vercel.app/fr",
    },
  },
  openGraph: {
    title: "Plantify | Gamify Your Focus for a Greener Planet",
    description:
      "Stay focused and sustainable. Complete Pomodoros, plant trees, and save real energy through gamified eco-challenges.",
    url: "https://plantify.vercel.app",
    siteName: "Plantify",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://plantify.vercel.app/2-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Plantify – Gamified Sustainability App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@plantify_app",
    creator: "@plantify_app",
    title: "Plantify | Gamify Your Focus & Sustainability",
    description:
      "Gamify your focus while helping the planet 🌱. Save energy, grow trees, and stay productive with Plantify.",
    images: ["https://plantify.app/og-image.jpg"],
  },
  category: "Productivity, Sustainability, Environment, Energy Efficiency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  themeColor: "#16a34a",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "application-name": "Plantify",
    "apple-mobile-web-app-title": "Plantify",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#16a34a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* <Provider store={store}> */}

        <AuthProvider>
          <TimerProvider>
            <NavBar />
            {children}
          </TimerProvider>
        </AuthProvider>
        {/* </Provider> */}
        <Analytics />
        {/* ✅ JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Plantify",
              url: "https://plantify.app",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web, iOS, Android",
              description:
                "Plantify gamifies your focus sessions, helping users save energy, plant trees, and track their sustainability impact through engaging productivity challenges.",
              creator: {
                "@type": "Organization",
                name: "Plantify",
                url: "https://plantify.app",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              keywords:
                "sustainability app, productivity, gamification, focus, environment, renewable energy, trees, climate, green lifestyle",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "12500",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
