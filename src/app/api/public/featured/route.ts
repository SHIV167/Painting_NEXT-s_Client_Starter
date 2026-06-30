import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM "FeaturedWork" WHERE "isActive" = true ORDER BY "order" ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch featured works' }, { status: 500 })
  }
}
