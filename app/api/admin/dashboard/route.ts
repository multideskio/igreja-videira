import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const church_id = searchParams.get("church_id")

    // Métricas gerais
    const metrics = await sql`
      SELECT 
        COUNT(DISTINCT e.id) as total_events,
        COUNT(DISTINCT u.id) as total_users,
        COALESCE(SUM(e.tickets_sold), 0) as total_tickets_sold,
        COALESCE(SUM(e.revenue), 0) as total_revenue
      FROM events e
      LEFT JOIN users u ON u.church_id = e.church_id
      WHERE e.church_id = ${church_id || "550e8400-e29b-41d4-a716-446655440000"}
    `

    // Vendas por mês (últimos 6 meses)
    const salesByMonth = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as purchases,
        SUM(total_amount) as revenue
      FROM purchases 
      WHERE church_id = ${church_id || "550e8400-e29b-41d4-a716-446655440000"}
        AND created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `

    // Eventos mais populares
    const popularEvents = await sql`
      SELECT 
        e.title,
        e.tickets_sold,
        e.capacity,
        ROUND((e.tickets_sold::decimal / NULLIF(e.capacity, 0)) * 100, 1) as occupancy_rate
      FROM events e
      WHERE e.church_id = ${church_id || "550e8400-e29b-41d4-a716-446655440000"}
        AND e.status IN ('active', 'completed')
      ORDER BY e.tickets_sold DESC
      LIMIT 5
    `

    // Crescimento de usuários
    const userGrowth = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as new_users
      FROM users 
      WHERE church_id = ${church_id || "550e8400-e29b-41d4-a716-446655440000"}
        AND created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `

    return NextResponse.json({
      metrics: metrics[0],
      salesByMonth,
      popularEvents,
      userGrowth,
    })
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
