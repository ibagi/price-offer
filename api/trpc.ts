import { initTRPC } from '@trpc/server';
import { db } from './db';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use((opts) => {
  return opts.next({
    ctx: {
      db,
    },
  });
});
