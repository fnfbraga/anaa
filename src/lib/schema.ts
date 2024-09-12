import { pgTable, serial, text, pgEnum } from 'drizzle-orm/pg-core';

export const types = pgEnum('types', ['login', 'note']);
export enum TypesEnum {
	login = 'login',
	note = 'note'
}

export type Item = typeof items.$inferSelect;

export const items = pgTable('items', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	type: types('type').notNull(),
	url: text('url'),
	username: text('username'),
	password: text('password'),
	note: text('note'),
	favorite: text('favorite').default('false'),
	tags: text('tags').array()
});
