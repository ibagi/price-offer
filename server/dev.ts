import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { createDbClient } from './db';
import { initializeServices } from './services';
import { authorizeRequest } from './services/auth';

const handler = createHTTPHandler({
  middleware: cors(),
  router: appRouter,
  createContext: async ({ req }) => {
    return {
      isAuthorized: await authorizeRequest(
        req.headers.authorization,
        process.env.CLERK_PEM_PUBLIC_KEY!,
      ),
      services: initializeServices(
        createDbClient({
          url: process.env.TURSO_CONNECTION_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN!,
        }),
      ),
    };
  },
});

createServer((req, res) => handler(req, res)).listen(3333);
