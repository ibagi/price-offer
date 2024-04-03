import { trpc } from '../client/trpc';
import type { Partner } from '../../server/types';

export async function getPartners() {
  return await trpc.partners.list.query();
}

export async function savePartners(partners: Partner[]) {
  await trpc.partners.update.mutate(partners);
}
