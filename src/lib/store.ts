import type { Login } from '$lib/models/logins';
import { writable, type Writable } from 'svelte/store';
import type { AlertEnum } from './models/misc';
import type { Note } from './models/notes';

const testLogins: Array<Login> = [
	{
		name: 'My site',
		url: 'http://www.google.com',
		password: '233',
		tags: ['banks', 'personal'],
		username: 'frederico.braga@gmail.com'
	},
	{
		name: 'My site 2',
		url: 'http://www.google.com',
		password: '2akjh33',
		tags: ['banks', 'work'],
		username: 'maria.helena.j.ferreira@gmail.com'
	}
];

const testNotes: Array<Note> = [
	{
		name: 'note 1',
		note: 'test note 1 ',
		tags: ['banks', 'work', 'a nother tagsss']
	},
	{
		name: 'note 2',
		note: 'test note 2',
		tags: ['banks', 'personal', 'another']
	}
];

export const logins: Writable<Array<Login | null>> = writable(testLogins);
export const notes: Writable<Array<Note | null>> = writable(testNotes);
export const alerts = writable<
	Array<{ type: AlertEnum; message: string; createdOn: number } | null>
>([]);
