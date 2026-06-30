import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query('SELECT * FROM "FeaturedWork" WHERE "id" = $1', [parseInt(params.id)])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Featured work not found' }, { status: 404 })
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch featured work' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const fields = []
    const values = []
    let paramIndex = 1

    Object.keys(body).forEach((key) => {
      fields.push(`"${key}" = $${paramIndex}`)
      values.push(body[key])
      paramIndex++
    })

    fields.push(`"updatedAt" = NOW()`)
    values.push(parseInt(params.id))

    const result = await query(
      `UPDATE "FeaturedWork" SET ${fields.join(', ')} WHERE "id" = $${paramIndex} RETURNING *`,
      values
    )
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update featured work' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM "FeaturedWork" WHERE "id" = $1', [parseInt(params.id)])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete featured work' }, { status: 500 })
  }
}
