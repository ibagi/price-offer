import { writable, derived } from 'svelte/store';

import {
  defaultContact,
  defaultOffer,
  defaultOfferItem,
  type Offer,
  type OfferItem,
  type Partner,
  type Contact,
  type Currency,
  defaultPartner,
} from './types';

import * as db from './db';
import * as prices from './prices';

export const contact = writable<Contact>({ ...defaultContact });
export const partners = writable<Partner[]>([]);
export const selectedPartner = writable<Partner | undefined>();

export const offer = writable<Offer>(defaultOffer);
export const offerItems = writable<OfferItem[]>([]);
export const hasItem = derived(offerItems, (items) => items.length > 0);

export const taxRate = writable(27);
export const currency = writable<Currency>('HUF');

export const netto = derived(
  [offerItems, currency],
  ([$offerItems, $currency]) =>
    prices.netto($offerItems.map(totalPrice), $currency),
);

export const tax = derived(
  [netto, taxRate, currency],
  ([$netto, $taxRate, $currency]) => prices.tax($netto, $taxRate, $currency),
);

export const brutto = derived(
  [netto, tax, currency],
  ([$netto, $tax, $currency]) => prices.brutto($netto, $tax, $currency),
);

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
