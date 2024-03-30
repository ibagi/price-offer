import { nanoid } from 'nanoid';
import { db } from '../api/db';
import { contacts } from '../api/db/schema';
import { defaultContact } from '../api/types';

async function main() {
  const existingContacts = await db.select().from(contacts).all();
  if (existingContacts.length === 0) {
    await db.insert(contacts).values({ ...defaultContact, id: nanoid() });
  }
}

(async () => await main())();
