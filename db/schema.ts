import {sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const records=sqliteTable('records',{id:text('id').primaryKey(),kind:text('kind').notNull(),partner:text('partner').notNull().default(''),data:text('data').notNull(),updated:text('updated').notNull()});
export const members=sqliteTable('members',{email:text('email').primaryKey(),role:text('role').notNull(),partner:text('partner').notNull().default('')});
export const config=sqliteTable('config',{key:text('key').primaryKey(),value:text('value').notNull()});
export const audit=sqliteTable('audit',{id:text('id').primaryKey(),actor:text('actor').notNull(),action:text('action').notNull(),record:text('record').notNull(),at:text('at').notNull()});
