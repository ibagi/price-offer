import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../server/router';
import { createContext } from '../server/trpc';

export const onRequest = async (opts) => {
  return fetchRequestHandler({
    endpoint: 'trpc',
    router: appRouter,
    createContext,
    req: opts.request,
  });
};
