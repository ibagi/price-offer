import { count, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { type Database } from '../db';
import { offers } from '../db/schema';
import { type Offer, defaultOffer } from '../types';

export class OfferService {
  constructor(private readonly db: Database) {}

  async getOfferYears() {
    return (
      await this.db.selectDistinct({ year: offers.year }).from(offers)
    )?.map((o) => o.year);
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
    const offerCount = await this.db
      .select({ count: count() })
      .from(offers)
      .where(eq(offers.year, new Date().getFullYear()));

    const sequence = offerCount[0].count + 1;

    const offer = {
      ...defaultOffer,
      id: nanoid(),
      createdAt: new Date(),
      year: new Date().getFullYear(),
      offerNumber: this.generateOfferNumber(sequence),
      sequence,
    };

    await this.db.insert(offers).values(offer);
    return offer;
  }

  async updateOffer(offer: Offer) {
    if (offer.id) {
      await this.db
        .update(offers)
        .set({ ...offer })
        .where(eq(offers.id, offer.id));
    }
  }

  async deleteOffer(offerId: string) {
    const { rowsAffected } = await this.db
      .delete(offers)
      .where(eq(offers.id, offerId));

    return rowsAffected === 1;
  }

  private generateOfferNumber(sequence: number) {
    const sequenceString = String(sequence).padStart(3, '0');
    const shortYear = new Date().getFullYear().toString().slice(2, 4);
    return `AJ-PT-${shortYear}-${sequenceString}`;
  }
}
