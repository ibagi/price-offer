import { eq, notInArray } from 'drizzle-orm';
import { type Partner } from '../types';
import { type Database } from '../db';
import { partners } from '../db/schema';

export class PartnerService {
  constructor(private readonly db: Database) {}

  async getPartners() {
    return await this.db.select().from(partners).all();
  }

  async updatePartners(input: Partner[]) {
    for (const partner of input) {
      const existingRecord = await this.db.query.partners.findFirst({
        where: eq(partners.id, partner.id),
      });

      if (existingRecord) {
        await this.db
          .update(partners)
          .set(partner)
          .where(eq(partners.id, partner.id));
      } else {
        await this.db.insert(partners).values(partner);
      }
    }

    const partnerIds = input.map((p) => p.id).filter((id) => !!id);
    if (partnerIds.length > 0) {
      await this.db.delete(partners).where(notInArray(partners.id, partnerIds));
    }
  }
}
