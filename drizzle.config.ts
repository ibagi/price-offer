import type { Config } from 'drizzle-kit';

export default {
  schema: './api/db/schema.ts',
  out: './api/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
