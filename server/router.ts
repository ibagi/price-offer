import superjson from 'superjson';
import { z } from 'zod';
import { TRPCError, initTRPC } from '@trpc/server';
import { contactSchema, offerSchema, partnerSchema } from './types';
import { initializeServices } from './services';

interface Context {
  isAuthorized: boolean;
  services: ReturnType<typeof initializeServices>;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const apiProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx });
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

  update: apiProcedure.input(offerSchema).mutation(async ({ ctx, input }) => {
    await ctx.services.offer.updateOffer(input);
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
  contact: contactRouter,
  offers: offerRouter,
  partners: partnerRouter,
});

export type AppRouter = typeof appRouter;
