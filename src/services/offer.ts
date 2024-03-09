import { nanoid } from 'nanoid';

import * as db from './db';
import { type Offer, defaultOffer, offerSchema } from '../lib/types';

const KeyPrefix = 'offers';
const recordKey = (offerId: string) => `${KeyPrefix}/${offerId}`;

async function nextSequenceNumber() {
  const existingKeys = await db.getKeys(KeyPrefix);
  return existingKeys.length + 1;
}

function createOfferNumber(sequence: number) {
  const sequenceString = String(sequence).padStart(3, '0');
  const shortYear = new Date().getFullYear().toString().slice(2, 4);
  return `XX-PT-${shortYear}-${sequenceString}`;
}

export async function getOffers() {
  const offers = [];

  for (const key of await db.getKeys(KeyPrefix)) {
    const result = await db.tryLoadData<Offer>(key, offerSchema);
    if (result.success) {
      offers.push(result.data);
    }
  }

  return offers.toSorted((a, b) => (a.sequence > b.sequence ? -1 : 1));
}

export async function getOffer(offerId: string) {
  const result = await db.tryLoadData<Offer>(recordKey(offerId), offerSchema);
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Failed to load offer!');
  }
}

export async function createOffer() {
  const sequence = await nextSequenceNumber();

  const offer: Offer = {
    ...defaultOffer,
    id: nanoid(),
    createdAt: new Date(),
    offerNumber: createOfferNumber(sequence),
    sequence,
  };

  await db.saveData(recordKey(offer.id), offer);
  return offer;
}

export async function updateOffer(offer: Offer) {
  await db.saveData(recordKey(offer.id), offer);
}

export async function copyOffer(offerId: string) {
  const offer = await getOffer(offerId);
  if (!offer) {
    throw new Error('Offer not found!');
  }

  const sequence = await nextSequenceNumber();

  const clone = {
    ...structuredClone(offer),
    id: nanoid(),
    createdAt: new Date(),
    offerNumber: createOfferNumber(sequence),
    sequence,
  };

  await db.saveData(recordKey(clone.id), clone);
  return clone;
}
