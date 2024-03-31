import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../api';

export const onRequest = async (opts) => {
  return fetchRequestHandler({
    endpoint: 'trpc',
    router: appRouter,
    createContext: async ({ req }) => {},
    req: opts.request,
  });
};
