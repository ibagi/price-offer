import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { defaultOfferItem, type Offer, type OfferItem } from '../lib/types';

import * as prices from '../lib/prices';

export class OfferStore {
  offer: Writable<Offer>;
  offerItems: Writable<OfferItem[]>;

  hasItem: Readable<boolean>;
  netto: Readable<number>;
  tax: Readable<number>;
  brutto: Readable<number>;

  constructor(from: Offer, items: OfferItem[]) {
    this.offer = writable(from);
    this.offerItems = writable(items);

    this.netto = derived(
      [this.offer, this.offerItems],
      ([$offer, $offerItems]) =>
        prices.netto($offerItems.map(this.totalPrice), $offer.currency),
    );

    this.tax = derived([this.offer, this.netto], ([$offer, $netto]) =>
      prices.tax($netto, $offer.taxRate, $offer.currency),
    );

    this.brutto = derived([this.offer, this.netto], ([$offer, $netto]) =>
      prices.brutto($netto, $offer.taxRate, $offer.currency),
    );

    this.hasItem = derived(
      this.offerItems,
      ($offerItems) => $offerItems.length > 0,
    );
  }

  addItem = () => {
    this.offerItems.update(($items) => [...$items, { ...defaultOfferItem }]);
  };

  removeItem = (item: OfferItem) => {
    this.offerItems.update(
      ($items) => ($items = $items.filter((i) => i !== item)),
    );
  };

  removeItems = () => {
    this.offerItems.set([]);
  };

  totalPrice(item: OfferItem) {
    return (item.materialPrice + item.workPrice) * item.amount;
  }
}
