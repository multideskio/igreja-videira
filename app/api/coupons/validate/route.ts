import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { code, event_id, church_id } = await request.json()

    if (!code || !event_id || !church_id) {
      return NextResponse.json({ error: "Código, evento e igreja são obrigatórios" }, { status: 400 })
    }

    const coupons = await sql`
      SELECT * FROM coupons 
      WHERE code = ${code} 
        AND church_id = ${church_id}
        AND is_active = true
        AND start_date <= NOW()
        AND end_date >= NOW()
        AND (usage_limit = 0 OR usage_count < usage_limit)
    `

    if (coupons.length === 0) {
      return NextResponse.json({ error: "Cupom inválido ou expirado" }, { status: 404 })
    }

    const coupon = coupons[0]

    // Verificar se o cupom se aplica ao evento
    if (coupon.applicable_events === "specific") {
      const specificEventIds = coupon.specific_event_ids || []
      if (!specificEventIds.includes(event_id)) {
        return NextResponse.json({ error: "Cupom não válido para este evento" }, { status: 400 })
      }
    }

    return NextResponse.json({
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      },
    })
  } catch (error) {
    console.error("Erro ao validar cupom:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
