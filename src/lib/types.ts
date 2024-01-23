export interface AppState {
  defaultOffer: Offer;
  partners: Partner[];
}

export interface Partner {
  name: string;
}

export interface Offer {
  projectName: string;
  offerNumber: string;
  offerDate: Date;
  offerPlace: string;
  taxRate: number;
  validity: number;
  currency: string;
}

export const defaultOffer: Offer = {
  projectName: '',
  offerNumber: `XX-PT-${new Date().getFullYear().toString().slice(2, 4)}-000`,
  offerDate: new Date(),
  offerPlace: 'Maglód',
  taxRate: 0.27,
  validity: 30,
  currency: 'HUF'
}

export interface OfferItem {
  name: string;
  amount: number;
  unitPrice: number;
  workPrice: number;
  materialPrice: number;
}

export const defaultOfferItem: OfferItem = {
  name: 'Tétel neve',
  amount: 1,
  unitPrice: 100,
  workPrice: 1,
  materialPrice: 1,
};
