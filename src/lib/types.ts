import { z } from 'zod';

export const contactSchema = z.object({
  person: z.string(),
  title: z.string(),
  subtitle: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  companyNumber: z.string(),
  taxNumber: z.string(),
  bankAccountNumber: z.string(),
});

export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  companyNumber: z.string(),
  taxNumber: z.string(),
});

const currencySchema = z.enum(['HUF', 'EUR']);
const offerStatusSchema = z.enum(['created', 'sent', 'accepted', 'rejected']);

export const offerItemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  workPrice: z.number(),
  materialPrice: z.number(),
});

export const offerSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  sequence: z.number(),
  projectName: z.string(),
  offerNumber: z.string(),
  offerDate: z.date(),
  offerPlace: z.string(),
  validity: z.number(),
  productionTimeInDays: z.number(),
  currency: currencySchema,
  taxRate: z.number(),
  status: offerStatusSchema,
  partnerId: z.string(),
  items: z.array(offerItemSchema),
});

export type Contact = z.infer<typeof contactSchema>;
export type Partner = z.infer<typeof partnerSchema>;

export type Currency = z.infer<typeof currencySchema>;

export type OfferStatus = z.infer<typeof offerStatusSchema>;
export type Offer = z.infer<typeof offerSchema>;
export type OfferItem = z.infer<typeof offerItemSchema>;

export const currencies: Currency[] = ['HUF', 'EUR'];

export const defaultContact: Contact = {
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
  partnerId: '',
  items: [],
};

export const defaultOfferItem: OfferItem = {
  name: '',
  amount: 1,
  workPrice: 1,
  materialPrice: 1,
};

export const offerStatuses: OfferStatus[] = [
  'created',
  'sent',
  'accepted',
  'rejected',
];
