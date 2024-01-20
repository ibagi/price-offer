import { writable, derived } from 'svelte/store';
import { defaultOfferItem, type OfferItem } from './types';
import type { Database } from './db';

const TAX_RATE = 1.27;

export const partners = writable<string[]>([]);
export const selectedPartner = writable('');

export const selectedProject = writable('');
export const offerItems = writable<OfferItem[]>([]);

export const hasItem = derived(offerItems, (items) => items.length > 0);
export const netto = derived(offerItems, (items) =>
  items.reduce((sum, i) => sum + i.unitPrice * i.amount, 0),
);
export const brutto = derived(netto, ($netto) => $netto * TAX_RATE);

export function addItem() {
  offerItems.update(($items) => [...$items, { ...defaultOfferItem }]);
}

export function removeItem(item: OfferItem) {
  offerItems.update(($items) => ($items = $items.filter((i) => i !== item)));
}

export function removeItems() {
  offerItems.set([]);
}

export async function restore(db: Database) {
  const records = await db.partners.toArray();
  partners.set(records.map((r) => r.name));
}
