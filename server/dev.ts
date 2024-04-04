import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { db } from './db';
import { initializeServices } from './services';
import { authorizeRequest } from './services/auth';

const handler = createHTTPHandler({
  middleware: cors(),
  router: appRouter,
  createContext: ({ req }) => {
    return {
      isAuthorized: authorizeRequest(req.headers.authorization),
      services: initializeServices(db),
    };
  },
});

createServer((req, res) => handler(req, res)).listen(3333);
