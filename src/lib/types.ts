export interface PersistedState {
  contact: Contact;
  partners: Partner[];
}

export interface Contact {
  person: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  companyNumber: string;
  taxNumber: string;
  bankAccountNumber: string;
}

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

export interface Partner {
  name: string;
  address: string;
  companyNumber: string;
  taxNumber: string;
}

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
  currency: Currency;
  productionTimeInDays: number;
}

export const defaultOffer: Offer = {
  projectName: '',
  offerNumber: `XX-PT-${new Date().getFullYear().toString().slice(2, 4)}-000`,
  offerDate: new Date(),
  offerPlace: 'Maglód',
  validity: 30,
  currency: 'HUF',
  productionTimeInDays: 8
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
export const currencies: Currency[] = [
  'HUF',
  'EUR'
];
