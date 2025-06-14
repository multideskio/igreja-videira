import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const purchaseData = await request.json()

    // Gerar QR codes únicos para cada participante
    const participantsWithQR = purchaseData.participants.map((participant: any) => ({
      ...participant,
      qr_code: uuidv4(),
      is_used: false,
    }))

    const purchase = await sql`
      INSERT INTO purchases (
        event_id, church_id, user_id, quantity, total_amount, discount,
        coupon_code, qr_code_option, payment_method, payment_status,
        participants
      ) VALUES (
        ${purchaseData.event_id}, ${purchaseData.church_id}, ${purchaseData.user_id},
        ${purchaseData.quantity}, ${purchaseData.total_amount}, ${purchaseData.discount || 0},
        ${purchaseData.coupon_code || null}, ${purchaseData.qr_code_option},
        ${purchaseData.payment_method}, 'pending',
        ${JSON.stringify(participantsWithQR)}
      ) RETURNING *
    `

    // Atualizar contadores do evento
    await sql`
      UPDATE events SET 
        tickets_sold = tickets_sold + ${purchaseData.quantity},
        revenue = revenue + ${purchaseData.total_amount}
      WHERE id = ${purchaseData.event_id}
    `

    // Atualizar contadores das variações
    for (const participant of participantsWithQR) {
      await sql`
        UPDATE ticket_variations SET 
          sold = sold + 1
        WHERE id = ${participant.ticket_variation_id}
      `
    }

    return NextResponse.json({ purchase: purchase[0] }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar compra:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")
    const event_id = searchParams.get("event_id")

    let query = `
      SELECT 
        p.*,
        e.title as event_title,
        e.event_date,
        e.location,
        c.name as church_name
      FROM purchases p
      LEFT JOIN events e ON p.event_id = e.id
      LEFT JOIN churches c ON p.church_id = c.id
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    if (user_id) {
      query += ` AND p.user_id = $${paramIndex}`
      params.push(user_id)
      paramIndex++
    }

    if (event_id) {
      query += ` AND p.event_id = $${paramIndex}`
      params.push(event_id)
      paramIndex++
    }

    query += ` ORDER BY p.created_at DESC`

    const purchases = await sql(query, params)

    return NextResponse.json({ purchases })
  } catch (error) {
    console.error("Erro ao buscar compras:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
