import Script from "next/script"
import "./globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kristen Cheung",
  description: "My personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  )
}
