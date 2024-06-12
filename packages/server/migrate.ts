import 'dotenv/config';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nanoid } from 'nanoid';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createDbClient } from 'server/db/';
import { contacts } from './db/schema';
import { defaultContact } from './types';

const db = createDbClient({
    authToken: process.env.TURSO_AUTH_TOKEN!,
    url: process.env.TURSO_CONNECTION_URL!,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seedDatabase() {
    const existingContacts = await db.select().from(contacts).all();
    if (existingContacts.length === 0) {
        await db.insert(contacts).values({ ...defaultContact, id: nanoid() });
    }
}

export async function migrateAndSeed() {
    await migrate(db, {
        migrationsFolder: resolve(__dirname, '../packages/server/migrations'),
    });

    await seedDatabase();
}
