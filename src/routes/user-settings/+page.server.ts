import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userEmail = (await locals.getSession())?.user?.email;

	return {
		clientEmail: userEmail
	};
};
