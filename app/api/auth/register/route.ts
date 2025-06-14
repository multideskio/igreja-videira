import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByEmail, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, address, church_data } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar se usuário já existe
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe com este email" }, { status: 409 })
    }

    // Criar usuário
    const user = await createUser({
      name,
      email,
      password,
      phone,
      address,
      church_data,
    })

    // Gerar token
    const token = generateToken(user.id)

    // Remover senha do retorno
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro no registro:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
