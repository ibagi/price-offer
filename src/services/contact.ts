import { contactSchema, type Contact, defaultContact } from '../lib/types';
import * as db from './db';

const StorageKey = 'contact';

export async function getContact() {
  return await db.loadData<Contact>(StorageKey, contactSchema, {
    ...defaultContact,
  });
}

export async function saveContact(contact: Contact) {
  await db.saveData<Contact>(StorageKey, contact);
}
