import 'dotenv/config';
import { createServer } from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { db } from './db';
import { initializeServices } from './services';

const handler = createHTTPHandler({
  router: appRouter,
  createContext: () => {
    return {
      isAuthorized: true,
      services: initializeServices(db),
    };
  },
});

createServer((req, res) => handler(req, res)).listen(3333);
