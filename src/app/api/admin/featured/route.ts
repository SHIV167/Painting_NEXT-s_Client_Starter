import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM "FeaturedWork" ORDER BY "order" ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch featured works' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, artistName, year, order, isActive } = body

    const result = await query(
      'INSERT INTO "FeaturedWork" ("title", "description", "imageUrl", "artistName", "year", "order", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [title, description, imageUrl, artistName, year ? parseInt(year) : null, parseInt(order), isActive !== undefined ? isActive : true]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create featured work' }, { status: 500 })
  }
}
