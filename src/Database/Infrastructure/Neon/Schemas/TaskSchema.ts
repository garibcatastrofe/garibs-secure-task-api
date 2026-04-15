import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './UserSchema';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  creation_date: timestamp('creation_date', {
    mode: 'string',
    withTimezone: false,
  })
    .defaultNow()
    .notNull(),
  expiration_date: timestamp('expiration_date', {
    mode: 'string',
    withTimezone: false
  }),
  state: text('state').notNull(),
  user_id: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});
