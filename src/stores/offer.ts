import { derived, writable } from 'svelte/store';
import { defaultOfferItem, type Offer, type OfferItem } from '../lib/types';

import * as prices from '../lib/prices';

export function createOfferStore(from: Offer, items: OfferItem[]) {
  const offer = writable(from);
  const offerItems = writable(items);

  function totalPrice(item: OfferItem) {
    return (item.materialPrice + item.workPrice) * item.amount;
  }

  const netto = derived([offer, offerItems], ([$offer, $offerItems]) =>
    prices.netto($offerItems.map(totalPrice), $offer.currency),
  );

  const tax = derived([offer, netto], ([$offer, $netto]) =>
    prices.tax($netto, $offer.taxRate, $offer.currency),
  );

  const brutto = derived([offer, netto], ([$offer, $netto]) =>
    prices.brutto($netto, $offer.taxRate, $offer.currency),
  );

  const hasItem = derived(offerItems, ($offerItems) => $offerItems.length > 0);

  function addItem() {
    offerItems.update(($items) => [...$items, { ...defaultOfferItem }]);
  }

  function removeItem(item: OfferItem) {
    offerItems.update(($items) => ($items = $items.filter((i) => i !== item)));
  }

  function removeItems() {
    offerItems.set([]);
  }

  return {
    offer,
    offerItems,
    hasItem,
    netto,
    tax,
    brutto,
    addItem,
    removeItem,
    removeItems,
    totalPrice,
  };
}
