import { z } from 'zod';

export const offerItemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  workPrice: z.number(),
  materialPrice: z.number(),
});

export type OfferItem = z.infer<typeof offerItemSchema>;
