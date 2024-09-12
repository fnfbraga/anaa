import { db } from '$lib/db';
import { decrypt, encrypt } from '$lib/encryption';
import { items } from '$lib/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = +(params.id || '');
	const login = id ? await db.select().from(items).where(eq(items.id, id)) : null;
	return {
		...login?.map((item) => ({
			...item,
			username: decrypt(JSON.parse(item.username || '{}') as any),
			password: decrypt(JSON.parse(item.password || '{}') as any)
		}))[0]
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(formData.get('data') as string);
		await db.insert(items).values({
			name: data.name,
			username: JSON.stringify(encrypt(data.username)),
			password: JSON.stringify(encrypt(data.password)),
			type: 'login',
			tags: data.tags
		});
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = +(formData.get('id') as string);
		await db.delete(items).where(eq(items.id, +id));
	},
	edit: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(formData.get('data') as string);
		await db
			.update(items)
			.set({
				name: data.name,
				username: JSON.stringify(encrypt(data.username)),
				password: JSON.stringify(encrypt(data.password)),
				tags: data.tags
			})
			.where(eq(items.id, data.id));
	}
};
