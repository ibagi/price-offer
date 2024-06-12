import { eq } from 'drizzle-orm';
import { type Contact } from '../types';
import { type Database } from '../db';
import { contacts } from '../db/schema';

export class ContactService {
  constructor(private readonly db: Database) {}

  async getContact() {
    return await this.db.query.contacts.findFirst();
  }

  async updateContact(input: Contact) {
    await this.db
      .update(contacts)
      .set({ ...input })
      .where(eq(contacts.id, input.id));
  }
}
