import { and, count, eq, max, ne } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { type Database } from '../db';
import { offers } from '../db/schema';
import {
  type Offer,
  defaultOffer,
  generateOfferNumber,
  type OfferUpdate,
} from '../types';
import { ValidationError, errors } from '../errors';

export function parseSequenceNumber(offerNumber: string) {
  const regex = /^AJ-PT-\d{2}-(\d{3})$/;
  const matches = offerNumber.match(regex);

  if (matches?.length === 2) {
    return Number(matches[1]);
  }

  return null;
}

export class OfferService {
  constructor(private readonly db: Database) {}

  async getOfferYears() {
    const years = (
      await this.db.selectDistinct({ year: offers.year }).from(offers)
    )?.map((o) => o.year);

    if (years.length === 0) {
      years.push(new Date().getFullYear());
    }

    return years;
  }

  async getOffersByYear(year: number) {
    return await this.db.select().from(offers).where(eq(offers.year, year));
  }

  async getById(offerId: string) {
    return await this.db.query.offers.findFirst({
      where: eq(offers.id, offerId),
    });
  }

  async createOffer() {
    return await this.insertOffer(defaultOffer);
  }

  async copyOffer(offerId: string) {
    const offer = await this.db.query.offers.findFirst({
      where: eq(offers.id, offerId),
    });

    if (!offer) {
      return;
    }

    return await this.insertOffer({
      ...offer,
      status: 'created',
    });
  }

  async updateOffer(update: OfferUpdate) {
    const sequenceNumber = parseSequenceNumber(update.offerNumber);
    if (!sequenceNumber) {
      throw new ValidationError(errors.InvalidOfferNumber);
    }

    const [{ matchCount }] = await this.db
      .select({ matchCount: count() })
      .from(offers)
      .where(
        and(
          eq(offers.offerNumber, update.offerNumber),
          ne(offers.id, update.id),
        ),
      );

    if (matchCount > 0) {
      throw new ValidationError(errors.OfferNumberAlreadyExists);
    }

    await this.db
      .update(offers)
      .set({
        ...update,
        sequence: sequenceNumber,
      })
      .where(eq(offers.id, update.id));
  }

  async deleteOffer(offerId: string) {
    const deletedIds = await this.db
      .delete(offers)
      .where(eq(offers.id, offerId))
      .returning({ deletedId: offers.id });

    return deletedIds.length === 1;
  }

  private async insertOffer(offerProps: Offer) {
    const [{ currentSequence }] = await this.db
      .select({ currentSequence: max(offers.sequence) })
      .from(offers)
      .where(eq(offers.year, new Date().getFullYear()));

    const sequence = (currentSequence ?? 0) + 1;
    const offer = {
      ...offerProps,
      id: nanoid(),
      createdAt: new Date(),
      offerDate: new Date(),
      year: new Date().getFullYear(),
      offerNumber: generateOfferNumber(sequence),
      sequence,
    };

    await this.db
      .insert(offers)
      .values(offer)
      .onConflictDoUpdate({
        target: [offers.sequence, offers.year],
        set: {
          sequence: sequence + 1,
          offerNumber: generateOfferNumber(sequence + 1),
        },
      });

    return offer;
  }
}
