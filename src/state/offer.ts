import { derived, writable, type Readable, type Writable } from 'svelte/store';
import {
  defaultOffer,
  defaultOfferItem,
  type Offer,
  type OfferItem,
} from '../lib/types';

import * as prices from '../lib/prices';

export class OfferState {
  offer: Writable<Offer>;

  hasItem: Readable<boolean>;
  netto: Readable<number>;
  tax: Readable<number>;
  brutto: Readable<number>;

  constructor(from: Offer | null = null) {
    this.offer = writable(from ?? { ...defaultOffer });

    this.netto = derived([this.offer], ([$offer]) =>
      prices.netto($offer.items.map(this.totalPrice), $offer.currency),
    );

    this.tax = derived([this.offer, this.netto], ([$offer, $netto]) =>
      prices.tax($netto, $offer.taxRate, $offer.currency),
    );

    this.brutto = derived([this.offer, this.netto], ([$offer, $netto]) =>
      prices.brutto($netto, $offer.taxRate, $offer.currency),
    );

    this.hasItem = derived(this.offer, ($offer) => $offer.items.length > 0);
  }

  addItem = () => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: [...$offer.items, { ...defaultOfferItem }],
    }));
  };

  removeItem = (item: OfferItem) => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: $offer.items.filter((i) => i !== item),
    }));
  };

  removeItems = () => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: [],
    }));
  };

  totalPrice(item: OfferItem) {
    return (item.materialPrice + item.workPrice) * item.amount;
  }
}
