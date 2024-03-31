import jwt from 'jsonwebtoken';
import { TRPCError, initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from './db';

export async function createContext({ req }: FetchCreateContextFnOptions) {
  if (!req.headers.has('authorization')) {
    return { isAuthorized: false };
  }

  const headerParts = req.headers.get('authorization')?.split(' ');
  if (headerParts?.length !== 2) {
    return { isAuthorized: false };
  }

  try {
    const token = headerParts[0];
    const _ = jwt.verify(token, process.env.CLERK_PEM_PUBLIC_KEY!);
    return { isAuthorized: true };
  } catch {
    return { isAuthorized: false };
  }
}

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const apiProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { db } });
});
