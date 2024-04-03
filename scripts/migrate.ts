import 'dotenv/config';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nanoid } from 'nanoid';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '../server/db/';
import { contacts } from '../server/db/schema';
import { defaultContact } from '../server/types';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seedDatabase() {
  const existingContacts = await db.select().from(contacts).all();
  if (existingContacts.length === 0) {
    await db.insert(contacts).values({ ...defaultContact, id: nanoid() });
  }
}

(async () => {
  await migrate(db, {
    migrationsFolder: resolve(__dirname, '../server/migrations'),
  });

  await seedDatabase();
})();
