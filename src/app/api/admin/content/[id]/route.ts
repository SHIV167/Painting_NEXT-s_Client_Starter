import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

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
      `UPDATE "Content" SET ${fields.join(', ')} WHERE "id" = $${paramIndex} RETURNING *`,
      values
    )
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
