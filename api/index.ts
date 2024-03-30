import { z } from 'zod';
import { count, eq } from 'drizzle-orm';
import { db } from './db';
import { contacts, offers, partners } from './db/schema';
import { publicProcedure, router } from './trpc';
import {
  contactSchema,
  defaultOffer,
  offerInputSchema,
  partnerSchema,
} from './types';
import { TRPCError } from '@trpc/server';

const appRouter = router({
  contact: publicProcedure.query(async () => {
    const result = await db.select().from(contacts).limit(1);
    if (result.length !== 1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Default contact data is missing!',
      });
    }

    return result[0];
  }),

  contactUpdate: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      await db
        .update(contacts)
        .set({ ...input })
        .where(eq(contacts.id, input.id));
    }),

  offersByYear: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db.select().from(offers).where(eq(offers.year, input));
  }),

  offerCreate: publicProcedure.mutation(async () => {
    const offerCount = await db
      .select({ count: count() })
      .from(offers)
      .where(eq(offers.year, new Date().getFullYear()));

    const offer = {
      ...defaultOffer,
      sequence: offerCount[0].count + 1,
    };

    await db.insert(offers).values({ ...offer });
    return offer;
  }),

  offerUpdate: publicProcedure
    .input(offerInputSchema)
    .mutation(async ({ input }) => {
      await db
        .update(offers)
        .set({ ...input })
        .where(eq(offers.id, input.id));
    }),

  offerDelete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const { rowsAffected } = await db
      .delete(offers)
      .where(eq(offers.id, input));
    if (rowsAffected === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Offer not found!',
      });
    }
  }),

  partners: publicProcedure.query(async () => {
    return await db.select().from(partners).all();
  }),

  partnersUpdate: publicProcedure
    .input(z.array(partnerSchema))
    .mutation(async ({ input }) => {
      for (const partner of input) {
        const counts = await db
          .select({ count: count() })
          .from(partners)
          .where(eq(partners.id, partner.id));
        if (counts[0].count > 0) {
          await db.insert(partners).values(partner);
        } else {
          await db
            .update(partners)
            .set({ ...partner })
            .where(eq(partners.id, partner.id));
        }
      }
    }),
});

export type AppRouter = typeof appRouter;
