import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM "Slider" ORDER BY "deviceType" ASC, "order" ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, subtitle, imageUrl, mobileUrl, linkUrl, order, isActive, deviceType } = body

    const result = await query(
      'INSERT INTO "Slider" ("title", "subtitle", "imageUrl", "mobileUrl", "linkUrl", "order", "isActive", "deviceType", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *',
      [title, subtitle, imageUrl, mobileUrl, linkUrl, parseInt(order), isActive !== undefined ? isActive : true, deviceType]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 })
  }
}
