"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  // Não mostrar o footer nas páginas de admin
  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Igreja Videira</h3>
            <p className="mb-4">
              Somos uma comunidade cristã comprometida com o crescimento espiritual e o discipulado.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="transition-colors hover:text-green-400">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="transition-colors hover:text-green-400">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="transition-colors hover:text-green-400">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="transition-colors hover:text-green-400">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Horários</h3>
            <ul className="space-y-2">
              <li>Culto de Celebração: Domingo, 10h e 18h</li>
              <li>Culto de Oração: Quarta, 19h30</li>
              <li>Células: Durante a semana</li>
              <li>Escola Bíblica: Domingo, 9h</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-green-400" />
                contato@igrejavideira.com.br
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-green-400" />
                (11) 99999-9999
              </li>
              <li>Av. Principal, 1000 - Centro</li>
              <li>São Paulo - SP</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Igreja Videira. Todos os direitos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/termos" className="transition-colors hover:text-green-400">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="transition-colors hover:text-green-400">
              Política de Privacidade
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-1 transition-colors hover:text-green-400"
            >
              <Settings className="h-3 w-3" />
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
