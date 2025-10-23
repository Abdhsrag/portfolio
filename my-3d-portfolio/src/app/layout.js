import "./globals.css";

export const metadata = {
  title: "Abdelrahman Mohamed | Fullstack Developer",
  description: "Portfolio of Abdelrahman Mohamed - Fullstack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}