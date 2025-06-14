import type React from "react"
import { UserAccountNav } from "@/components/client/user-account-nav"

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <UserAccountNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
