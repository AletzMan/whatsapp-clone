import "./globals.css"
import { Montserrat } from "next/font/google"

const monserrat = Montserrat({ subsets: ["latin"] })

export const metadata = {
  title: "WhatsApp Web",
  description: "Clon de WhatsApp Web",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
