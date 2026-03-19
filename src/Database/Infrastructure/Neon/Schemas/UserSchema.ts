import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  user_name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  is_admin: boolean('is_admin').notNull(),
});
