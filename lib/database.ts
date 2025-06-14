import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

export const sql = neon(process.env.DATABASE_URL)

// Tipos TypeScript para o banco de dados
export interface Church {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  logo?: string
  pastor?: string
  social_media?: Record<string, any>
  settings?: Record<string, any>
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  phone?: string
  address?: string
  church_id?: string
  role: "superadmin" | "admin" | "scanner" | "user"
  church_data?: Record<string, any>
  avatar?: string
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
  last_login?: Date
}

export interface Event {
  id: string
  church_id: string
  title: string
  description?: string
  date: Date
  time: string
  location: string
  address: string
  image?: string
  is_free: boolean
  allow_multiple_qr_code: boolean
  max_tickets_per_purchase: number
  is_featured: boolean
  require_registration: boolean
  sales_start_date?: Date
  sales_end_date?: Date
  status: "draft" | "scheduled" | "active" | "completed" | "cancelled"
  capacity: number
  tickets_sold: number
  revenue: number
  custom_fields?: Record<string, any>[]
  ticket_variations?: Record<string, any>[]
  created_at: Date
  updated_at: Date
  created_by: string
}

export interface Purchase {
  id: string
  event_id: string
  church_id: string
  user_id: string
  quantity: number
  total_amount: number
  discount: number
  coupon_code?: string
  qr_code_option: "single" | "multiple"
  payment_method: "pix" | "card"
  payment_status: "pending" | "confirmed" | "failed" | "refunded"
  payment_id?: string
  participants: Record<string, any>[]
  created_at: Date
  updated_at: Date
}

export interface Coupon {
  id: string
  church_id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  start_date: Date
  end_date: Date
  usage_limit: number
  usage_count: number
  applicable_events: "all" | "specific"
  specific_event_ids?: string[]
  is_active: boolean
  created_at: Date
  updated_at: Date
  created_by: string
}

// Funções utilitárias para o banco
export async function testConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    return false
  }
}

export async function getTableCount(tableName: string): Promise<number> {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM ${sql(tableName)}`
    return Number.parseInt(result[0].count)
  } catch (error) {
    console.error(`Erro ao contar registros da tabela ${tableName}:`, error)
    return 0
  }
}
