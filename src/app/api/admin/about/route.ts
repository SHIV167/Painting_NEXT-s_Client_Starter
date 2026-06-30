import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM "AboutGallery" LIMIT 1')
    return NextResponse.json(result.rows[0] || null)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, imageUrl, isActive } = body

    const existing = await query('SELECT * FROM "AboutGallery" LIMIT 1')
    
    let result
    if (existing.rows.length > 0) {
      result = await query(
        'UPDATE "AboutGallery" SET "title" = $1, "content" = $2, "imageUrl" = $3, "isActive" = $4, "updatedAt" = NOW() WHERE "id" = $5 RETURNING *',
        [title, content, imageUrl, isActive !== undefined ? isActive : true, existing.rows[0].id]
      )
    } else {
      result = await query(
        'INSERT INTO "AboutGallery" ("title", "content", "imageUrl", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
        [title, content, imageUrl, isActive !== undefined ? isActive : true]
      )
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save about gallery' }, { status: 500 })
  }
}
