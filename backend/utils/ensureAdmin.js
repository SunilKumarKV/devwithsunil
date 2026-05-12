const bcrypt = require("bcrypt");
const pool = require("../config/db");

async function ensureAdminFromEnv() {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const adminName = process.env.ADMIN_NAME || "Sunil Kumar";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  if (adminPassword.length < 12) {
    console.warn("⚠️ ADMIN_PASSWORD is set but too short. Admin auto-seed skipped.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email)
     DO UPDATE SET
       name = EXCLUDED.name,
       password = EXCLUDED.password,
       role = 'admin',
       updated_at = now()`,
    [adminName, adminEmail, hashedPassword],
  );

  console.log(`✅ Admin account ready for ${adminEmail}`);
}

module.exports = ensureAdminFromEnv;
