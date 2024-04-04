import { z } from 'zod';
import { apiProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { contactSchema, offerSchema, partnerSchema } from './types';

export const appRouter = router({
  contact: {
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

    update: apiProcedure
      .input(contactSchema)
      .mutation(async ({ input, ctx }) => {
        await ctx.services.contact.updateContact(input);
      }),
  },

  offers: {
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

    copy: apiProcedure.input(z.string()).mutation(async ({ ctx, input}) => {
      return await ctx.services.offer.copyOffer(input);
    }),

    update: apiProcedure.input(offerSchema).mutation(async ({ ctx, input }) => {
      await ctx.services.offer.updateOffer(input);
    }),

    delete: apiProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      const success = ctx.services.offer.deleteOffer(input);
      if (!success) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Offer not found!',
        });
      }
    }),
  },

  partners: {
    list: apiProcedure.query(async ({ ctx }) => {
      return await ctx.services.partner.getPartners();
    }),

    update: apiProcedure
      .input(z.array(partnerSchema))
      .mutation(async ({ ctx, input }) => {
        await ctx.services.partner.updatePartners(input);
      }),
  },
});

export type AppRouter = typeof appRouter;
