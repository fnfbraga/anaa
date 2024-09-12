import { writable } from 'svelte/store';
import type { AlertEnum } from './models/misc';

export const alerts = writable<
	Array<{ type: AlertEnum; message: string; createdOn: number } | null>
>([]);
