import type { Config } from 'drizzle-kit';

export default {
  schema: './packages/server/db/schema.ts',
  out: './packages/server/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
