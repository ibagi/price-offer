import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../api';
import { createContext } from '../api/trpc';

export const onRequest = async (opts) => {
  return fetchRequestHandler({
    endpoint: 'trpc',
    router: appRouter,
    createContext,
    req: opts.request,
  });
};
