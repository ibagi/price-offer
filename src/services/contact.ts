import type { Contact } from '../../server/types';
import { trpc } from '../client/trpc';

export async function getContact() {
  return await trpc.contact.get.query();
}

export async function saveContact(contact: Contact) {
  await trpc.contact.update.mutate(contact);
}
