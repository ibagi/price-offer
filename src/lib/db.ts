import Dexie, { type Table } from 'dexie';

export interface PartnerRecord {
  id?: number;
  name: string;
}

const seed = {
  partners: [{ name: 'Partner és társa Bt.' }],
};

export class Database extends Dexie {
  partners!: Table<PartnerRecord>;

  constructor() {
    super('price-offer');
    this.version(1).stores({
      partners: '++id, name',
    });
  }

  async initialize() {
    const alreadySeeded = (await this.partners.count()) > 0;
    if (!alreadySeeded) {
      this.partners.bulkAdd(seed.partners);
    }
  }
}

const db = new Database();
export default db;
