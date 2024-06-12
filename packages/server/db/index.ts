import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

interface DbParams {
  url: string;
  authToken: string;
}

export function createDbClient(params: DbParams) {
  const client = createClient(params);
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDbClient>;
