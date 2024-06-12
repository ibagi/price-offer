import debounce from 'debounce';
import { ApiCallDebounceMilis, trpc } from '../client/trpc';
import type { Offer } from '../lib/types';

export async function getOfferYears() {
  const years = await trpc.offers.offerYears.query();
  return Array.from(years).toSorted((a, b) => (a > b ? b : a));
}

export async function getOffers(year: number) {
  const offers = await trpc.offers.byYear.query(year);
  return offers.toSorted((a, b) => (a.sequence > b.sequence ? -1 : 1));
}

export async function getOffer(offerId: string) {
  const result = await trpc.offers.byId.query(offerId);
  if (result) {
    return result;
  } else {
    throw new Error('Failed to load offer!');
  }
}

export async function createOffer() {
  return await trpc.offers.create.mutate();
}

export const updateOffer = debounce(async (offer: Offer) => {
  await trpc.offers.update.mutate(offer);
}, ApiCallDebounceMilis);

export async function deleteOffer(offerId: string) {
  await trpc.offers.delete.mutate({ offerId });
}

export const copyOffer = debounce(async (offerId: string) => {
  return await trpc.offers.copy.mutate(offerId);
}, ApiCallDebounceMilis);
