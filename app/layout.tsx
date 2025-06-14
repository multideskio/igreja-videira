import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AIAssistant } from "@/components/shared/ai-assistant"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { AuthProvider } from "@/components/shared/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Igreja Videira - Plataforma de Eventos",
  description: "Plataforma de eventos e venda de ingressos da Igreja Videira",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-950 text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <AIAssistant />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
