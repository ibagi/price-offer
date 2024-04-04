import superjson from 'superjson';
import { TRPCError, initTRPC } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from './db';
import { authorizeRequest } from './services/auth';
import { initializeServices } from './services';

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const isAuthorized = authorizeRequest(req.headers.get('Authorization'));
  return {
    isAuthorized,
    services: initializeServices(db),
  };
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
});
