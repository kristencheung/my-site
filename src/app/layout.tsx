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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js" />
      </head>
      <body className="bg-[#1E1E1E]">{children}</body>
    </html>
  )
}
