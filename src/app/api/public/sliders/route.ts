import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deviceType = searchParams.get('deviceType') || 'desktop'

    const result = await query(
      'SELECT * FROM "Slider" WHERE "isActive" = true AND "deviceType" = $1 ORDER BY "order" ASC',
      [deviceType]
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 })
  }
}
