import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM "AboutGallery" WHERE "isActive" = true LIMIT 1')
    return NextResponse.json(result.rows[0] || null)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about gallery' }, { status: 500 })
  }
}
