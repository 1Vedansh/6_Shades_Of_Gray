import "./globals.css";
import "./temp-styles.css";
import { AuthProvider } from "@/context/AuthContext";
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
      <body className="antialiased min-h-screen" style={{background: 'linear-gradient(135deg, #E7F2EF 0%, #A1C2BD 100%)'}}>
        <div className="min-h-screen flex flex-col">
          <AuthProvider>
            <div style={{flexGrow: 1}}>
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}