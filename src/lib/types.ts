import { z } from "zod";

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
  name: z.string(),
  address: z.string(),
  companyNumber: z.string(),
  taxNumber: z.string(),
});

export const persistedStateSchema = z.object({
  contact: z.object(contactSchema.shape),
  partners: z.array(z.object(partnerSchema.shape))
});

export type PersistedState = z.infer<typeof persistedStateSchema>;
export type Contact = z.infer<typeof contactSchema>; 
export type Partner = z.infer<typeof partnerSchema>; 

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
  name: '',
  address: '',
  companyNumber: '00-00-000000',
  taxNumber: '00000000-0-00',
};

export interface Offer {
  projectName: string;
  offerNumber: string;
  offerDate: Date;
  offerPlace: string;
  validity: number;
  productionTimeInDays: number;
}

export const defaultOffer: Offer = {
  projectName: '',
  offerNumber: `XX-PT-${new Date().getFullYear().toString().slice(2, 4)}-000`,
  offerDate: new Date(),
  offerPlace: 'Maglód',
  validity: 30,
  productionTimeInDays: 8,
};

export interface OfferItem {
  name: string;
  amount: number;
  workPrice: number;
  materialPrice: number;
}

export const defaultOfferItem: OfferItem = {
  name: '',
  amount: 1,
  workPrice: 1,
  materialPrice: 1,
};

export type Currency = 'HUF' | 'EUR';
export const currencies: Currency[] = ['HUF', 'EUR'];
