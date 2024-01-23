import { writable, derived } from 'svelte/store';
import { defaultOffer, defaultOfferItem, type Offer, type OfferItem, type Partner } from './types';
import type { Database } from './db';

let taxRate = writable(defaultOffer.taxRate);

export const offer = writable<Offer>(defaultOffer);
export const partners = writable<Partner[]>([]);
export const selectedPartner = writable<Partner | null>(null);

export const selectedProject = writable('');
export const offerItems = writable<OfferItem[]>([]);

export const hasItem = derived(offerItems, (items) => items.length > 0);
export const netto = derived(offerItems, (items) =>
  items.reduce((sum, i) => sum + i.unitPrice * i.amount, 0),
);

export const tax = derived([netto, taxRate], ([$netto, $taxRate]) => $netto * $taxRate);
export const brutto = derived([netto, tax], ([$netto, $tax]) => $netto + $tax);

export function addItem() {
  offerItems.update(($items) => [...$items, { ...defaultOfferItem }]);
}

export function removeItem(item: OfferItem) {
  offerItems.update(($items) => ($items = $items.filter((i) => i !== item)));
}

export function removeItems() {
  offerItems.set([]);
}

export async function restoreFrom(db: Database) {
  const records = await db.partners.toArray();
  partners.set(records);
  selectedPartner.set(records[0]);
}
