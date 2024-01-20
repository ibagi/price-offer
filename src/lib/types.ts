export interface AppState {
  partners: string[];
}

export interface OfferItem {
  name: string;
  amount: number;
  unit: string;
  unitPrice: number;
}

export const defaultOfferItem: OfferItem = {
  name: 'Tétel1',
  amount: 1,
  unit: 'db',
  unitPrice: 100,
};
