import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

export interface JWTPayload {
  userId: number
  email: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export function setAuthCookie(token: string): void {
  if (typeof document !== 'undefined') {
    document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
  }
}

export function getAuthCookie(): string | null {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/auth_token=([^;]+)/)
    return match ? match[1] : null
  }
  return null
}

export function clearAuthCookie(): void {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_token=; path=/; max-age=0; secure; samesite=strict'
  }
}
