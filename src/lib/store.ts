import type { Login } from '$lib/models/logins';
import { writable, type Writable } from 'svelte/store';
import type { Note } from './models/notes';

const testLogins: Array<Login> = [
	{
		name: 'My site',
		url: 'http://www.google.com',
		password: '233',
		tags: ['banks', 'personal'],
		username: 'maria'
	},
	{
		name: 'My site 2',
		url: 'http://www.google.com',
		password: '2akjh33',
		tags: ['banks', 'work'],
		username: 'manel'
	}
];

const testNotes: Array<Note> = [
	{
		name: 'note 1',
		note: 'test note 1',
		tags: ['banks', 'work']
	},
	{
		name: 'note 2',
		note: 'test note 2',
		tags: ['banks', 'personal']
	}
];

export const logins: Writable<Array<Login | null>> = writable(testLogins);
export const notes: Writable<Array<Note | null>> = writable(testNotes);
