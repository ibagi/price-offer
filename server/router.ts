import superjson from 'superjson';
import { z } from 'zod';
import { TRPCError, initTRPC } from '@trpc/server';
import { contactSchema, offerUpdateSchema, partnerSchema } from './types';
import { initializeServices } from './services';
import { ValidationError } from './errors';
import type { UserContext } from './services/auth';

interface Context {
  userContext: UserContext;
  services: ReturnType<typeof initializeServices>;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const apiProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userContext.isAuthenticated) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
});

const userRouter = t.router({
  initialize: apiProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userContext.userId;
    const services = ctx.services;

    if (!userId) {
      return;
    }

    const metadata = await services.auth.getPrivateMetadata(userId);

    if (!metadata.pinHash) {
      const pinHash = await services.encryption.register({
        userId,
        pin: process.env.DEFAULT_PIN!,
      });

      await services.auth.setPrivateMetadata(userId, {
        pinHash,
      });
    }
  }),
});

const contactRouter = t.router({
  get: apiProcedure.query(async ({ ctx }) => {
    const contact = await ctx.services.contact.getContact();
    if (!contact) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Default contact data is missing!',
      });
    }

    return contact;
  }),

  update: apiProcedure.input(contactSchema).mutation(async ({ input, ctx }) => {
    await ctx.services.contact.updateContact(input);
  }),
});

const offerRouter = t.router({
  offerYears: apiProcedure.query(async ({ ctx }) => {
    return await ctx.services.offer.getOfferYears();
  }),

  byYear: apiProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.services.offer.getOffersByYear(input);
  }),

  byId: apiProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.services.offer.getById(input);
  }),

  create: apiProcedure.mutation(async ({ ctx }) => {
    return await ctx.services.offer.createOffer();
  }),

  copy: apiProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.services.offer.copyOffer(input);
  }),

  update: apiProcedure
    .input(offerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.services.offer.updateOffer(input);
      } catch (err) {
        throw new TRPCError({
          cause: err,
          code:
            err instanceof ValidationError
              ? 'BAD_REQUEST'
              : 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  delete: apiProcedure
    .input(z.object({ offerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const success = await ctx.services.offer.deleteOffer(input.offerId);
      if (!success) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Offer not found!',
        });
      }
    }),
});

const partnerRouter = t.router({
  list: apiProcedure.query(async ({ ctx }) => {
    return await ctx.services.partner.getPartners();
  }),

  update: apiProcedure
    .input(z.array(partnerSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.services.partner.updatePartners(input);
    }),
});

export const appRouter = t.router({
  user: userRouter,
  contact: contactRouter,
  offers: offerRouter,
  partners: partnerRouter,
});

export type AppRouter = typeof appRouter;
