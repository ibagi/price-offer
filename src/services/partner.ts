import { z } from 'zod';

import { partnerSchema, type Partner } from '../lib/types';
import * as db from './db';

const StorageKey = 'partners';

export async function getPartners() {
  return await db.loadData<Partner[]>(StorageKey, z.array(partnerSchema), []);
}

export async function savePartners(partners: Partner[]) {
  await db.saveData<Partner[]>(StorageKey, partners);
}
