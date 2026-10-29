import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user && !event.url.pathname.startsWith('/sign-in')) {
		throw redirect(303, '/sign-in');
	}
	return {
		session
	};
};
