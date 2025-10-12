import './globals.css'

export const metadata = {
  title: 'Abdelrahman Mohamed | Fullstack Developer',
  description: 'Portfolio of Abdelrahman Mohamed - Fullstack Developer specializing in HTML, CSS, JavaScript, Python, and Django',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}