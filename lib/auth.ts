// Versão simplificada para Next.js sem dependências externas
import { sql } from "./database"
import type { User } from "./database"

// Simulação simples de hash para desenvolvimento
function simpleHash(password: string): string {
  // Em produção, use bcrypt real
  return btoa(password + "salt")
}

function verifySimpleHash(password: string, hash: string): boolean {
  return simpleHash(password) === hash
}

// Token JWT simples para desenvolvimento
function createSimpleToken(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 dias
  }
  return btoa(JSON.stringify(payload))
}

function verifySimpleToken(token: string): { userId: string } | null {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null
    }
    return { userId: payload.userId }
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return simpleHash(password)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return verifySimpleHash(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return createSimpleToken(userId)
}

export function verifyToken(token: string): { userId: string } | null {
  return verifySimpleToken(token)
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT * FROM users WHERE id = ${id} AND status = 'active'
    `
    return users[0] || null
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT * FROM users WHERE email = ${email} AND status = 'active'
    `
    return users[0] || null
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error)
    return null
  }
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
  church_id?: string
  role?: string
  church_data?: Record<string, any>
}): Promise<User> {
  const passwordHash = await hashPassword(userData.password)

  const users = await sql`
    INSERT INTO users (name, email, password_hash, phone, address, church_id, role, church_data)
    VALUES (${userData.name}, ${userData.email}, ${passwordHash}, ${userData.phone || null}, 
            ${userData.address || null}, ${userData.church_id || null}, ${userData.role || "user"}, 
            ${JSON.stringify(userData.church_data || {})})
    RETURNING *
  `

  return users[0]
}

export async function updateLastLogin(userId: string): Promise<void> {
  try {
    await sql`
      UPDATE users SET last_login = NOW() WHERE id = ${userId}
    `
  } catch (error) {
    console.error("Erro ao atualizar último login:", error)
  }
}
