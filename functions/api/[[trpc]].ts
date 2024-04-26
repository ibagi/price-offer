import { appRouter } from '../../server/router';
import { Database, createDbClient } from '../../server/db';
import { initializeServices } from '../../server/services';
import { authorizeRequest } from '../../server/services/auth';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

interface Env {
  TURSO_CONNECTION_URL: string;
  TURSO_AUTH_TOKEN: string;
  CLERK_PEM_PUBLIC_KEY: string;
}

let db: Database;

async function createContext({ req, env }) {
  const isAuthorized = await authorizeRequest(
    req.headers.get('authorization'),
    env.CLERK_PEM_PUBLIC_KEY,
  );

  if (!db) {
    db = createDbClient({
      url: env.TURSO_CONNECTION_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    })
  }
  
  return {
    isAuthorized,
    services: initializeServices(db),
  };
}

export const onRequest: PagesFunction<Env> = (event) => {
  return fetchRequestHandler({
    router: appRouter,
    endpoint: '/api/trpc',
    req: event.request,
    createContext: async ({ req }) =>
      await createContext({ req, env: event.env }),
    onError({ error, path }) {
      console.error(`tRPC Error on '${path}'`, error);
    },
  });
};
