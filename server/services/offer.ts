import { eq, max } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { type Database } from '../db';
import { offers } from '../db/schema';
import { type Offer, defaultOffer } from '../types';

export class OfferService {
  constructor(private readonly db: Database) {}

  async getOfferYears() {
    const years = (
      await this.db.selectDistinct({ year: offers.year }).from(offers)
    )?.map((o) => o.year);

    if(years.length === 0) {
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

  async updateOffer(offer: Offer) {
    if (offer.id) {
      await this.db
        .update(offers)
        .set({ ...offer })
        .where(eq(offers.id, offer.id));
    }
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
      offerNumber: this.generateOfferNumber(sequence),
      sequence,
    };

    await this.db
      .insert(offers)
      .values(offer)
      .onConflictDoUpdate({
        target: [offers.sequence, offers.year],
        set: {
          sequence: sequence + 1,
          offerNumber: this.generateOfferNumber(sequence + 1),
        },
      });

    return offer;
  }

  private generateOfferNumber(sequence: number) {
    const sequenceString = String(sequence).padStart(3, '0');
    const shortYear = new Date().getFullYear().toString().slice(2, 4);
    return `AJ-PT-${shortYear}-${sequenceString}`;
  }
}
