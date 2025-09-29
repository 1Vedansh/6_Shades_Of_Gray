import "./globals.css";
import "./temp-styles.css";
import { AuthProvider } from "@/context/AuthContext";
import { EventProvider } from "@/context/EventContext";
import { BroadcastProvider } from "@/context/BroadcastContext";
import { BlogProvider } from "@/context/BlogContext";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Alumni Nexus - Connect, Share, Grow",
  description: "The ultimate alumni engagement platform where connections flourish, knowledge flows, and futures are built.",
  keywords: "alumni, networking, education, mentorship, community, university, college",
  authors: [{ name: "Alumni Nexus Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Alumni Nexus",
    description: "Where connections flourish, knowledge flows, and futures are built.",
    type: "website",
    siteName: "Alumni Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alumni Nexus",
    description: "Where connections flourish, knowledge flows, and futures are built.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
            <body className="antialiased min-h-screen bg-gradient-to-br from-brand-100 to-brand-400/20">
        <div className="min-h-screen flex flex-col">
          <AuthProvider>
            <EventProvider>
              <BroadcastProvider>
                <BlogProvider>
                  <div className="flex-1">
                    {children}
                  </div>
                </BlogProvider>
              </BroadcastProvider>
            </EventProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}