import { nanoid } from 'nanoid';

import * as db from './db';
import { type Offer, defaultOffer, offerSchema } from '../lib/types';

const KeyPrefix = 'offers';
const offerId = () => `${new Date().getFullYear()}_${nanoid()}`;
const offerKey = (offerId: string) => `${KeyPrefix}/${offerId}`;
const offerYear = (offerId: string) => Number(offerId.split('/')[1].split('_')[0]);

export async function getOfferYears() {
  const offerCounts = await getOfferCountByYears();
  const years = new Set([...offerCounts.keys(), new Date().getFullYear()]);
  return Array.from(years).toSorted((a,b) => a > b ? b : a);
}

async function getOfferCountByYears() {
  return (await db.getKeys(KeyPrefix)).reduce((map, key) => {
    const year = offerYear(key);
    map.set(year, (map.get(year) ?? 0) + 1);
    return map;
  }, new Map<number, number>());
}

async function nextSequenceNumber() {
  const counts = await getOfferCountByYears();
  const sequence = counts.get(new Date().getFullYear()) ?? 0;
  return sequence + 1;
}

function createOfferNumber(sequence: number) {
  const sequenceString = String(sequence).padStart(3, '0');
  const shortYear = new Date().getFullYear().toString().slice(2, 4);
  return `XX-PT-${shortYear}-${sequenceString}`;
}

export async function getOffers(year: number) {
  const keys = await db.getKeys(`${KeyPrefix}/${year}`);
  const results = await Promise.all(keys.map(key => db.tryLoadData<Offer>(key, offerSchema)));
  return results
    .filter(r => r.success)
    .map(r => (r as db.Loaded<Offer>).data)
    .toSorted((a,b) => a.sequence > b.sequence ? -1 : 1);
}

export async function getOffer(offerId: string) {
  const result = await db.tryLoadData<Offer>(offerKey(offerId), offerSchema);
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
    id: offerId(),
    createdAt: new Date(),
    offerNumber: createOfferNumber(sequence),
    sequence,
  };

  await db.saveData(offerKey(offer.id), offer);
  return offer;
}

export async function updateOffer(offer: Offer) {
  await db.saveData(offerKey(offer.id), offer);
}

export async function deleteOffer(offerId: string) {
  await db.removeData(offerKey(offerId));
}

export async function copyOffer(id: string) {
  const offer = await getOffer(id);
  if (!offer) {
    throw new Error('Offer not found!');
  }

  const sequence = await nextSequenceNumber();
  const clone = {
    ...structuredClone(offer),
    id: offerId(),
    offerNumber: createOfferNumber(sequence),
    createdAt: new Date(),
    sequence,
  };

  await db.saveData(offerKey(clone.id), clone);
  return clone;
}
