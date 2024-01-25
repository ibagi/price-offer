import { writable, derived } from 'svelte/store';

import {
  defaultContact,
  defaultPartner,
  defaultOffer,
  defaultOfferItem,
  type Offer,
  type OfferItem,
  type Partner,
  type Contact,
} from './types';

import * as db from './db';

let taxRate = writable(defaultOffer.taxRate / 100);

export const contact = writable<Contact>({ ...defaultContact });
export const partner = writable<Partner>({ ...defaultPartner });

export const offer = writable<Offer>(defaultOffer);
export const offerItems = writable<OfferItem[]>([]);

export const hasItem = derived(offerItems, (items) => items.length > 0);
export const netto = derived(offerItems, (items) =>
  items.reduce((sum, i) => sum + totalPrice(i), 0),
);

export const tax = derived(
  [netto, taxRate],
  ([$netto, $taxRate]) => $netto * $taxRate,
);
export const brutto = derived([netto, tax], ([$netto, $tax]) => $netto + $tax);

export function totalPrice(item : OfferItem) {
  return (item.materialPrice + item.workPrice) * item.amount;
}

export function addItem() {
  offerItems.update(($items) => [...$items, { ...defaultOfferItem }]);
}

export function removeItem(item: OfferItem) {
  offerItems.update(($items) => ($items = $items.filter((i) => i !== item)));
}

export function removeItems() {
  offerItems.set([]);
}

export function restoreState() {
  const persistedState = db.loadState({
    contact: defaultContact,
    partner: defaultPartner,
  });

  contact.set(persistedState.contact);
  partner.set(persistedState.partner);
}
