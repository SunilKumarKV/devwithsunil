require('../config/environment');

const bcrypt = require('bcrypt');
const pool = require('../config/db');

const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'devwithsunilyt@gmail.com';
const adminName = process.env.ADMIN_NAME || 'Sunil Kumar';
const adminPassword = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
  if (!adminPassword || adminPassword.length < 12) {
    console.error('❌ ADMIN_PASSWORD is required and must be at least 12 characters.');
    console.error('Set it in backend/.env before running: npm run seed:admin');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email)
     DO UPDATE SET
       name = EXCLUDED.name,
       password = EXCLUDED.password,
       role = 'admin',
       updated_at = now()
     RETURNING id, name, email, role`,
    [adminName, adminEmail, hashedPassword],
  );

  console.log('✅ Admin user is ready:', {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    role: result.rows[0].role,
  });
}

seedAdmin()
  .catch((error) => {
    console.error('❌ Failed to seed admin user:', error.message);
    process.exit(1);
  })
  .finally(() => pool.end());
