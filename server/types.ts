import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import { contacts, offers, partners } from './db/schema';

export const offerItemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  workPrice: z.number(),
  materialPrice: z.number(),
  description: z.optional(z.string()),
});

export const contactSchema = createSelectSchema(contacts);
export const partnerSchema = createSelectSchema(partners);
export const offerSchema = createSelectSchema(offers, {
  items: z.array(offerItemSchema),
});

export type Contact = z.infer<typeof contactSchema>;
export type Partner = z.infer<typeof partnerSchema>;
export type Offer = z.infer<typeof offerSchema>;
export type OfferItem = z.infer<typeof offerItemSchema>;
export type OfferStatus = Offer['status'];
export type Currency = Offer['currency'];

export const offerUpdateSchema = offerSchema.omit({
  sequence: true,
  year: true,
  createdAt: true,
});

export type OfferUpdate = z.infer<typeof offerUpdateSchema>;

export const defaultContact: Contact = {
  id: '',
  person: '-',
  title: '-',
  subtitle: '-',
  email: 'mail@example.com',
  phone: '+36 00 000 0000',
  address: '-',
  companyNumber: '00-00-000000',
  taxNumber: '000000-0-00',
  bankAccountNumber: '000000-000000-00100009',
};

export const defaultPartner: Partner = {
  id: '',
  name: '',
  address: '',
  companyNumber: '00-00-000000',
  taxNumber: '00000000-0-00',
};

export const defaultOffer: Offer = {
  id: '',
  sequence: 0,
  year: 0,
  projectName: '',
  offerNumber: '',
  createdAt: new Date(),
  offerDate: new Date(),
  offerPlace: 'Maglód',
  validity: 30,
  productionTimeInDays: 8,
  currency: 'HUF',
  taxRate: 27,
  status: 'created',
  partnerId: null,
  items: [],
};

export const defaultOfferItem: OfferItem = {
  name: '',
  amount: 1,
  workPrice: 0,
  materialPrice: 0,
  description: '',
};

export const offerStatuses: OfferStatus[] = [
  'created',
  'sent',
  'accepted',
  'rejected',
];

export const currencies: Currency[] = ['HUF', 'EUR'];

export function offerNumberPrefix(date: Date) {
  const shortYear = date.getFullYear().toString().slice(2, 4);
  return `AJ-PT-${shortYear}-`;
}

export function generateOfferNumber(sequence: number) {
  const prefix = offerNumberPrefix(new Date());
  const sequenceString = String(sequence).padStart(3, '0');
  return `${prefix}${sequenceString}`;
}
