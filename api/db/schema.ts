import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { OfferItem } from '../types';

export const contacts = sqliteTable('contacts', {
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
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
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  companyNumber: text('company_number').notNull(),
  taxNumber: text('tax_number').notNull(),
});

export const offers = sqliteTable('offers', {
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(
    () => new Date(),
  ),
  year: integer('year')
    .$defaultFn(() => new Date().getFullYear())
    .notNull(),
  sequence: integer('sequence').notNull(),
  projectName: text('project_name').notNull(),
  offerNumber: text('offer_number').notNull(),
  offerDate: integer('offer_date', { mode: 'timestamp_ms' }),
  offerPlace: text('offer_place').notNull(),
  validity: integer('validity').notNull(),
  productionTimeInDays: integer('production_time').notNull(),
  currency: text('currency', { enum: ['HUF', 'EUR'] })
    .notNull()
    .default('HUF'),
  taxRate: real('tax_rate').notNull().default(27),
  status: text('status', { enum: ['created', 'sent', 'accepted', 'rejected'] })
    .notNull()
    .default('created'),
  partnerId: text('partner_id').references(() => partners.id, {
    onDelete: 'set null',
  }),
  items: text('items', { mode: 'json' }).$type<OfferItem[]>().notNull(),
});
