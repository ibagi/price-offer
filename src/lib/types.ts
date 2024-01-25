export interface PersistedState {
  contact: Contact;
  partner: Partner;
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
  person: 'Papp Zoltán',
  title: 'P-TOOL',
  subtitle: 'Szerszámgyártó Kft.',
  email: 'ptool.kft@gmail.com',
  phone: '+36 30 908 9291',
  address: '2234 Maglód Ady Endre utca 25-39 5/B',
  companyNumber: '13-09-217197',
  taxNumber: '27541706-2-13',
  bankAccountNumber: '12011739-01798762-00100009',
};

export interface Partner {
  address: string;
  companyNumber: string;
  taxNumber: string;
}

export const defaultPartner: Partner = {
  address: '-',
  companyNumber: '00-00-000000',
  taxNumber: '00000000-0-00',
};

export interface Offer {
  projectName: string;
  offerNumber: string;
  offerDate: string;
  offerPlace: string;
  taxRate: number;
  validity: number;
  currency: string;
}

export const defaultOffer: Offer = {
  projectName: '',
  offerNumber: `XX-PT-${new Date().getFullYear().toString().slice(2, 4)}-000`,
  offerDate: new Intl.DateTimeFormat().format(new Date()),
  offerPlace: 'Maglód',
  taxRate: 27,
  validity: 30,
  currency: 'HUF',
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
  materialPrice: 1
};
