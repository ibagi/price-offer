import debounce from 'debounce';
import { ApiCallDebounceMilis, trpc } from '../client/trpc';
import type { Partner } from '../../server/types';

export async function getPartners() {
  return await trpc.partners.list.query();
}

export const savePartners = debounce(async (partners: Partner[]) => {
  await trpc.partners.update.mutate(partners);
}, ApiCallDebounceMilis);
