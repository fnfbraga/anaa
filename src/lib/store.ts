import { writable } from 'svelte/store';
import type { AlertEnum } from './models/misc';
import type { Login } from '$lib/models/logins';
import type { Note } from '$lib/models/notes';

export const sourceFileExists = writable(false);
export const sourceFile = writable<Array<Note | Login | null>>([]);
export const alerts = writable<
	Array<{ type: AlertEnum; message: string; createdOn: number } | null>
>([]);
export const loadingState = writable(false);
export const searchState = writable<string | undefined>(undefined);
export const filterState = writable<'notes' | 'logins'>('logins');
export const notFoundState = writable(false);
