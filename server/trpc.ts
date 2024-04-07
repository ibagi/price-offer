import superjson from 'superjson';
import { TRPCError, initTRPC } from '@trpc/server';
import { initializeServices } from './services';
import { ZodError } from 'zod';

interface Context {
  isAuthorized: boolean;
  services: ReturnType<typeof initializeServices>;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
});
