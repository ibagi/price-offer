import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { type OfferItem } from '../types';
import { relations } from 'drizzle-orm';

const primaryKey = (columnName: string) =>
  text(columnName)
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull();

export const contacts = sqliteTable('contacts', {
  id: primaryKey('id'),
  person: text('person').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  companyNumber: text('company_number').notNull(),
  taxNumber: text('tax_number').notNull(),
  bankAccountNumber: text('bank_account_number').notNull(),
});

export const partners = sqliteTable('partners', {
  id: primaryKey('id'),
  name: text('name').notNull(),
  address: text('address').notNull(),
  companyNumber: text('company_number').notNull(),
  taxNumber: text('tax_number').notNull(),
});

export const offers = sqliteTable(
  'offers',
  {
    id: primaryKey('id'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .$defaultFn(() => new Date())
      .notNull(),
    year: integer('year')
      .$defaultFn(() => new Date().getFullYear())
      .notNull(),
    sequence: integer('sequence').notNull(),
    projectName: text('project_name').notNull().default(''),
    offerNumber: text('offer_number').notNull().default(''),
    offerDate: integer('offer_date', { mode: 'timestamp_ms' })
      .$defaultFn(() => new Date())
      .notNull(),
    offerPlace: text('offer_place').notNull().default(''),
    validity: integer('validity').notNull().default(30),
    productionTimeInDays: integer('production_time').notNull().default(1),
    currency: text('currency', { enum: ['HUF', 'EUR'] })
      .notNull()
      .default('HUF'),
    taxRate: real('tax_rate').notNull().default(27),
    status: text('status', {
      enum: ['created', 'sent', 'accepted', 'rejected'],
    })
      .notNull()
      .default('created'),
    partnerId: text('partner_id').references(() => partners.id, {
      onDelete: 'set null',
    }),
    items: text('items', { mode: 'json' }).$type<OfferItem[]>(),
  },
  (table) => ({
    yearIndex: index('year_idx').on(table.year),
    sequenceIndex: unique('sequence_idx').on(table.sequence, table.year),
  }),
);

export const encryptionKeys = sqliteTable('encryption_keys', {
  userId: text('user_id').primaryKey(),
  salt: text('salt').notNull(),
  encryptedKey: text('encrypted_key').notNull(),
});

export const offerRelations = relations(offers, ({ one }) => ({
  partner: one(partners, {
    fields: [offers.partnerId],
    references: [partners.id],
  }),
}));
