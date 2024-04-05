import tRPCPlugin from 'cloudflare-pages-plugin-trpc';
import { appRouter } from '../server/router';
import { type PagesFunction } from '@cloudflare/workers-types';
import { createDbClient } from '../server/db';
import { initializeServices } from '../server/services';
import { authorizeRequest } from '../server/services/auth';

interface Env {
  TURSO_CONNECTION_URL: string;
  TURSO_AUTH_TOKEN: string;
  CLERK_PEM_PUBLIC_KEY: string;
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext: ({ req, env }) => {
    const isAuthorized = authorizeRequest(
      req.headers.get('Authorization'),
      env.CLERK_PEM_PUBLIC_KEY,
    );
    return {
      isAuthorized,
      services: initializeServices(
        createDbClient({
          url: env.TURSO_CONNECTION_URL,
          authToken: env.TURSO_AUTH_TOKEN,
        }),
      ),
    };
  },
});
