import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { decrypt } from '$lib/encryption';
import { eq, ilike } from 'drizzle-orm';
import { items } from '$lib/schema';

export const load = (async ({ url }) => {
	const typeParam = url.searchParams.get('type') as 'login' | 'note' | null;
	if (typeParam && !['login', 'note'].includes(typeParam)) {
		throw new Error('Invalid type parameter');
	}
	const searchParam = url.searchParams.get('search') as string | null;

	async function getData() {
		if (!typeParam && !searchParam) {
			return db.query.items.findMany({ limit: 100 });
		}
		return db.query.items.findMany({
			where: (items, { or, and, eq }) =>
				typeParam
					? and(
							searchParam
								? or(
										ilike(items.name, `%${searchParam}%`),
										ilike(items.username, `%${searchParam}%`),
										ilike(items.name, `%${searchParam}%`),
										ilike(items.note, `%${searchParam}%`)
								  )
								: ilike(items.name, `%%`),
							eq(items.type, typeParam as any)
					  )
					: or(
							ilike(items.name, `%${searchParam}%`),
							ilike(items.username, `%${searchParam}%`),
							ilike(items.name, `%${searchParam}%`),
							ilike(items.note, `%${searchParam}%`)
					  ),
			limit: 20
		});
	}

	const initialItems = await getData();

	return {
		initialItems: initialItems.map((item) => ({
			...item,
			username: item.type === 'login' ? decrypt(JSON.parse(item.username || '{}') as any) : null,
			password: item.type === 'login' ? decrypt(JSON.parse(item.password || '{}') as any) : null,
			note: item.type === 'note' ? decrypt(JSON.parse(item.note || '{}') as any) : null
		}))
	};
}) satisfies PageServerLoad;
