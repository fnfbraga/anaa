import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { decrypt } from '$lib/server/encryption';

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(303, '/sign-in');
	}

	const typeParam = url.searchParams.get('type') as 'login' | 'note' | null;
	if (typeParam && !['login', 'note'].includes(typeParam)) {
		throw error(400, 'Invalid type parameter');
	}
	const searchParam = url.searchParams.get('search')?.trim() || null;

	async function getData() {
		if (!typeParam && !searchParam) {
			return db.query.items.findMany({ limit: 100 });
		}
		return db.query.items.findMany({
			where: (items, { or, and, eq, ilike }) =>
				typeParam
					? and(
							searchParam
								? or(
										ilike(items.name, `%${searchParam}%`),
										ilike(items.url, `%${searchParam}%`),
										ilike(items.username, `%${searchParam}%`),
										ilike(items.note, `%${searchParam}%`)
								  )
								: ilike(items.name, `%%`),
							eq(items.type, typeParam)
					  )
					: or(
							ilike(items.name, `%${searchParam}%`),
							ilike(items.url, `%${searchParam}%`),
							ilike(items.username, `%${searchParam}%`),
							ilike(items.note, `%${searchParam}%`)
					  ),
			limit: 20
		});
	}

	const initialItems = await getData();

	return {
		initialItems: initialItems.map((item) => ({
			...item,
			username: item.type === 'login' ? decrypt(JSON.parse(item.username || '{}')) : null,
			password: item.type === 'login' ? decrypt(JSON.parse(item.password || '{}')) : null,
			note: item.type === 'note' ? decrypt(JSON.parse(item.note || '{}')) : null
		}))
	};
};
