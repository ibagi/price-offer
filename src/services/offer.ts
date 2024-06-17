import debounce from 'debounce';
import { ApiCallDebounceMilis, trpc } from '../client/trpc';
import type { Offer, OfferUpdate } from '../../server/types';
import { TRPCClientError } from '@trpc/client';

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

export async function updateOffer(offer: Offer) {
  try {
    await trpc.offers.update.mutate(toOfferUpdate(offer));
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return e;
    } else {
      console.error(e);
    }
  }

  return null;
}

export const autoUpdateOffer = debounce(async (offer: Offer) => {
  await trpc.offers.update.mutate(toOfferUpdate(offer));
}, ApiCallDebounceMilis);

export async function deleteOffer(offerId: string) {
  await trpc.offers.delete.mutate({ offerId });
}

export async function copyOffer(offerId: string) {
  return await trpc.offers.copy.mutate(offerId);
}

function toOfferUpdate(offer: Offer): OfferUpdate {
  return {
    id: offer.id,
    currency: offer.currency,
    items: offer.items,
    offerDate: offer.offerDate,
    offerNumber: offer.offerNumber,
    offerPlace: offer.offerPlace,
    partnerId: offer.partnerId,
    productionTimeInDays: offer.productionTimeInDays,
    projectName: offer.projectName,
    status: offer.status,
    taxRate: offer.taxRate,
    validity: offer.validity,
  };
}
