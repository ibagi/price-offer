import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../api/db/';
import { migrate } from 'drizzle-orm/libsql/migrator';

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  await migrate(db, {
    migrationsFolder: resolve(__dirname, '../api/migrations'),
  });
})();
