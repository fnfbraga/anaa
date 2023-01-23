import { svelteKitAuth } from '$lib/services/auth';
import type { Handle } from '@sveltejs/kit';

// Don't forget to set the AUTH_SECRET environment variable. This should be a minimum of 32 characters, random string
export const handle = (async ({ event, resolve }: any) => {
	const response = await svelteKitAuth({ event, resolve });
	return response;
}) satisfies Handle;
