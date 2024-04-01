import { createServer } from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { createDbConnection } from './db';

const handler = createHTTPHandler({
  router: appRouter,
  createContext: () => {
    return {
        isAuthorized: true,
        db: createDbConnection()
    }
  }
});

createServer((req, res) => handler(req, res)).listen(3333);
