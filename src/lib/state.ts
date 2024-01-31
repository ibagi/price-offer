import { writable, derived } from 'svelte/store';
import { Decimal } from 'decimal.js';

import {
  defaultContact,
  defaultOffer,
  defaultOfferItem,
  type Offer,
  type OfferItem,
  type Partner,
  type Contact,
  defaultPartner,
} from './types';

import * as db from './db';

export const contact = writable<Contact>({ ...defaultContact });
export const partners = writable<Partner[]>([]);
export const selectedPartner = writable<Partner | undefined>();

export const offer = writable<Offer>(defaultOffer);
export const offerItems = writable<OfferItem[]>([]);
export const hasItem = derived(offerItems, (items) => items.length > 0);

export const taxRate = writable(27);
export const netto = derived(offerItems, (items) =>
  items.reduce((sum, i) => sum + totalPrice(i), 0),
);

export const tax = derived([netto, taxRate], ([$netto, $taxRate]) =>
  new Decimal($netto * ($taxRate / 100)).toDecimalPlaces(0).toNumber(),
);
export const brutto = derived([netto, tax], ([$netto, $tax]) => $netto + $tax);

export function totalPrice(item: OfferItem) {
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

export function addPartner() {
  partners.update(($partners) =>
    [...$partners, { ...defaultPartner }].toSorted((a, b) =>
      a.name.localeCompare(b.name),
    ),
  );
}

export function removePartner(partner: Partner) {
  partners.update(($partners) => $partners.filter((p) => p !== partner));
}

export function restoreState() {
  const persistedState = db.loadState({
    contact: defaultContact,
    partners: [],
  });

  partners.set(persistedState.partners ?? []);
  contact.set(persistedState.contact);
}
