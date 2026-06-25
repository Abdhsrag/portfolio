import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

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

export const metadata = {
  metadataBase: new URL("https://abdhsrag.vercel.app"),
  title: "Abdelrahman Mohamed | Frontend Developer",
  description:
    "Frontend Developer from Egypt building modern, responsive web applications with React, Next.js, and Django.",
  keywords:
    "Frontend Developer, React, Next.js, Django, Python, JavaScript, Egypt, Portfolio, Abdelrahman Mohamed",
  authors: [{ name: "Abdelrahman Mohamed" }],
  openGraph: {
    title: "Abdelrahman Mohamed | Frontend Developer",
    description:
      "Frontend Developer from Egypt building modern, responsive web applications with React, Next.js, and Django.",
    url: "https://abdhsrag.vercel.app",
    siteName: "Abdelrahman Mohamed",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Mohamed | Frontend Developer",
    description:
      "Frontend Developer from Egypt building modern, responsive web applications with React, Next.js, and Django.",
  },
  alternates: {
    canonical: "https://abdhsrag.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00d9ff",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abdelrahman Mohamed",
              jobTitle: "Frontend Developer",
              url: "https://abdhsrag.vercel.app",
              sameAs: [
                "https://github.com/Abdhsrag",
                "https://www.linkedin.com/in/abdelrahmanmohamedosama",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Python",
                "Django",
                "Flask",
                "FastAPI",
                "Vite",
                "TanStack",
                "Zustand",
                "GSAP",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
