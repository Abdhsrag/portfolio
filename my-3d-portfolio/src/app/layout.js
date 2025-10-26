import "./globals.css";

export const metadata = {
  title: "Abdelrahman Mohamed | Fullstack Developer",
  description: "Portfolio of Abdelrahman Mohamed - Fullstack Developer specializing in React, Next.js, Django, and modern web technologies",
  keywords: "Fullstack Developer, React, Next.js, Django, Python, JavaScript, Portfolio",
  authors: [{ name: "Abdelrahman Mohamed" }],
};

// Separate viewport export (Next.js 14+ requirement)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00d9ff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}