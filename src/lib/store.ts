import { writable } from 'svelte/store';
import type { AlertEnum } from './models/misc';
import type { Login } from '$lib/models/logins';
import type { Note } from '$lib/models/notes';

export const sourceFile = writable<Array<Note | Login | null>>([]);
export const alerts = writable<
	Array<{ type: AlertEnum; message: string; createdOn: number } | null>
>([]);
