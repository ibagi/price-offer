import superjson from 'superjson';
import { TRPCError, initTRPC } from '@trpc/server';
import { initializeServices } from './services';

interface Context {
  isAuthorized: boolean;
  services: ReturnType<typeof initializeServices>;
}

const t = initTRPC.context<Context>().create({
  // transformer: superjson
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
});
