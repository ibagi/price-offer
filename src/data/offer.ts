import { nanoid } from 'nanoid';

import * as db from './db';
import { type Offer, defaultOffer, offerSchema } from '../lib/types';

export async function getOffers() {
  const offers = [];

  for (const key of await db.getKeys('offers/')) {
    const result = await db.tryLoadData<Offer>(key, offerSchema);
    if (result.success) {
      offers.push(result.data);
    }
  }

  return offers.toSorted((a, b) => (a.sequence > b.sequence ? -1 : 1));
}

export async function getOffer(offerId: string) {
  const result = await db.tryLoadData<Offer>(`offers/${offerId}`, offerSchema);
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Failed to load offer!');
  }
}

export async function createOffer() {
  const existingKeys = await db.getKeys('offers/');
  console.log(existingKeys);
  const sequence = existingKeys.length + 1;

  const offer: Offer = {
    ...defaultOffer,
    id: nanoid(),
    offerNumber: createOfferNumber(sequence),
    sequence,
  };

  await db.saveData(`offers/${offer.id}`, offer);
}

export async function updateOffer(offer: Offer) {
  await db.saveData(`offers/${offer.id}`, offer);
}

function createOfferNumber(sequence: number) {
  const sequenceString = String(sequence).padStart(3, '0');
  const shortYear = new Date().getFullYear().toString().slice(2, 4);

  return `XX-PT-${shortYear}-${sequenceString}`;
}
