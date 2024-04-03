import { count, eq } from 'drizzle-orm';
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
      const counts = await this.db
        .select({ count: count() })
        .from(partners)
        .where(eq(partners.id, partner.id));
      if (counts[0].count > 0) {
        await this.db.insert(partners).values(partner);
      } else {
        await this.db
          .update(partners)
          .set({ ...partner })
          .where(eq(partners.id, partner.id));
      }
    }
  }
}
