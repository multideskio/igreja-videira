import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const events = await sql`
      SELECT e.*, c.name as church_name, c.address as church_address
      FROM events e 
      LEFT JOIN churches c ON e.church_id = c.id 
      WHERE e.id = ${params.id}
    `

    if (events.length === 0) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(events[0])
  } catch (error) {
    console.error("Erro ao buscar evento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = request.headers.get("x-user-id")
    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
    }

    const eventData = await request.json()

    const event = await sql`
      UPDATE events SET
        title = ${eventData.title},
        description = ${eventData.description},
        date = ${eventData.date},
        time = ${eventData.time},
        location = ${eventData.location},
        address = ${eventData.address},
        image = ${eventData.image || null},
        is_free = ${eventData.is_free || false},
        allow_multiple_qr_code = ${eventData.allow_multiple_qr_code || false},
        max_tickets_per_purchase = ${eventData.max_tickets_per_purchase || 10},
        is_featured = ${eventData.is_featured || false},
        require_registration = ${eventData.require_registration || false},
        sales_start_date = ${eventData.sales_start_date || null},
        sales_end_date = ${eventData.sales_end_date || null},
        status = ${eventData.status || "draft"},
        capacity = ${eventData.capacity || 100},
        custom_fields = ${JSON.stringify(eventData.custom_fields || [])},
        ticket_variations = ${JSON.stringify(eventData.ticket_variations || [])},
        updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `

    if (event.length === 0) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(event[0])
  } catch (error) {
    console.error("Erro ao atualizar evento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = request.headers.get("x-user-id")
    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
    }

    await sql`
      DELETE FROM events WHERE id = ${params.id}
    `

    return NextResponse.json({ message: "Evento excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir evento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
