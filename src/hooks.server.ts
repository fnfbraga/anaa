import { building } from '$app/environment';
import { svelteKitAuth } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import migrateDb from '$lib/server/migrate-db';

if (!building) {
	await migrateDb();
}

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const isPublicPath =
		event.url.pathname.startsWith('/sign-in') || event.url.pathname.startsWith('/auth');

	if (!isPublicPath) {
		const session = await event.locals.getSession();
		if (!session?.user) {
			throw redirect(303, '/sign-in');
		}
	}

	return resolve(event);
};

// Don't forget to set the AUTH_SECRET environment variable. This should be a minimum of 32 characters, random string
export const handle: Handle = sequence(svelteKitAuth, authorizationHandle);
