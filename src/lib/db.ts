import { Pool } from 'pg'

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

console.log('DATABASE_URL from env:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'))
console.log('POSTGRES_URL from env:', process.env.POSTGRES_URL?.replace(/:[^:@]+@/, ':****@'))
console.log('Using connection string:', connectionString?.replace(/:[^:@]+@/, ':****@'))

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error: any) {
    console.error('Database query error:', error.message)
    console.error('Full error:', error)
    throw error
  }
}

export default pool
