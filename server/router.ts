import { z } from 'zod';
import { count, eq } from 'drizzle-orm';
import { contacts, offers, partners } from './db/schema';
import { apiProcedure, router } from './trpc';
import {
  contactSchema,
  defaultOffer,
  offerInputSchema,
  partnerSchema,
} from './types';
import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';

export const appRouter = router({
  contact: apiProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select().from(contacts).limit(1);
    if (result.length !== 1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Default contact data is missing!',
      });
    }

    return result[0];
  }),

  contactUpdate: apiProcedure
    .input(contactSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(contacts)
        .set({ ...input })
        .where(eq(contacts.id, input.id));
    }),

  offersByYear: apiProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.select().from(offers).where(eq(offers.year, input));
  }),

  offerCreate: apiProcedure.mutation(async ({ ctx }) => {
    const offerCount = await ctx.db
      .select({ count: count() })
      .from(offers)
      .where(eq(offers.year, new Date().getFullYear()));

    const sequence = offerCount[0].count + 1;
    const offer = {
      ...defaultOffer,
      id: nanoid(),
      year: new Date().getFullYear(),
      sequence,
    };

    await ctx.db.insert(offers).values({ ...offer });
    return offer;
  }),

  offerUpdate: apiProcedure
    .input(offerInputSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(offers)
        .set({ ...input })
        .where(eq(offers.id, input.id));
    }),

  offerDelete: apiProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { rowsAffected } = await ctx.db
        .delete(offers)
        .where(eq(offers.id, input));
      if (rowsAffected === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Offer not found!',
        });
      }
    }),

  partners: apiProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(partners).all();
  }),

  partnersUpdate: apiProcedure
    .input(z.array(partnerSchema))
    .mutation(async ({ ctx, input }) => {
      for (const partner of input) {
        const counts = await ctx.db
          .select({ count: count() })
          .from(partners)
          .where(eq(partners.id, partner.id));
        if (counts[0].count > 0) {
          await ctx.db.insert(partners).values(partner);
        } else {
          await ctx.db
            .update(partners)
            .set({ ...partner })
            .where(eq(partners.id, partner.id));
        }
      }
    }),
});

export type AppRouter = typeof appRouter;
