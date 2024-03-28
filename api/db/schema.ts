import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// TODO: finish schema

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey(),
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
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  companyNumber: text('company_number').notNull(),
  taxNumber: text('tax_number').notNull(),
});

export const offers = sqliteTable('offers', {
  id: integer('id').primaryKey(),
});

export const offerItems = sqliteTable('offer_items', {
  id: integer('id').primaryKey(),
  offerId: integer('offer_id')
    .references(() => offers.id, { onDelete: 'cascade' })
    .notNull(),
});
