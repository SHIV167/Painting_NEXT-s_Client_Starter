const bcrypt = require('bcryptjs')

async function generatePasswordHash() {
  const password = 'admin123'
  const hash = await bcrypt.hash(password, 10)
  console.log('Password hash for "admin123":', hash)
}

generatePasswordHash()
