import jwt from 'jsonwebtoken';
import { TRPCError, initTRPC } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createDbConnection } from './db';

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const db = createDbConnection();

  if (!req.headers.has('authorization')) {
    return { isAuthorized: false, db };
  }

  const headerParts = req.headers.get('authorization')?.split(' ');
  if (headerParts?.length !== 2) {
    return { isAuthorized: false, db};
  }

  try {
    const token = headerParts[0];
    const _ = jwt.verify(token, process.env.CLERK_PEM_PUBLIC_KEY!);
    return { isAuthorized: true, db };
  } catch {
    return { isAuthorized: false, db };
  }
}

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
});
