import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';

dotenv.config();

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) {
    // eslint-disable-next-line no-console
    console.log('Skip admin seed: ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD not set');
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  await query(
    `INSERT INTO admin_users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash`,
    [email, hash]
  );
  // eslint-disable-next-line no-console
  console.log(`Seeded/updated admin user: ${email}`);
}

async function main() {
  await seedAdmin();
  // Optionally: seed products from static file later
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
