import debounce from 'debounce';
import type { Contact } from '../../server/types';
import { ApiCallDebounceMilis, trpc } from '../client/trpc';

export async function getContact() {
  return await trpc.contact.get.query();
}

export const saveContact = debounce(async (contact: Contact) => {
  await trpc.contact.update.mutate(contact);
}, ApiCallDebounceMilis);
