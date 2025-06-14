import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const search = searchParams.get("search")

    let query = sql`
      SELECT e.*, c.name as church_name 
      FROM events e 
      LEFT JOIN churches c ON e.church_id = c.id 
      WHERE e.status = 'active'
    `

    if (featured === "true") {
      query = sql`
        SELECT e.*, c.name as church_name 
        FROM events e 
        LEFT JOIN churches c ON e.church_id = c.id 
        WHERE e.status = 'active' AND e.is_featured = true
      `
    }

    if (search) {
      query = sql`
        SELECT e.*, c.name as church_name 
        FROM events e 
        LEFT JOIN churches c ON e.church_id = c.id 
        WHERE e.status = 'active' 
        AND (e.title ILIKE ${"%" + search + "%"} OR e.description ILIKE ${"%" + search + "%"})
      `
    }

    // Adicionar ordenação e limite
    const events = await sql`
      ${query}
      ORDER BY e.date ASC
      ${limit ? sql`LIMIT ${Number.parseInt(limit)}` : sql``}
    `

    return NextResponse.json(events)
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
    }

    const eventData = await request.json()

    const event = await sql`
      INSERT INTO events (
        church_id, title, description, date, time, location, address,
        image, is_free, allow_multiple_qr_code, max_tickets_per_purchase,
        is_featured, require_registration, sales_start_date, sales_end_date,
        status, capacity, custom_fields, ticket_variations, created_by
      ) VALUES (
        ${eventData.church_id}, ${eventData.title}, ${eventData.description},
        ${eventData.date}, ${eventData.time}, ${eventData.location}, ${eventData.address},
        ${eventData.image || null}, ${eventData.is_free || false}, 
        ${eventData.allow_multiple_qr_code || false}, ${eventData.max_tickets_per_purchase || 10},
        ${eventData.is_featured || false}, ${eventData.require_registration || false},
        ${eventData.sales_start_date || null}, ${eventData.sales_end_date || null},
        ${eventData.status || "draft"}, ${eventData.capacity || 100},
        ${JSON.stringify(eventData.custom_fields || [])}, 
        ${JSON.stringify(eventData.ticket_variations || [])}, ${userId}
      ) RETURNING *
    `

    return NextResponse.json(event[0], { status: 201 })
  } catch (error) {
    console.error("Erro ao criar evento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
